import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { userModel } from "../models/user.model";
import { genrateToken } from "../utils/jwt";
import bcrypt from "bcrypt";
import { formatDOB, genrateCollegeEmail, UserIdGenerator } from "../utils/utils";
import transporter from "../config/nodemailer";
import emailmsg from "../utils/emailMsg";
import jwt from "jsonwebtoken";
import { blacklistModel } from "../models/blacklistToken";
interface CreateUserRequestBody {
  name?: string;
  email?: string;
  password: string;
  userId: string;
  DOB?: Date;
  image?: string;
  course?: string;
  branch?: string;
  phone?: number;
  token?: string;
}
interface CustomRequest extends Request {
  userId?: string;
}

export const createUser = async (
  req: Request<{}, {}, CreateUserRequestBody>,
  res: Response
): Promise<void> => {
  // console.log(req.body);

  const { name, email, password, DOB, course, branch, phone } = req.body;

  try {
    const exist = await userModel.findOne({ email });
    if (exist) {
      res
        .status(400)
        .json({ message: "Email is already in use", success: false });
      return;
    }
    const imageFile = req.file;
    if (!imageFile) {
      res
        .status(400)
        .json({ message: "No image file uploaded", success: false });
      return;
    }
    const imageUrl = await cloudinary.uploader.upload(imageFile?.path, {
      resource_type: "image",
    });
    //genrtaing the ramdom and unquie userID
    let userId: string;
    let existingUserID;
    do {
      userId = UserIdGenerator();
      existingUserID = await userModel.findOne({ userId });
    } while (existingUserID);

    // gerating collegeemail
    const collegeEmail = genrateCollegeEmail({name , userId})

    // saving data
    const user = new userModel({
      name,
      email,
      password,
      DOB,
      image: imageUrl.secure_url,
      course,
      branch,
      phone,
      userId,
      collegeEmail
    });
    await user.save();
    transporter.verify((error, success) => {
      if (error) {
        console.log("Error connecting to mail server:", error);
      } else {
        console.log("Server is ready to take messages:", success);
      }
    });

    // sending email
    const mailOption = {
      from: "try.rahulsinghh@gmail.com",
      to: email,
      subject: "Welcome new student",
      html: emailmsg({ name, userId, password }),
    };
    await transporter.sendMail(mailOption);

    res.status(201).json({
      message: "User Created",
      success: true,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
    return;
  }
};

export const loginUser = async (
  req: Request<{}, {}, CreateUserRequestBody>,
  res: Response
): Promise<void> => {
  const { userId, password } = req.body;
  console.log(userId, password);

  try {
    const user = await userModel.findOne({ userId });
    if (!user) {
      res.status(400).json({ message: "Invalid user ", success: false });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    // console.log(isMatch);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid password ", success: false });
      return;
    }
    const token = genrateToken(user._id);
    res.cookie('token' , token , {
      httpOnly : true ,
      maxAge : 3600000,
      sameSite :'lax',
      secure : false
    })
    res.json({
      success: true,
      message: "Login in and cookie has been sent",
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error ", success: false });
    return;
  }
};



export const fetchUserDetail = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  // console.log("Fetching user details for:", req.userId);
  const user = await userModel.findOne({ _id: req.userId });
  const formatedDob = formatDOB(user?.DOB);

  res.json({
    success: true,
    message: "User details fetched",
    data: {
      userId: user?.userId,
      name: user?.name,
      course: user?.course,
      image: user?.image,
      branch: user?.branch,
      currentSem: user?.currentSem,
      DOB: formatedDob,
      phone: user?.phone,
      email: user?.email,
      collegeemail: user?.collegeEmail,
    },
  });
};

// logout route and saving the token in blacklist
export const logoutUser = async (req:Request , res :Response):Promise<void>=>{
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    res.json({ success: false, message: "No token provided" });
    return;
  }
  
  try {
    await blacklistModel.create({ token: token });
    res.clearCookie("token").json({ success: true, message: "Logout successfully" });
    return;
  } catch (error) {
    res.json({ success: false, message: "Something broke" });
  }
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUserDetail = exports.loginUser = exports.createUser = void 0;
const cloudinary_1 = require("cloudinary");
const user_model_1 = require("../models/user.model");
const jwt_1 = require("../utils/jwt");
const bcrypt_1 = __importDefault(require("bcrypt"));
const utils_1 = require("../utils/utils");
const nodemailer_1 = __importDefault(require("../config/nodemailer"));
const emailMsg_1 = __importDefault(require("../utils/emailMsg"));
const createUser = async (req, res) => {
    // console.log(req.body);
    const { name, email, password, DOB, course, branch, phone } = req.body;
    try {
        const exist = await user_model_1.userModel.findOne({ email });
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
        const imageUrl = await cloudinary_1.v2.uploader.upload(imageFile?.path, {
            resource_type: "image",
        });
        //genrtaing the ramdom and unquie userID
        let userId;
        let existingUserID;
        do {
            userId = (0, utils_1.UserIdGenerator)();
            existingUserID = await user_model_1.userModel.findOne({ userId });
        } while (existingUserID);
        // gerating collegeemail
        const collegeEmail = (0, utils_1.genrateCollegeEmail)({ name, userId });
        // saving data
        const user = new user_model_1.userModel({
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
        nodemailer_1.default.verify((error, success) => {
            if (error) {
                console.log("Error connecting to mail server:", error);
            }
            else {
                console.log("Server is ready to take messages:", success);
            }
        });
        // sending email
        const mailOption = {
            from: "try.rahulsinghh@gmail.com",
            to: email,
            subject: "Welcome new student",
            html: (0, emailMsg_1.default)({ name, userId, password }),
        };
        await nodemailer_1.default.sendMail(mailOption);
        res.status(201).json({
            message: "User Created",
            success: true,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", success: false });
        return;
    }
};
exports.createUser = createUser;
const loginUser = async (req, res) => {
    const { userId, password } = req.body;
    console.log(userId, password);
    try {
        const user = await user_model_1.userModel.findOne({ userId });
        if (!user) {
            res.status(400).json({ message: "Invalid user ", success: false });
            return;
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        // console.log(isMatch);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid password ", success: false });
            return;
        }
        const token = (0, jwt_1.genrateToken)(user._id);
        res.json({
            success: true,
            message: "Login in",
            _id: user._id,
            token: token,
        });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error ", success: false });
        return;
    }
};
exports.loginUser = loginUser;
const fetchUserDetail = async (req, res) => {
    // console.log("Fetching user details for:", req.userId);
    const user = await user_model_1.userModel.findOne({ _id: req.userId });
    const formatedDob = (0, utils_1.formatDOB)(user?.DOB);
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
exports.fetchUserDetail = fetchUserDetail;

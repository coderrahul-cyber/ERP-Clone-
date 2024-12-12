import  mongoose, { Document ,Model,Schema } from "mongoose";
import bcrypt from 'bcrypt'

interface IUser extends Document{
    name: string,
    userId: string,
    email : string,
    password : string ,
    image:string,
    fees : number,
    DOB: Date | string,
    branch : string,
    phone: number,
    currentSem : string,
    course:string,
    collegeEmail : string,
}
const userSchema: Schema = new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    DOB: {
      type: Date,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    fees: {
      type: Number,
      default: 0,
    },
    userId: {
      type: String,
      default: '', 
    },
    branch: {
      type: String,
      default: "Not Applicable",
    },
    phone: {
      type: String, 
      default: '902735000',
    },
    currentSem: {
      type: Number,
      default: 1,
    },
    course: {
      type: String,
      default: "",
    },
    collegeEmail: {
      type: String,
      default: "xyz@gehu.ac",
    },
  },
  { timestamps: true, minimize: false });

  
  userSchema.pre<IUser>('save' , async function (next){
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
      }
      next();
  })




export const userModel: Model<IUser> =  mongoose.model<IUser>('user' , userSchema)


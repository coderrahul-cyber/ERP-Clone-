import express ,{Request , Response} from "express";
import { createUser, fetchUserDetail, loginUser } from "../controllers/user.controller";
import upload from "../middlewares/multer";
import authMiddleware from "../middlewares/auth";

const userRouter = express.Router();


userRouter.post("/create", upload.single('image') , createUser );
userRouter.post("/login" , loginUser );

userRouter.post('/fetch', authMiddleware, fetchUserDetail);
export default userRouter ;
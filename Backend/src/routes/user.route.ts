import express ,{Request , Response} from "express";
import { createUser, fetchUserDetail, loginUser, logoutUser } from "../controllers/user.controller";
import upload from "../middlewares/multer";
import authMiddleware from "../middlewares/auth";

const userRouter = express.Router();


userRouter.post("/create", upload.single('image') , createUser );
userRouter.post("/login" , loginUser );
userRouter.get('/fetch', authMiddleware, fetchUserDetail);
userRouter.get('/logout' , logoutUser)
export default userRouter ;
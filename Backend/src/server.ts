import express, { Request, Response } from 'express';
import cors from 'cors';
import  'dotenv/config'
import connectDB from './config/mongodb.config';
import userRouter from './routes/user.route';
import connectCloudinary from './config/cloudinary';
import cookieParser from 'cookie-parser';
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
connectCloudinary();

//middlewares
app.use(cors({ origin :'http://localhost:5173',  credentials : true}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended :true}));

//api endpoints
app.use("/api/user" , userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

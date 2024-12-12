import express, { Request, Response } from 'express';
import cors from 'cors';
import  'dotenv/config'
import connectDB from './config/mongodb.config';
import userRouter from './routes/user.route';
import connectCloudinary from './config/cloudinary';
const app = express();
const PORT = 3000;

connectDB();
connectCloudinary();


app.use(express.json());
app.use(cors());

//api endpoints
app.use("/api/user" , userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

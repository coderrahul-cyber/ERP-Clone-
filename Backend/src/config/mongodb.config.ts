import mongoose from "mongoose";

const connectDB = async()=>{
    mongoose.connection.on('connected', ()=>{
        console.log("Connected to database")
    })
    await mongoose.connect(`${process.env.MONGO_URL}/users`)
} 

export default connectDB;
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export const genrateToken = (_id : unknown)=>{
    const secert = "anehgjad";
    return jwt.sign({_id} , secert , {expiresIn : '1h'})
}


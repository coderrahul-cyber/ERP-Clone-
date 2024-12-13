import jwt from "jsonwebtoken";

export const genrateToken = (_id : unknown)=>{
    return jwt.sign({_id} , process.env.JWT_SECRET , {expiresIn : '1h'})
}


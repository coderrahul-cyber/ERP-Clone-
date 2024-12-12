
import nodemailer from 'nodemailer'
import  'dotenv/config'
const transporter = nodemailer.createTransport({
    service: "gmail", 
    host : "stmp.gmail.com",
    secure :false,
    auth:{
        user:process.env.USER,
        pass:process.env.PASS
    }
})

export default transporter ;
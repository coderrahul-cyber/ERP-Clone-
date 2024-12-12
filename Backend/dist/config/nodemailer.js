"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    host: "stmp.gmail.com",
    secure: false,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
});
exports.default = transporter;

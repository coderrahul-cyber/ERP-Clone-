"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ success: false, message: 'Not Authorized' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.userId = decoded._id;
        next();
    }
    catch (error) {
        console.error('Token verification failed:', error);
        res.status(401).json({ success: false, message: 'Invalid token' });
        return;
    }
};
exports.default = authMiddleware;

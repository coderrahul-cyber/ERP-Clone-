"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genrateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const genrateToken = (_id) => {
    const secert = "anehgjad";
    return jsonwebtoken_1.default.sign({ _id }, secert, { expiresIn: '1h' });
};
exports.genrateToken = genrateToken;
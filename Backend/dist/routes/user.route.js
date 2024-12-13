"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const multer_1 = __importDefault(require("../middlewares/multer"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const userRouter = express_1.default.Router();
userRouter.post("/create", multer_1.default.single('image'), user_controller_1.createUser);
userRouter.post("/login", user_controller_1.loginUser);
userRouter.get('/fetch', auth_1.default, user_controller_1.fetchUserDetail);
userRouter.get('/logout', user_controller_1.logoutUser);
exports.default = userRouter;

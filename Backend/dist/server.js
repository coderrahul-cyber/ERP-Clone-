"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongodb_config_1 = __importDefault(require("./config/mongodb.config"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const cloudinary_1 = __importDefault(require("./config/cloudinary"));
const app = (0, express_1.default)();
const PORT = 3000;
(0, mongodb_config_1.default)();
(0, cloudinary_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//api endpoints
app.use("/api/user", user_route_1.default);
app.get('/', (req, res) => {
    res.send('Hello');
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

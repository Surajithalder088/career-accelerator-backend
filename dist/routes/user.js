"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const user_1 = require("../controllers/user");
//import { authAccess } from "../middlewares/authChecking"
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.post('/signup', user_1.signup);
router.post('/login', user_1.login);
router.post('/otp', user_1.otpChecking);
router.get('/credentials', user_1.credentials);
router.post('/logout', user_1.logout);
router.post('/update', user_1.updateUser);
router.post('/all-users', user_1.allUsers);
exports.default = router;

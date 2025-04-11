"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allUsers = exports.updateUser = exports.logout = exports.credentials = exports.otpChecking = exports.login = exports.signup = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const less_secure_password = "nwbj itcf oqgl fwkl";
const prisma = new client_1.PrismaClient();
const mailSender = (_a) => __awaiter(void 0, [_a], void 0, function* ({ to, subject, text }) {
    const auth = nodemailer_1.default.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
            user: "surajithalder088@gmail.com",
            pass: less_secure_password
        }
    });
    const receiver = {
        from: "surajithalder088@gmail.com",
        to: to,
        subject: subject,
        text: text
    };
    auth.sendMail(receiver, (error, emailResponse) => {
        if (error) {
            console.log(error);
            throw error;
        }
        console.log("successfully send");
        express_1.response.end();
    });
});
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, address, isHR, company, experience, resumeUrl } = req.body;
    try {
        const existingUser = yield prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (existingUser) {
            return res.status(400).json({ message: "user already exist" });
        }
        const hash = bcryptjs_1.default.hash(password, 10);
        const hashPassowrd = hash;
        const otp = 6579; /// nodemaile
        const to = email;
        const subject = "This is you otp for Career Accelerator";
        const text = `your otp is  : ${otp}`;
        const receiverdata = {
            to, subject, text
        };
        const newUser = yield prisma.user.create({
            data: {
                name, email, password, address, isHR, company, experience, otp, isValid: false, resumeUrl
            }
        });
        if (!newUser) {
            return res.status(400).json({ message: "Failed to register new user" });
        }
        const mailRes = yield mailSender(receiverdata);
        console.log(mailRes);
        res.status(201).json({ message: "user created successfullly", user: newUser, mail: mailRes });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const existingUser = yield prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (!existingUser) {
            return res.status(404).json({ message: "user doen not exist" });
        }
        if (existingUser.isValid === false) {
            return res.status(403).json({ message: "otp is not verified" });
        }
        const ismatch = bcryptjs_1.default.compare(password, existingUser.password);
        if (ismatch === false) {
            return res.status(404).json({ message: "user doen not exist" });
        }
        const data = { id: existingUser.id, isHr: existingUser.isHR };
        const token = yield jsonwebtoken_1.default.sign(data, "secret-code");
        res.cookie("authtoken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24,
        });
        res.status(200).json({ message: "login  successfullly", user: existingUser });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
});
exports.login = login;
const otpChecking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const st = Number(req.body.st);
    const nd = Number(req.body.nd);
    const rd = Number(req.body.rd);
    const th = Number(req.body.th);
    const email = req.body.email;
    let otp = (st * 1000) + (nd * 100) + (rd * 10) + th;
    try {
        const existingUser = yield prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (!existingUser) {
            return res.status(404).json({ message: "user still not created" });
        }
        if (existingUser.otp !== otp) {
            return res.status(400).json({ message: "otp is not matched" });
        }
        const verifieduser = yield prisma.user.update({
            where: {
                email: email
            },
            data: {
                isValid: true
            }
        });
        res.status(200).json({ message: "otp verified", user: verifieduser });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
});
exports.otpChecking = otpChecking;
const credentials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authtoken = req.cookies.authtoken;
        /// console.log(authtoken);
        const verified = yield jsonwebtoken_1.default.verify(authtoken, "secret-code");
        const user = verified;
        if (!user || !authtoken) {
            return res.status(400).json({ message: "unauthorized" });
        }
        const authUser = yield prisma.user.findUnique({ where: { id: user.id } });
        res.status(200).json({ message: "Authorized user data", user: authUser });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
});
exports.credentials = credentials;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield res.cookie("authtoken", "", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            expires: new Date(0)
        });
        const token = req.cookies.authtoken;
        res.status(200).json({ message: " logout successfully", token: token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
});
exports.logout = logout;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, address, isHR, company, experience, resumeUrl } = req.body;
        const updatedUser = yield prisma.user.update({
            where: {
                email
            },
            data: {
                name,
                email,
                address,
                isHR,
                company,
                experience,
                resumeUrl
            }
        });
        if (!updatedUser) {
            return res.status(400).json({ message: "failed to update the user" });
        }
        res.status(200).json({ message: "user updated", user: updatedUser });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error", error });
    }
});
exports.updateUser = updateUser;
const allUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany({
            where: {
                isHR: false
            }
        });
        if (!users) {
            return res.status(404).json({ message: "Failed to get all users" });
        }
        res.status(200).json({ message: "all users are fetched", users });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
});
exports.allUsers = allUsers;

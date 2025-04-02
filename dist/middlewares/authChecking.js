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
exports.authAccess = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authAccess = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authtoken = req.cookies.authtoken;
        const user = yield jsonwebtoken_1.default.verify(authtoken, "secret-code");
        console.log(" auth", user);
        if (!user || !authtoken) {
            return res.status(400).json({ message: "unauthorized" });
        }
        next();
    }
    catch (error) {
        res.status(500).json({ message: "unauthorized" });
    }
});
exports.authAccess = authAccess;

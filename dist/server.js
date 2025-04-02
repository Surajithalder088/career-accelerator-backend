"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const user_1 = __importDefault(require("./routes/user"));
const jobs_1 = __importDefault(require("./routes/jobs"));
const applicaton_1 = __importDefault(require("./routes/applicaton"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = express();
const PORT = 4400;
app.use(express.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use("/api/user", user_1.default);
app.use("/api/jobs", jobs_1.default);
app.use("/api/application", applicaton_1.default);
app.get("/", (req, res) => {
    res.send("hii");
});
app.listen(PORT, () => {
    console.log("server running on port :", PORT);
});

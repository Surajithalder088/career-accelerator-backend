"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobs_1 = require("../controllers/jobs");
const authChecking_1 = require("../middlewares/authChecking");
const router = express_1.default.Router();
router.get("/all", jobs_1.getAllJobs);
router.post('/detail', jobs_1.getjobDetail);
router.post("/applied", authChecking_1.authAccess, jobs_1.getAllJobsApplied); // req.body -- userid    all application of this user
router.post("/posted", authChecking_1.authAccess, jobs_1.getAllJobsPosted); // req.body -- userid
router.post("/new-post", authChecking_1.authAccess, jobs_1.newPost);
router.post("/delete-post", authChecking_1.authAccess, jobs_1.deletePost); // req.body --id
router.put("/update-post/:id", authChecking_1.authAccess, jobs_1.upadtePost); // req.params--id
exports.default = router;

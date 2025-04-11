"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const applicatons_1 = require("../controllers/applicatons");
const authChecking_1 = require("../middlewares/authChecking");
const router = express_1.default.Router();
router.post('/apply', authChecking_1.authAccess, applicatons_1.newApply);
router.post('/withdraw', authChecking_1.authAccess, applicatons_1.withdraw);
router.post('/applicaion-by-jobid', authChecking_1.authAccess, applicatons_1.applicationByJobid); // jobid in req.body
router.post('/application-by-user', authChecking_1.authAccess, applicatons_1.applicationByUser);
router.post('/application-status', authChecking_1.authAccess, applicatons_1.applicationStatyusUpdate); // applicationId and status in req.body
exports.default = router;

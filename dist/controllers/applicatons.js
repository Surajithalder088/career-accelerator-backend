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
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationStatyusUpdate = exports.applicationByJobid = exports.withdraw = exports.newApply = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const newApply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, jobId } = req.body;
    try {
        const user = yield prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        const job = yield prisma.jobPost.findUnique({ where: { id: jobId } });
        if (!job) {
            return res.status(404).json({ message: "this job not found" });
        }
        const newApplication = yield prisma.applications.create({
            data: {
                userId, jobId, status: "applied"
            }
        });
        if (!newApplication) {
            return res.status(400).json({ message: "failed to create new application" });
        }
        res.status(201).json({ message: "applicaton successfull", job: newApplication });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
});
exports.newApply = newApply;
const withdraw = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobid = Number(req.body.jobid); // application id
        const userid = req.body.userid;
        const deletedAqpply = yield prisma.applications.deleteMany({
            where: { jobId: jobid, userId: userid }
        });
        if (!deletedAqpply) {
            return res.status(400).status({ message: "failed to withdraw application" });
        }
        res.status(200).json({ message: "application has been withdrawn", job: deletedAqpply });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
});
exports.withdraw = withdraw;
const applicationByJobid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobid = parseInt(req.body.jobid);
        const applications = yield prisma.applications.findMany({
            where: {
                jobId: jobid
            }
        });
        if (!applications) {
            return res.status(404).json({ message: "Failed to get application of this job" });
        }
        res.status(200).json({ message: "these are the applications", applications });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
});
exports.applicationByJobid = applicationByJobid;
const applicationStatyusUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.body.applicationId);
        const status = req.body.status;
        const applications = yield prisma.applications.update({
            where: {
                id: id
            },
            data: {
                status: status
            }
        });
        if (!applications) {
            return res.status(404).json({ message: "Failed to update application of this job" });
        }
        res.status(200).json({ message: "these are the applications", applications });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
});
exports.applicationStatyusUpdate = applicationStatyusUpdate;

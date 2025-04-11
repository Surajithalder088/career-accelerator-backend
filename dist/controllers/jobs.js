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
exports.deletePost = exports.upadtePost = exports.newPost = exports.getAllJobsPosted = exports.getAllJobsApplied = exports.getjobDetail = exports.getAllJobs = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allJobs = yield prisma.jobPost.findMany({
            orderBy: {
                updatedAt: 'desc'
            }
        });
        if (!allJobs) {
            return res.status(404).json({ message: "failde to get jobs" });
        }
        res.status(200).json({ message: "all jobs are fetched", jobs: allJobs });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
});
exports.getAllJobs = getAllJobs;
const getjobDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.body.id);
    try {
        const allJobs = yield prisma.jobPost.findUnique({
            where: { id: id }
        });
        if (!allJobs) {
            return res.status(404).json({ message: "failde to get jobs" });
        }
        res.status(200).json({ message: "this job  fetched by id", jobs: allJobs });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
});
exports.getjobDetail = getjobDetail;
const getAllJobsApplied = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userid } = req.body;
    try {
        const user = yield prisma.user.findUnique({ where: { id: userid } });
        if (!user) {
            return res.status(404).json({ message: "failde to get user" });
        }
        const applicatons = yield prisma.applications.findMany({
            where: { userId: userid
            },
            orderBy: {
                updatedAt: 'desc'
            }
        });
        if (!applicatons) {
            return res.status(404).json({ message: "failde to get jobs" });
        }
        res.status(200).json({ message: "all jobs are fetchedwhich are applied", jobs: applicatons });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
});
exports.getAllJobsApplied = getAllJobsApplied;
const getAllJobsPosted = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userid } = req.body;
    try {
        const user = yield prisma.user.findUnique({ where: { id: userid
            }
        });
        if (!user) {
            return res.status(404).json({ message: "failde to get user" });
        }
        const jobs = yield prisma.jobPost.findMany({
            where: { userId: userid },
            orderBy: {
                updatedAt: 'desc'
            }
        });
        if (!jobs) {
            return res.status(404).json({ message: "failde to get jobs" });
        }
        res.status(200).json({ message: "all jobs are fetched", jobs: jobs });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
});
exports.getAllJobsPosted = getAllJobsPosted;
const newPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, company, address, salary, description, experience, userId, flags } = req.body;
    try {
        const user = yield prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: "failde to get user" });
        }
        const newjob = yield prisma.jobPost.create({
            data: {
                title,
                company,
                address,
                salary,
                description,
                experience,
                userId,
                flags
            }
        });
        if (!newjob) {
            return res.status(404).json({ message: "failde create new jobs" });
        }
        res.status(201).json({ message: "new job created", job: newjob });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
});
exports.newPost = newPost;
const upadtePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, company, address, salary, description, experience, userId } = req.body;
    const id = parseInt(req.params.id);
    try {
        const user = yield prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: "failde to get user" });
        }
        console.log(" the id is ", id);
        const updatedjob = yield prisma.jobPost.update({
            where: {
                id: id
            },
            data: {
                title,
                company,
                address,
                salary,
                description,
                experience,
                userId
            }
        });
        if (!updatedjob) {
            return res.status(404).json({ message: "failde update jobs" });
        }
        res.status(201).json({ message: "this job updated ", job: updatedjob });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
});
exports.upadtePost = upadtePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.body.id);
    try {
        const deletedjob = yield prisma.jobPost.delete({
            where: {
                id: id
            }
        });
        if (!deletedjob) {
            return res.status(404).json({ message: "failde to delete job" });
        }
        res.status(201).json({ message: "this job deleted", job: deletedjob });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
});
exports.deletePost = deletePost;

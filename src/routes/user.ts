import express from "express"
import { PrismaClient } from "@prisma/client"
import { credentials, login, logout, otpChecking, signup } from "../controllers/user"
//import { authAccess } from "../middlewares/authChecking"

const router=express.Router()
const prisma=new PrismaClient()


router.post('/signup',signup)
router.post('/login',login)
router.post('/otp',otpChecking)
router.get('/credentials',credentials)
router.post('/logout',logout)

export default router 
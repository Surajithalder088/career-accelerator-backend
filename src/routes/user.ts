import express from "express"
import { PrismaClient } from "@prisma/client"
import { allUsers, credentials, login, logout, otpChecking, signup, updateUser } from "../controllers/user"
//import { authAccess } from "../middlewares/authChecking"

const router=express.Router()
const prisma=new PrismaClient()


router.post('/signup',signup)
router.post('/login',login)
router.post('/otp',otpChecking)
router.get('/credentials',credentials)
router.post('/logout',logout)
router.post('/update',updateUser)
router.post('/all-users',allUsers)

export default router 
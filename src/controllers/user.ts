import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import { response } from "express"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"


const less_secure_password="nwbj itcf oqgl fwkl"

const prisma= new PrismaClient()

type RequestBody={
    name:string,
    email:string,
    password:string,
    address:string,
    isHR:boolean,
    company:string,
    experience :string
}
interface Data{
    id:string
    isHr:boolean
}


interface Receiver{
    to:string
    subject:string
    text:string
}

const mailSender=async({to,subject,text}:Receiver)=>{

    const auth =nodemailer.createTransport({
        service:"gmail",
        secure:true,
        port:465,
        auth:{
            user:"surajithalder088@gmail.com",
            pass:less_secure_password
        }
    });
    const receiver={
        from:"surajithalder088@gmail.com",
        to:to,
        subject:subject,
        text:text
    }
    auth.sendMail(receiver,(error,emailResponse)=>{
        if(error){
            console.log(error);
            throw error
            
            
        }
        console.log("successfully send");
        response.end()
        
    })
}

export const signup =async(req,res)=>{
    const {name,email,password,address,isHR,company,experience}:RequestBody=req.body
    try {
        const existingUser= await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if(existingUser){
            return res.status(400).json({message:"user already exist"})
        }
        const hash=bcrypt.hash(password,10)
        const hashPassowrd :string|any=hash

            const otp=6579 /// nodemaile
        const to =email
        const subject:string ="This is you otp for Career Accelerator"
        const text=`your otp is  : ${otp}`

       const receiverdata={
        to,subject,text
       }
       

        


        const newUser=await prisma.user.create({
            data:{
                name,email,password,address,isHR,company,experience,otp,isValid:false
            }
        })
        if(!newUser){
            return res.status(400).json({message:"Failed to register new user"})
        }
        const mailRes=await mailSender(receiverdata)
        console.log(mailRes);

        

        res.status(201).json({message:"user created successfullly",user:newUser,mail:mailRes})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"})
        
    }

}

export const login =async(req,res)=>{
    const {email,password}:RequestBody=req.body
    try {
        const existingUser= await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if(!existingUser){
            return res.status(404).json({message:"user doen not exist"})
        }
        if(existingUser.isValid===false){
            return res.status(403).json({message:"otp is not verified"})
        }
        const ismatch:boolean |any=bcrypt.compare(password,existingUser.password)

        if(ismatch===false){
            return res.status(404).json({message:"user doen not exist"})
        }
        const data={id:existingUser.id,isHr:existingUser.isHR}
        const token = await jwt.sign(data,"secret-code")
       res.cookie("authtoken",token,{
        httpOnly:true,
        secure:true,
        sameSite:"none",
        maxAge:1000*60*60*24,
        
       })
        res.status(200).json({message:"login  successfullly",user:existingUser})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"})
        
    }

}

export const otpChecking=async(req ,res)=>{
    const st=Number(req.body.st)
    const nd=Number(req.body.nd)
    const rd=Number(req.body.rd)
    const th=Number(req.body.th)
    const email=req.body.email

    let otp=(st*1000) +(nd*100)+(rd*10)+th;
    try {
        const existingUser= await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if(!existingUser){
            return res.status(404).json({message:"user still not created"})
        }
        if(existingUser.otp !==otp){
            return res.status(400).json({message:"otp is not matched"})
        }
        const verifieduser= await prisma.user.update({
            where:{
                email:email
            },
            data:{
                isValid:true
            }
        })
        res.status(200).json({message:"otp verified",user:verifieduser})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"})
    }



}

export const  credentials=async(req ,res)=>{
     try{
            const authtoken= req.cookies.authtoken
          /// console.log(authtoken);
            
     const verified:any=await jwt.verify(authtoken,"secret-code")
     const user=verified

      
         if(!user ||!authtoken){
            return res.status(400).json({message:"unauthorized"})
         } 
         const authUser=await prisma.user.findUnique({where:{id:user.id}})
         res.status(200).json({message:"Authorized user data",user:authUser})
        }catch(error){
            console.log(error);
            
            res.status(500).json({message:"internal server error"})
        }
}

export const logout=async(req ,res)=>{
    try {
       await res.cookie("authtoken","",{
       
        httpOnly:true,
        secure:true,
        sameSite:"none",
        
        expires:new Date(0)
    })
    const token=req.cookies.authtoken
    res.status(200).json({message:" logout successfully",token:token})
    } catch (error) {
        console.log(error);
        
        res.status(500).json({message:"internal server error"})
    }
    
}
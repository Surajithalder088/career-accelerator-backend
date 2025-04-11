

import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient()

type apply={
    userId:string,
    jobId:number
}

export const newApply=async(req ,res)=>{
    const {userId,jobId}:apply=req.body
   try {

    const user =await prisma.user.findUnique({where:{id:userId}})
    if(!user){
        return res.status(404).json({message:"user not found"})
    }
    const job =await prisma.jobPost.findUnique({where:{id:jobId}})
    if(!job){
        return res.status(404).json({message:"this job not found"})
    }
    const newApplication=await prisma.applications.create({
        data:{
            userId,jobId,status:"applied"
        }
    })
    if(!newApplication){
        return res.status(400).json({message:"failed to create new application"})
    }

   res.status(201).json({message:"applicaton successfull",job:newApplication})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"})
    }
}

export const withdraw =async(req ,res)=>{
    try {
        const jobid= Number(req.body.jobid)  // application id
        const userid:string=req.body.userid
        
       const deletedAqpply= await prisma.applications.deleteMany({
        where:{jobId:jobid,userId:userid}
       })
       if(!deletedAqpply){
        return res.status(400).status({message:"failed to withdraw application"})
       }
       res.status(200).json({message:"application has been withdrawn",job:deletedAqpply})

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"})
    }
}
export const applicationByUser=async(req ,res)=>{
    const userId=req.body.userId;
    try {
        const applicaions=await prisma.applications.findMany({
            where:{
                userId
            }
        })
        if(!applicaions){
            return res.status(404).json({message:"failed to get users applications"})
        }
        res.status(200).json({message:"all your applications",jobs:applicaions})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"})
    }
}

export const applicationByJobid=async(req ,res)=>{
    try {
        const jobid=parseInt(req.body.jobid)
        const applications =await prisma.applications.findMany({
            where:{
                jobId:jobid
            },
            include:{
                user:true
            }
        })
        if(!applications){
            return res.status(404).json({message:"Failed to get application of this job"})
        }
        

       
        
        res.status(200).json({message:"these are the applications",applications})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'internal server error'})
    }
}
export const applicationStatyusUpdate=async(req ,res)=>{
    try {
        const id=parseInt(req.body.applicationId)
        const status=req.body.status
        const applications =await prisma.applications.update({
            where:{
                id:id
            },
            data:{
                status
            }
        })
        if(!applications){
            return res.status(404).json({message:"Failed to update application of this job"})
        }
        res.status(200).json({message:"these are the applications",applications})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'internal server error',error})
    }
}
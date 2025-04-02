import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient()

export const getAllJobs=async(req ,res)=>{
  try{
    const allJobs=await prisma.jobPost.findMany({})
    if(!allJobs){
        return res.status(404).json({message:"failde to get jobs"})
    }
    res.status(200).json({message:"all jobs are fetched",jobs:allJobs})

  }catch(error){
    console.log(error);
    
    res.status(500).json({message:"internal server error"})
  }
}
export const getjobDetail=async(req ,res)=>{
  const id = parseInt(req.body.id)
  try{
    const allJobs=await prisma.jobPost.findUnique({
      where:{id:id}
    })
    if(!allJobs){
        return res.status(404).json({message:"failde to get jobs"})
    }
    res.status(200).json({message:"this job  fetched by id",jobs:allJobs})

  }catch(error){
    console.log(error);
    
    res.status(500).json({message:"internal server error"})
  }
}

export const getAllJobsApplied=async(req ,res)=>{  // it will give all the application ofthat user
    const {userid}=req.body
    try{
      const user=await prisma.user.findUnique({where :{id:userid}})
      if(!user){
          return res.status(404).json({message:"failde to get user"})
      }
      const applicatons=await prisma.applications.findMany({
        where:{userId:userid}
      })
      if(!applicatons){
        return res.status(404).json({message:"failde to get jobs"})
    } 
    
      res.status(200).json({message:"all jobs are fetchedwhich are applied",jobs:applicatons})
  
    }catch(error){
      console.log(error);
      
      res.status(500).json({message:"internal server error"})
    }
  }

  export const getAllJobsPosted=async(req ,res)=>{  // it will give all the posted by the user
    const {userid}=req.body
    try{
      const user=await prisma.user.findUnique({where :{id:userid}})
      if(!user){
          return res.status(404).json({message:"failde to get user"})
      }
      const jobs=await prisma.jobPost.findMany({
        where:{userId:userid}
      })
      if(!jobs){
        return res.status(404).json({message:"failde to get jobs"})
    }
      res.status(200).json({message:"all jobs are fetched",jobs:jobs})
  
    }catch(error){
      console.log(error);
      
      res.status(500).json({message:"internal server error"})
    }
  }

 type Job={
    title: string,
  company :string,
  address :string,
  salary :string,
  description: string,
  experience: string,
  userId:string
 }


  export const newPost=async(req ,res)=>{  // it will give all the posted by the user
    const {  title,
        company ,
        address ,
        salary ,
        description,
        experience,
        userId}:Job=req.body
    try{
      const user=await prisma.user.findUnique({where :{id:userId}})
      if(!user){
          return res.status(404).json({message:"failde to get user"})
      }
      const newjob=await prisma.jobPost.create({
        data:{
            title,
        company ,
        address ,
        salary ,
        description,
        experience,
        userId
        }
      })
      if(!newjob){
        return res.status(404).json({message:"failde create new jobs"})
    }
      res.status(201).json({message:"new job created",job:newjob})
  
    }catch(error){
      console.log(error);
      
      res.status(500).json({message:"internal server error"})
    }
  }
  export const upadtePost=async(req ,res)=>{  // it will give all the posted by the user
    const {  title,
        company ,
        address ,
        salary ,
        description,
        experience,
        userId}:Job=req.body

        const id =parseInt(req.params.id)
    try{
      const user=await prisma.user.findUnique({where :{id:userId}})
      if(!user){
          return res.status(404).json({message:"failde to get user"})
      }
      console.log(" the id is ",id);
      
      const updatedjob=await prisma.jobPost.update({
        where:{
            id:id
        },
        data:{
            title,
        company ,
        address ,
        salary ,
        description,
        experience,
        userId
        }
      })
      if(!updatedjob){
        return res.status(404).json({message:"failde update jobs"})
    }
      res.status(201).json({message:"this job updated ",job:updatedjob})
  
    }catch(error){
      console.log(error);
      
      res.status(500).json({message:"internal server error"})
    }
  }
  export const deletePost=async(req ,res)=>{  // it will give all the posted by the user
    const id=Number(req.body.id)

       
    try{
     
      
      const deletedjob=await prisma.jobPost.delete({
        where:{
            id:id
        }
        
      })
      if(!deletedjob){
        return res.status(404).json({message:"failde to delete job"})
    }
      res.status(201).json({message:"this job deleted",job:deletedjob})
  
    }catch(error){
      console.log(error);
      
      res.status(500).json({message:"internal server error"})
    }
  }



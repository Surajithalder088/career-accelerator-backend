import jwt from "jsonwebtoken"

export const authAccess=async(req ,res, next)=>{
    try{
        const authtoken= req.cookies.authtoken
 const user=await jwt.verify(authtoken,"secret-code")
   console.log(" auth",user);
     if(!user ||!authtoken){
        return res.status(400).json({message:"unauthorized"})
     } next()
    }catch(error){
        res.status(500).json({message:"unauthorized"})
    }
  

  
}
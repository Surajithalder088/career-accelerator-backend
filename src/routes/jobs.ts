import  express  from "express";
import { deletePost, getAllJobs, getAllJobsApplied, getAllJobsPosted, getjobDetail, newPost, upadtePost } from "../controllers/jobs";
import { authAccess } from "../middlewares/authChecking";

const router =express.Router()

router.get("/all",getAllJobs)
router.post('/detail',getjobDetail)
router.post("/applied",authAccess,getAllJobsApplied)  // req.body -- userid    all application of this user
router.post("/posted",authAccess,getAllJobsPosted)   // req.body -- userid
router.post("/new-post",authAccess,newPost)
router.post("/delete-post",authAccess,deletePost)  // req.body --id
router.put("/update-post/:id",authAccess,upadtePost)  // req.params--id


export default router
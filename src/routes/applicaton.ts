import express from "express"
import { applicationByJobid, applicationByUser, applicationStatyusUpdate, newApply, withdraw } from "../controllers/applicatons";
import { authAccess } from "../middlewares/authChecking";

const router =express.Router()


router.post('/apply',authAccess,newApply)
router.post('/withdraw',authAccess,withdraw)
router.post('/applicaion-by-jobid',authAccess,applicationByJobid)  // jobid in req.body
router.post('/application-by-user',authAccess,applicationByUser)
router.post('/application-status',authAccess,applicationStatyusUpdate)    // applicationId and status in req.body


export default router;
const express =require("express")
import userRoutes from "./routes/user"
import jobRoutes from "./routes/jobs"
import applyRoutes from "./routes/applicaton"
import cors from "cors"
import cookieParser from "cookie-parser"

const app=express()
const PORT=4400

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
    methods:["GET","POST","PUT","DELETE"]

    
}))
app.use("/api/user",userRoutes)
app.use("/api/jobs",jobRoutes)
app.use("/api/application",applyRoutes)

app.get("/",(req ,res)=>{
    res.send("hii")
})


app.listen(PORT,()=>{
    console.log("server running on port :",PORT);
    
})
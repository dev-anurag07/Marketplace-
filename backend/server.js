import express from "express";
import dotenv from "dotenv"//tool to read .env files
import connectDB from "./config/db.js"
import userRoutes from "./routes/userroutes.js"
import authMiddleware from "./middleware/authMiddleware.js";
import serviceroutes from "./routes/serviceroutes.js"
import bookingroutes from "./routes/bookingroutes.js"
import cors from "cors"


dotenv.config();


const app =express();
app.use(cors()); 
app.use(express.json());


connectDB();

app.get("/protected",authMiddleware,(req,res)=>{
    res.send("Access Granted");
});





app.use("/api/users", userRoutes)
app.use("/api/services",serviceroutes)
app.use("/api/bookings",bookingroutes)







const PORT = process.env.PORT||8000;
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`);
});

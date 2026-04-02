import jwt from "jsonwebtoken";

const authMiddleware = (req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.send("No web Token Provided");

        }

        const token = authHeader.split(" ")[1];// bearer abc123 => ["bearer","abc123"]

        const decoded = jwt.verify(token,"secretkey");// give output which i store in token here id and role

        req.user=decoded;// store id and role for future
        next();

    }
    catch(error){
        res.send("Invalid Token");
    }
}
export default authMiddleware
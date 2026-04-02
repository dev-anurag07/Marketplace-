const authorizeroles =(...roles)=>{
    return (req,res,next)=>{
if(!roles.includes(req.user.role)){
    return res.send("Access Denied");
}
next();
}
    };
    export default authorizeroles;

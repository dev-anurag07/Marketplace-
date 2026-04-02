import Service from "../models/service.js";

export const addservice = async (req,res)=>{
    try{
        const {title,description,price}= req.body;

        const service = new Service({
            title,
            description,
            price,
            provider: req.user.id
        });

        await service.save();
        res.send("Service added succesfully");
    }
    catch(error){
       console.log(error);
       res.send("Error adding service");
    }
};

export const getservices =async(req,res)=>{
    try{
        const services = await Service.find().populate("provider","name email");
        res.json(services);

    }
   catch(error) {
console.log(error);
res.send("Error fetching services");
    }
};
export default getservices;
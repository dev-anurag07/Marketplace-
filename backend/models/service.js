import mongoose from "mongoose";

const serviceSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },

    description: String,
    price:{
        type:Number,
        required:true,
    },

    provider:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }
},
{ timestamp:true});

const Service = mongoose.model("Service",serviceSchema);

export default Service;
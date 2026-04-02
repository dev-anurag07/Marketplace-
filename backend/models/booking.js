import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema({
    service:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Service",
        required :true
    },

    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    status:{
        type:String,
        required: true,
        enum:["pending", "accepted","rejected","cancelled","completed"],// in status only these values are allowed
        default:"pending"
    },

    date:{
        type:String
    },
    time:{
        type:String
    },

    address:{
        type:String
    },

    review:{
        type:String
    },

    rating:{
        type:Number
    }
},

    {timestamps:true}

);

const Booking = mongoose.model("Booking",bookingSchema);
export default Booking;
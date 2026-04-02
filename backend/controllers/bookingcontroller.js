import Booking from "../models/booking.js";
import Service from "../models/service.js"

export const createBooking = async(req, res)=>{
    try{
   const {serviceId,date,time,address}= req.body;
   const booking = new Booking({
    service:serviceId,
    customer:req.user.id,
    date:date,
    time:time,
    address:address,

   });
   await booking.save();
   res.send("booking created succesfully");
    }
    catch(error){
     console.log(error);
        res.send("error in creating booking");
    }
}

export const addReview = async (req,res)=>{
    try{
  const {rating,review}= req.body;

  const booking = await Booking.findById(req.params.id);

  if(!booking){
    return res.status(404).json({message:"booking not found"})
  }
if(rating<1 || rating>5){
    return res.status(400).json({message:"Rating must be between `1 and 5"});
}
  booking.rating=rating;
  booking.review=review;

  await booking.save();

  res.json({message:"review added successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"error adding review"})
    }
       
}

export const acceptBooking =async (req,res)=>{
    try{
        const{id}=req.params;
        const booking = await Booking.findById(id);
    if(!booking){
        return res.send("Booking not found");
    }

    booking.status="accepted";
    await booking.save();
    res.send("Booking accepted");
    }
    catch(error){
        console.log(error);
        res.send("error accepting booking")
    }
}

export const completeBooking = async (req,res)=>{
    try{
         const{id}=req.params;
         const booking = await Booking.findById(id);
         if(!booking){
           return res.send("Booking not Found");
         }
         booking.status="completed";

         await booking.save();

         res.send("booking completed");

    }
    catch(error){
   console.log(error);
   res.send("error in completing booking");
    }
}

export const getCustomerBookings = async(req,res)=>{
    try{
        const bookings =await Booking.find({customer:req.user.id}).populate("service");
        res.json(bookings);
    }
    catch(error){
        console.log(error);
        res.send("error fetching customer bookings");
    }
};

export const getproviderBookings =async(req,res)=>{
    try{
        // get services of provider
        const services = await Service.find({provider:req.user.id});

        //extract the service ids 
        const serviceIds = services.map((s)=>s._id);

        // get the booking this services has
        const bookings = await Booking.find({service:{$in: serviceIds}}).populate("service");

        res.json(bookings);

    }
    catch(error){
        console.log(error);
        res.send("error in fetching providers booking")
    }
}

export const cancelBooking = async (req,res)=>{
    try{
const {id}=req.params;// this is the booking id which have to cancel
const booking = await Booking.findById(id);
if(!booking){
    return res.send("No Booking found");
    // is this your booking
}

    if(booking.customer.toString()!==req.user.id){
        return res.send("you cannot cancel this booking");
    }

    if(booking.status==="completed"){
        return res.send("booking already completed cannot be cancelled");
    }
    booking.status="cancelled";
    await booking.save();
    res.send("Booking cancelled");

}
 catch(error){
    console.log(error);
    res.send("error cancelling booking")
}
    
}

export const rejectBooking = async(req,res)=>{
    try{
        const {id}=req.params;

        const booking =await Booking.findById(id).populate("service");

        if(!booking){
            return res.send("Booking not found");
        }

        if(booking.service.provider.toString()!==req.user.id){// toString+> to convert provider object id to string to compare with jwt req.user.id 
            return res.send("you cannot reject this booking");
        }

        if(booking.status !=="pending"){
            return res.send("only pending booking can be rejected");
        }

        booking.status="rejected";
        await booking.save();

        res.send("Booking rejected");

    }
    catch(error){
        console.log(error);
        res.send("error rejecting booking");
    }
}
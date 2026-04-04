import React, { useEffect ,useState} from 'react'
import axios from 'axios';
import Navbar from '../components/Navbar';


const Dashboard = () => {

    const [services, setservices] = useState([]);
    const [bookings, setbookings] = useState([]);
    const [role, setRole] = useState(null);
    const [filter, setFilter] = useState("all");
    const [selectedService, setselectedService] = useState(null);
    const [formData, setformData] = useState({date:"",time:"",address:""});
    const [selectedBooking, setselectedBooking] = useState(null);
    const [serviceData, setserviceData] = useState({
        title:"",
        description:"",
        price:"",
    })

    const [reviewData, setreviewData] = useState({
        review:" ",
        rating:" ",
    })




    const filteredBookings =
    filter==='all'
    ?bookings
    :bookings.filter((b)=>(b.status.toLowerCase()===filter.toLowerCase()));

    

    const submitReview=async()=>{
        try{
            const token =localStorage.getItem('token');
            await axios.put(`https://marketplace-localserviceprovider.onrender.com/api/bookings/review/${selectedBooking}`
                ,reviewData,{headers:{Authorization:`Bearer ${token}`}})
                  alert("review added successfully")

                  setselectedBooking(null);
                  setreviewData({
                    rating:'',
                    review:"",
                  })

                  fetchBookings();
        }
        catch(err){
            console.log(err.reponse?.data)
            alert("failedd to add review")
        }
      

    }
   const handleBooking= async()=>{
    try{
        const token = localStorage.getItem('token');

        await axios.post("https://marketplace-localserviceprovider.onrender.com/api/bookings/create",
            {serviceId:selectedService,
                date:formData.date,
                time:formData.time,
                address:formData.address,
            },
        {headers:{Authorization: `Bearer ${token}`}})
        alert("Booking successful");

        setselectedService(null);
        setformData({
            date:"",
            time:"",
            address:"",
        })

        fetchBookings();
    }
    catch(error){
        console.log(err.reponse?.data);
        alert("Booking failed");
    }
   }





    const acceptBooking =async(id)=>{
        try{
            const token = localStorage.getItem('token');

            await axios.put(`https://marketplace-localserviceprovider.onrender.com/api/bookings/accept/${id}`,{},
                {headers:{Authorization:`Bearer ${token}`}})

                fetchProviderBookings();
        }
        catch(error){
            console.log(error.reponse?.data);
        }
    }



    const rejectBooking=async(id)=>{
        try{
      const token = localStorage.getItem('token');
       await axios.put(`https://marketplace-localserviceprovider.onrender.com/api/bookings/reject/${id}`,{},
        {headers:{Authorization:`Bearer ${token}`}})

        fetchProviderBookings();
        }
        catch(err){
            console.log(err.reponse?.data);
        }
    }



    const completeBooking=async(id)=>{
        try{
            const token = localStorage.getItem('token');
await axios.put(`https://marketplace-localserviceprovider.onrender.com/api/bookings/complete/${id}`,{},
        {headers:{Authorization:`Bearer ${token}`}})
  fetchProviderBookings();
        }
        catch(err){
            console.log(err.response?.data);
        }
    }



    

const fetchProviderBookings = async()=>{
    try{
        const token = localStorage.getItem('token');

        const res= await axios.get("https://marketplace-localserviceprovider.onrender.com/api/bookings/provider",
            {headers:{Authorization:`Bearer ${token}`}})

            setbookings(res.data);
    }
    catch(error){
        console.log(error.response?.data);
    }
}




    const fetchBookings=async()=>{
        try{
            const token = localStorage.getItem('token');

            const res =await axios.get("https://marketplace-localserviceprovider.onrender.com/api/bookings/customer",
                {headers:{Authorization: `Bearer ${token}`}});
               
                setbookings(res.data);
        }
        catch(error){
            console.log(error);
        }
    }





    const cancelBooking =async(id)=>{
        try{
            const token = localStorage.getItem('token');

            await axios.put(`https://marketplace-localserviceprovider.onrender.com/api/bookings/cancel/${id}`,{},
                {headers:{Authorization :`Bearer ${token}`}})
                fetchBookings();
                alert ("Booking Cancelled");
        }
        catch(error){
            console.log(error.response?.data);
            alert("Cancel failed")
        }
    }




    const bookService= async(id)=>{
        try{
            const token = localStorage.getItem("token");

           const res= await axios.post("https://marketplace-localserviceprovider.onrender.com/api/bookings/create",{
                serviceId:id },{headers:{Authorization: `Bearer ${token}`}}

            );
            console.log(res.data)
            alert("Booking successful")
        }
        catch(error){
            console.log(error);
            alert('Booking failed');
        }
    }

const fetchServices= async()=>{
    try{
        const res = await axios.get("https://marketplace-localserviceprovider.onrender.com/api/services/all");
        setservices(res.data);
    }
    catch(error){
        console.log(error);
    }
}
const handleAddservice=async()=>{
    try{
        const token =localStorage.getItem('token');

        await axios.post("https://marketplace-localserviceprovider.onrender.com/api/services/add",serviceData,{headers:{Authorization:`Bearer ${token}`}})
        alert("service added successfully");

        setserviceData({
            title:" ",
            description:" ",
            price:"",

        })
       
    }
     catch(err){
            console.log(err.response?.data);
            alert("error in adding service");
        }
}



useEffect(()=>{
      const token =localStorage.getItem('token');
      if(!token){
        navigate("/")
      }

    const payload =JSON.parse(atob(token.split(".")[1]));
    const userRole =payload.role

    setRole(userRole);

    if(userRole==='customer'){
        fetchServices();
        fetchBookings();
    }

    if(userRole==='provider'){
        fetchProviderBookings();
    }
},[]


)


return (
  <div>
<Navbar/>
    <div><div className='flex gap-2 mb-4'>
        <button  onClick={()=>{
            setFilter("all")
        }}>All</button>
        <button onClick={()=>{
            setFilter("pending")
        }}>Pending</button>
        <button onClick={()=>{
            setFilter("accepted")
        }}>Accepted</button>
        <button onClick={()=>{
            setFilter("completed")
        }}>Completed</button>
    </div>

    {role === "customer" && (
      <div className='p-6'>
        <h2 className='text-2xl font-bold mb-4'>Services</h2>

        {services.map((s) => (
          <div key={s._id} className='border p-4 mb-3 rounded shadow'>
            <h3 className='text-lg font-semibold'>{s.title}</h3>
            <p className='text-gray-600'>{s.price}</p>

            <button onClick={() => setselectedService(s._id)} 
            className='bg-blue-500 text-white px-3 py-1 mt-2 rounded'>
              Book
            </button>
          </div>
        ))}

        {selectedService && (
            <div className='border p-4 mt-4'>
                <h3>Book Service</h3>

                <input type='date'
                value={formData.date}
                onChange={(e)=>
                    setformData({...formData, date:e.target.value})
                }
                />

                 <input type='time'
                value={formData.time}
                onChange={(e)=>
                    setformData({...formData, time:e.target.value})
                }
                />

                 <input type='text'
                 placeholder='enter address'
                value={formData.address}
                onChange={(e)=>
                    setformData({...formData, address:e.target.value})
                }
                />

               <button onClick={handleBooking}>Confirm Booking</button>
                </div>
        )}

        <h2 className='text-2xl font-bold mt-6 mb-4'>My bookings</h2>

        
        {filteredBookings.map((b) => (
          < div className='border p-4 mb-3 rounded shadow' key={b._id}>

            <p className='font-medium'>Service : {b.service.title}</p>
            <p className={`font-medium px-2 py-1 rounded ${
            b.status==="pending"
            ? "text-yellow-500"
            :b.status==="accepted"
            ?"text-green-500"
            :b.status==='completed'
             ?'text-blue-500'
            :"text-red-500"}` }>Status : {b.status}</p>
            <p>Date : {b.date}</p>
            <p>Time : {b.time}</p>
            <p>Address : {b.address}</p>
            <p>Rating : {b.rating}</p>
            <p>Review : {b.review}</p>
           {b.status?.toLowerCase() === "completed" && (
  <button
    onClick={() => setselectedBooking(b._id)}
    className='bg-purple-500 text-white px-2 py-1 rounded'>
    Add Review
  </button>
)}
    
        {selectedBooking===b._id &&(
            <div className='border p-4 mt-4'>
                <h3>Add Review</h3>

                <input type='number'
                min='1'
                max='5'
                placeholder="Rating(1-5)"
                onChange={(e)=> setreviewData({...reviewData,rating:e.target.value})}
                className='border p-2'/>

                <input type='text'
                placeholder='Write review'
                onChange={(e)=>
                    setreviewData({...reviewData,review:e.target.value})}
                    className='border p-2'
                />
                <button onClick={submitReview} className='bg-blue-500 text-white p-2 mt-2'>Submit</button>
                </div>
        )}

            <button onClick={() => cancelBooking(b._id)} 
            className='bg-red-500 text-white px-3 py-1 mt-2 rounded'>
              Cancel
            </button>
        
          </div>
          
        ))}

        
      </div>
    )}

      

   
    {role === "provider" && (
      <div className='p-6'>
        <div>
        <h2>Add Service</h2>

        <input type='text'
        placeholder='title'
        className='border p-2 w-full mb-2 '
        onChange={(e)=>
            setserviceData({...serviceData,title:e.target.value})
        }
        />
         <input type='text'
        placeholder='description'
        className='border p-2 w-full mb-2 '
        onChange={(e)=>
            setserviceData({...serviceData,description:e.target.value})
        }
        />
         <input type='number'
        placeholder='price'
        className='border p-2 w-full mb-2 '
        onChange={(e)=>
            setserviceData({...serviceData,price:e.target.value})
        }
        />

        <button onClick={handleAddservice} className='bg-green-500 text-white px-4 py-2 rounded'>Add Service</button>
        </div>
        <h2 className='text-2xl font-bold mb-4'>Provider Bookings</h2>

        {filteredBookings.map((b) => (
          <div className='border p-4 mb-3 rounded shadow'key={b._id}>
            <p className='font-medium'>{b.service.title}</p>
            <p>Status: {b.status}</p>
            <p>Rating:{b.rating || "not rated"}</p>
            <p>Review:{b.review || "not reviewed"}</p>

            <div className='flex gap-2 mt-2'>
                
                <button className='bg-green-500 text-white px-3 py-1 rounded active:scale-95' onClick={() => acceptBooking(b._id)}>
              Accept
            </button>

            <button className='bg-yellow-500 text-white px-3 py-1 rounded active:scale-95'onClick={() => rejectBooking(b._id)}>
              Reject
            </button>

            <button className='bg-blue-500 text-white px-3 py-1 rounded active:scale-95' onClick={() => completeBooking(b._id)}>
              Complete
            </button></div>
          </div>
        ))}
      </div>
    )}</div>

    

  </div>
);
}
export default Dashboard

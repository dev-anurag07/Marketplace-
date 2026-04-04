import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const Register =()=>{
    const navigate =useNavigate();

    const [role, setRole] = useState(null);

    const [formData, setformData] = useState({
        name:"",
        email:"",
        password:"",
    });

    const handleNameChange = (e)=>{
        setformData({...formData,name:e.target.value})
    }

    const handleEmailChange =(e)=>{
        setformData({...formData,email:e.target.value})
    }

    const handlePasswordChange =(e)=>{
        setformData({
            ...formData, password: e.target.value,
        })
    }


    const handleRegister = async()=>{
        try{
            await axios.post("https://marketplace-localserviceprovider.onrender.com/api/users/register",{...formData,role,})
            alert("Register successfully");
            navigate('/');

        }
        catch(err){
            console.log(err.response?.data);
            alert("Register failed");
        }

    }



    return (
        <div className="p-6 max-w-sm mx-auto">
            {!role ? (
                <div className="flex flex-col gap-4 items-center">
                    <h2 className="text-xl font-bold">Select Role</h2>

                    <button onClick={()=> setRole('customer')} className="bg-blue-500 text-white p-2 w-40 rounded">Customer</button>
                    <button onClick={()=>setRole('provider')} className="bg-green-500 text-white p-2 w-40 rounded">Provider</button>
                    
                    
                    </div>
                    ) :(
                        <div className="flex flex-col gap-3">
                            <h2 className="text-xl font-bold">Register as {role} </h2>

                            <input type='text' placeholder ='name' value={formData.name} onChange={handleNameChange} className="border p-2"/>
                            <input type='email' placeholder ='Email' value={formData.email} onChange={handleEmailChange} className="border p-2"/>
                            <input type='password' placeholder ='Password' value={formData.password} onChange={handlePasswordChange} className="border p-2"/>
                            <button onClick={handleRegister} className="bg-blue-500 text-white p-2 rounded">Register</button>

                            <button onClick={()=> setRole(null)} className="text-gray-500">Change Role</button>
                    </div>
                    )
            }

        </div>
    )
}

export default Register

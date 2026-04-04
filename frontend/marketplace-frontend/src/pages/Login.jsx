import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();
  
  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await axios.post("https://marketplace-localserviceprovider.onrender.com/api/users/login", {
        email, password
      });

      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[150]">

        
        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          className="w-full border p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          className="w-full border p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded 
                     hover:bg-blue-600 active:scale-95 
                     transition-transform duration-150"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        
        <p className="text-center text-gray-500 mt-4">
          Don't have an account?
        </p>

        
        <button
          onClick={() => navigate('/register')}
          className="w-full mt-2 border border-blue-500 text-blue-500 py-2 rounded 
                     hover:bg-blue-50 active:scale-95 
                     transition-transform duration-150"
        >
          Create Account
        </button>

      </div>
    </div>
  )
}

export default Login;

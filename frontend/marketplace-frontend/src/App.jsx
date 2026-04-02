import React from 'react'
import Login from './pages/Login'
import {BrowserRouter, Routes , Route} from "react-router-dom"
import { lazy, Suspense } from 'react'

const Dashboard= lazy(()=> import("./pages/Dashboard"));
const Register =lazy(()=>import("./pages/Register"))

const App = () => {
  return (
    <BrowserRouter>
    <Suspense fallback={<p>Loading...</p>}> <Routes>
    <Route path ='/' element={<Login/>}/>
     <Route path ='/dashboard' element={<Dashboard/>}/>
<Route path ='/register' element={<Register/>}/>
      </Routes></Suspense>
   
      
      </BrowserRouter>
  )
}

export default App

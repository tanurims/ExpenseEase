import React from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/inputs/input'
import { Link } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATH } from '../../utils/apiPath'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import toast from 'react-hot-toast'


const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const {updateUser} = useContext(UserContext)

  const navigate = useNavigate()

  //handle login form submit
  const handleLogin = async(e) => {
    e.preventDefault()

    if(!validateEmail(email)){
      setError("Please enter a valid email address")
      return
    }

    if(!password){
      setError("Please enter your password")
      return
    }

    setError("");

    //login API call
    try {

      const response = await axiosInstance.post(API_PATH.AUTH.LOGIN, {
        email,
        password,
      });

      const {token,user} = response.data;

      if(token) {
        localStorage.setItem("token",token);
        updateUser(user);
        toast.success("Login successful");
        navigate("/dashboard")
      }
      
    } catch (error) {
      if(error.response && error.response.data.message) {
        setError(error.response.data.message)
      } else{
        setError("Something went wrong. please try again");
      }

      toast.error("Login failed");
      
    }


    
  }

  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please enter your details to login</p>

        <form onSubmit={handleLogin}>

          {/*reusable component*/}
          <Input 
          type="text"
          value={email}
          onChange={({target})=>setEmail(target.value)}
          label="Email Adrees"
          placeholder="john@example.com" />

          <Input 
          type="password"
          value={password}
          onChange={({target})=>setPassword(target.value)}
          label="Password"
          placeholder="Min 8 Characters" />

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type='submit' className='btn-primary'>
            Login
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Don't have an account?{" "}
            <Link to="/signUp" className='font-medium text-primary underline'>
             SignUp
            </Link>
          </p>


        </form>

      </div>
      
    </AuthLayout>
  )
}

export default Login

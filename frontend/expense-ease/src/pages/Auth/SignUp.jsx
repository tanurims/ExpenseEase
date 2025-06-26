import React from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/inputs/input'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'
import { Link } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATH } from '../../utils/apiPath'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'

const SignUp = () => {

  const [profilePic, setProfilePic] = useState(null)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState(null)

  const {updateUser} = useContext(UserContext)

  const navigate = useNavigate()

  //handle signup form submit
  const handleSignUp = async (e) => {
    e.preventDefault()

    let profileImageUrl = " ";

    if(!fullName){
      setError("Please enter your full name")
      return
    }

    if(!validateEmail(email)){
      setError("Please enter a valid email address")
      return
    }

    if(!password){
      setError("Please enter your password")
      return
    }

    setError("");

    //signup API call
    try {

      //upload image if present
      if(profilePic){
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || " ";
      }

      const response = await axiosInstance.post(API_PATH.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
        
      });

      const {token,user} = response.data;

      if(token){
        localStorage.setItem("token",token);
        updateUser(user);
        navigate("/dashboard")
      }
      
    } catch (error) {
      if(error.response && error.response.data.message) {
        setError(error.response.data.message)
      } else{
        setError("Something went wrong. please try again");
      }
      
    }

  }

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join us today by entering your details below</p>
      

      <form onSubmit={handleSignUp}>

                <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />


        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

          <Input 
            type="text"
            value={fullName}
            onChange={({target})=>setFullName(target.value)}
            label="Full Name"
            placeholder="john" />

          <Input 
            type="text"
            value={email}
            onChange={({target})=>setEmail(target.value)}
            label="Email Adrees"
            placeholder="john@example.com" />

          <div className='col-span-2'>
            <Input 
            type="password"
            value={password}
            onChange={({target})=>setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters" />
    

        </div>

        </div>

        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

        <button type='submit' className='btn-primary'>
            SIGN UP
        </button>
        
        <p className='text-[13px] text-slate-800 mt-3'>
          Already have an account?{" "}
          <Link to="/login" className='font-medium text-primary underline'>
            Login
          </Link>
        </p>


      </form>
    </div>  
    </AuthLayout>
  )
}

export default SignUp

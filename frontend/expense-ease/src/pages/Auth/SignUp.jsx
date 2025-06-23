import React from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/inputs/input'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'
import { Link } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'

const SignUp = () => {

  const [profilePic, setProfilePic] = useState(null)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState(null)

  const navigate = useNavigate()

  //handle signup form submit
  const handleSignUp = async (e) => {

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
      </form>
    </div>  
    </AuthLayout>
  )
}

export default SignUp

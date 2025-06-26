import React from 'react'
import DashbardLayout from '../../components/layouts/DashbardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'

const Home = () => {

  useUserAuth();


  return (
    <DashbardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">Home</div>
    </DashbardLayout>
  )
}

export default Home

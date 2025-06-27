import React, { useEffect } from 'react'
import DashbardLayout from '../../components/layouts/DashbardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPath';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { addThousandsSeparator } from '../../utils/helper';
import InfoCard from '../../components/Cards/InfoCard';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';

import {LuHandCoins,LuWalletMinimal} from 'react-icons/lu'
import {IoMdCard} from 'react-icons/io'


const Home = () => {

  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if(loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATH.DASHBOARD.GET_DATA}`
      );

      if(response.data){
        setDashboardData(response.data);
        
      }
      
    } catch (error) {
      console.log("Something went wrong.Please try again",error)
      
    } finally{
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchDashboardData();
    return () =>{};
  },[]);




  return (
    <DashbardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard
          icon={<IoMdCard/>}
          label="Total Balance"
          value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
          color="bg-orange-500"
          />

          <InfoCard
          icon={<LuHandCoins/>}
          label="Total Income"
          value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
          color="bg-primary"
          />

          <InfoCard
          icon={<LuWalletMinimal/>}
          label="Total Expense"
          value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
          color="bg-red-500"
          />

          

        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransactions
          transactions={dashboardData?.recentTransactions}
          onSeeMore={()=>navigate("/expense")}
          />
        </div>
      </div>
    </DashbardLayout>
  )

}
export default Home

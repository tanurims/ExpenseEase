import React, { useEffect } from 'react'
import { useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import { prepareIncomeChartData } from '../../utils/helper'
import CustomBarChart from '../../components/Charts/CustomBarChart'

const IncomeOverview = ({transactions, onAddIncome}) => {

    const[chartData, setChartData] = useState([]);

    useEffect(()=>{
        const result = prepareIncomeChartData(transactions);
        setChartData(result);

        return () => {};
        
        },[transactions]);

  return <div className='card'>
    <div className='flex items-center justify-between'>
        <div>
            <h5 className='text-lg'>Income Overview</h5>
            <p className='text-xs text-gray-400 mt-0.5'>
                Track your earnings over time and analyze your income trends.
            </p>
        </div>

        <button className='add-btn' onClick={onAddIncome}>
            <LuPlus className='text-lg'/>
            Add Income
        </button>
    </div>

    <div className='mt-10'>
        <CustomBarChart data={chartData}/>
    </div>
      
    </div>
  
}

export default IncomeOverview

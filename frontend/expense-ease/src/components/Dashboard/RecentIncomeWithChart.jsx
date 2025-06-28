import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import CustomPieChart from '../Charts/CustomPieChart';

const COLOR = ["#875cf5", "#fa2c37", "#ff6900", "#4f39f6"]


const RecentIncomeWithChart = ({data,totalIncome}) => {

    const[chartData,setChartData] = useState([]);

    const prepareChartData = () =>{
        const dataArr = data?.map((item)=>({
            name:item.source,
            amount:item.amount
        }));

        setChartData(dataArr);
    };

    useEffect(()=>{
        prepareChartData();
        return()=>{};
    },[data]);

  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Last 60 Days Top Incomes</h5>
        </div>

        <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`Rs.${totalIncome}`}
        showTextAnchor
        colors={COLOR}/>
      
    </div>
  )
}

export default RecentIncomeWithChart

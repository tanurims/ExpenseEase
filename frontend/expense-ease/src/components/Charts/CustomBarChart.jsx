import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const CustomBarChart = ({data}) => {

    console.log("Chart data received:", data)

    //function to alternate colors
    const getBarColor = (index) => {
          console.log(`Bar ${index}: ${index % 2 === 0 ? "#FF0000" : "#00FF00"}`);

        
        return index % 2 === 0 ? "#875cf5" : "#cfbefb";
    };

    const CustomTooltip = ({active,payload}) => {
        if(active && payload && payload.length){
            return(
                <div className='bg-white shadow-md p-2 rounded-lg border border-gray-300'>
                    <p className='text-xs font-semibold text-purple-800 mb-1'>{payload[0].payload.category}</p>
                    <p className='text-sm text-gray-600'>
                        Amount: <span className='text-sm font-medium text-gray-900'>Rs.{payload[0].payload.amount} </span>
                    </p>
                </div>
            )
        }
        return null;
    };

    

  return (

    

    <div className='bg-white mt-6'>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid stroke='none'/>
                <XAxis dataKey="month" tick={{fontSize: 12, fill: "#555"}} stroke='none'/>
                <YAxis tick={{fontSize: 12, fill: "#555"}} stroke='none'/>

                <Tooltip content={<CustomTooltip/>}/>
                
                <Bar
                dataKey="amount"
                fill='#FF8842'
                radius={[10,10,0,0]}
                activeDot={{r:8, fill:"yellow"}}
                activeStyle={{fill:"green"}}
                >
                    {data.map((entry,index)=>(
                        <Cell key={index} fill={getBarColor(index)}/>
                    ))}
                </Bar>

            </BarChart>
        </ResponsiveContainer>
      
    </div>
  )
}

export default CustomBarChart

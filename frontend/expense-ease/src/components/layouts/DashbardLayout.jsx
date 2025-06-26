import React from 'react'
import {UserContext} from '../../context/UserContext'
import { useContext } from 'react'
import Navbar from '../../components/layouts/Navbar'
import SideMenu from '../../components/layouts/SideMenu'



const DashbardLayout = ({children, activeMenu}) => {

    const {user} = useContext(UserContext)


  return (
    <div className=''>
        <Navbar activeMenu={activeMenu}/>

        {user && (
            <div className='flex'>
                <div className='max-[1080px]:hidden'>
                    <SideMenu activeMenu={activeMenu}/>
                </div>

                <div className='grow mx-5'>{children}</div>
            </div>
        )}
      
    </div>
  )
}

export default DashbardLayout

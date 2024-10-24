import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidbar from '../Components/DashSidbar'
import DashProfile from '../Components/DashProfile'

function Dashboard() {
  const location =  useLocation()
  const [tab, setTab] = useState('')

  console.log('location', location)

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    console.log('tapFromUrl', tabFromUrl)
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
    
  }, [location.search])
  return (
    <div>
      <div>
        <DashSidbar/>
      </div>
      <div>
        {tab === 'profile' && <DashProfile/>}
        {tab === 'settings' && <h1>Settings</h1>}
      </div>
    </div>
  )
}

export default Dashboard
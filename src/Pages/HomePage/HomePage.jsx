import React from 'react'
import Sidebar from '../../Components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import CreateReelForm from '../../Components/Reels/CreateReelForm'
import Reels from '../../Components/Reels/Reels'
import MiddlePart from '../../Components/MiddlePart/MiddlePart'
import Profile from '../Profile/Profile'
import HomeRight from '../../Components/HomeRight/HomeRight'

function HomePage() {

return ( 
<div className="min-h-screen w-full bg-zinc-200 flex flex-col md:flex-row">

  <div className="hidden md:block md:w-[220px] lg:w-[250px] p-2 md:p-4 bg-zinc-100">
    <div className="fixed top-5">
      <Sidebar />
    </div>
  </div>


  <div className="flex-1 w-full px-2 sm:px-4 md:px-6">
    <div className="max-w-[750px] mx-auto">
      <Routes>
        <Route path="/" element={<MiddlePart />} />
        <Route path="reels" element={<Reels />} />
        <Route path="create_reel" element={<CreateReelForm />} />
        <Route path="profile/:id" element={<Profile />} />
      </Routes>
    </div>
  </div>


  <div className="hidden lg:block lg:w-[280px] xl:w-[320px] p-2">
    <HomeRight />
  </div>

</div>
)
}

export default HomePage
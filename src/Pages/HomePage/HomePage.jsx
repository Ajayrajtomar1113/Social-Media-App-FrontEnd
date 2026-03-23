import React, { useEffect } from 'react'
import Sidebar from '../../Components/Sidebar'
import { Routes, Route} from 'react-router-dom'
import CreateReelForm from '../../Components/Reels/CreateReelForm'
import Reels from '../../Components/Reels/Reels'
import MiddlePart from '../../Components/MiddlePart/MiddlePart'
import Profile from '..//Profile/Profile'
import HomeRight from '../../Components/HomeRight/HomeRight'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileAction } from '../../Redux/Auth/auth.action'
import Message from '../Message/Message'

function HomePage() {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt")
    const auth= useSelector(store=>store.auth);
    // console.log("auth",auth)
    useEffect(() => {
      if (jwt) {
        dispatch(getProfileAction(jwt))
      }
    }, [jwt, dispatch])
  return (

    <div className="min-h-screen w-full bg-zinc-200">
      
      <div className="grid grid-cols-12 w-full">
        <div className="col-span-3 p-4 bg-zinc-100">
          <div className="sticky top-0">
                    <Sidebar></Sidebar>
                </div>
        </div>

        {/* Middle - 6 */}
        <div className="col-span-6 p-2 flex justify-center border-b-indigo-600">
         <div className='ml-3'>
                    <Routes>
                            <Route path="/" element={<MiddlePart/>} />
                            <Route path="reels" element={<Reels/>} />
                            <Route path="create_reel" element={<CreateReelForm/>} />
                            <Route path="profile/:id" element={<Profile/>}/>
                            <Route path="message" element={<Message/>}/>
                    </Routes>
                </div>
        </div>

        {/* Right - 3 */}
        <div className="col-span-3">
                <div className='ml-4'>
                    <HomeRight></HomeRight>
                </div>
        </div>

      </div>

    </div>


  )
}

export default HomePage

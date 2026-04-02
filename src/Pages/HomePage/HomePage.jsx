import React, { useEffect } from 'react'
import Sidebar from '../../Components/Sidebar'
import { Routes, Route} from 'react-router-dom'
import CreateReelForm from '../../Components/Reels/CreateReelForm'
import Reels from '../../Components/Reels/Reels'
import MiddlePart from '../../Components/MiddlePart/MiddlePart'
import Profile from '..//Profile/Profile'
import HomeRight from '../../Components/HomeRight/HomeRight'
import { useDispatch} from 'react-redux'
import { getProfileAction } from '../../Redux/Auth/auth.action'
import Message from '../Message/Message'

function HomePage() {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt")
    // const auth= useSelector(store=>store.auth);
    // console.log("auth",auth)
    useEffect(() => {
      if (jwt) {
        dispatch(getProfileAction(jwt))
      }
    }, [jwt, dispatch])
  return (

    <div className="min-h-screen w-full bg-zinc-200 flex justify-evenly">

  {/* LEFT SIDEBAR */}
  <div className="hidden md:block w-[250px] p-4 bg-zinc-100">
    <div className="sticky top-0">
      <Sidebar />
    </div>
  </div>

  {/* MIDDLE CONTENT */}
  <div className="w-full max-w-[700px] p-2">
    <Routes>
      <Route path="/" element={<MiddlePart />} />
      <Route path="reels" element={<Reels />} />
      <Route path="create_reel" element={<CreateReelForm />} />
      <Route path="profile/:id" element={<Profile />} />
      <Route path="message" element={<Message />} />
    </Routes>
  </div>

  {/* RIGHT PANEL */}
  <div className="hidden lg:block w-[300px] p-2">
    <HomeRight />
  </div>

</div>


  )
}

export default HomePage

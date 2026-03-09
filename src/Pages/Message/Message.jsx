import React from 'react'
import WestIcon from '@mui/icons-material/West';
import { Avatar, Grid, IconButton } from '@mui/material';
import AddCallIcon from '@mui/icons-material/AddCall';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

function Message() {
const handleSelectImage=()=>{
  console.log("handle select image")
}

  return (
    // <div className="min-h-screen w-full bg-zinc-200">
      
      <div className="grid grid-cols-12 h-screen overflow-y-hidden">
        <div className="col-span-3 p-4 bg-zinc-100">
          <div className="flex h-full justify-between space-x-2">
            <div className="w-full">
              <div className="flex space-x-4 items-center py-5">
              <WestIcon></WestIcon>
              <h1 className='text-xl font-bold'>Home</h1>
            </div>
            <div className='h-[83vh]'>
              <div>
                Searchuser
              </div>
              <div className="h-full space-y-4 mt-4 overflow-y-scroll hideScrollbar">
              user char card
              </div>
            </div>
            </div>
          </div>
        </div>

       
        <div className="col-span-9 h-full">
          <div className="flex justify-between items-center border-1 p-5">
            <div className="flex items-center space-x-3">
              <Avatar src='https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg'/>
              <p>Ajay Raj</p>
            </div>
            <div className="flex space-x-3">
              <IconButton>
                <AddCallIcon/>
              </IconButton>
              <IconButton>
                <VideoCallIcon/>
              </IconButton>
            </div>
          </div>
          <div className='hideScrollbar overflow-y-scroll h-[82vh] px-2 space-y-5 pl-5'>
            message
          </div>
          <div className='sticky bottom-0 border-l'>
            <div className="py-5 flex items-center justify-center space-x-2">
              <input type="text"  className='bg-transparent border border-[#575a66] outline-none rounded-full w-[90%] py-3 px-5' placeholder='Type message...'/>
              <div>
                <input type="file" accept='image/*' onChange={handleSelectImage} className='hidden' id='image-input'/>
                <label htmlFor="image-input"><AddPhotoAlternateIcon/></label>
              </div>
            </div>
          </div>
        </div>
     </div>
     
  )
}

export default Message

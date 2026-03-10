import { Avatar, Card, CardHeader } from '@mui/material'
import React, { useState } from 'react'

function SearchUser() {
  const [username,setUsername]=useState(null)
  const handleSearchUser=(e)=>{
    setUsername(e.target.value);
    console.log("Search user...")
  }
  const handleClick=(id)=>{
    console.log(id)
  }
  return (
    <div>
      <div className="py-5 relative">
        <input type="text" 
        className='bg-transparent border border-[#3b4054] outline-none w-full px-5 py-3 rounded-full' 
        placeholder='Search user...' 
        onChange={handleSearchUser}
        />
        {
        username && 
        (<Card className='absolute w-full z-10 top-[4.5rem] cursor-pointer'> 
            <CardHeader onClick={()=>{
              handleClick()
              setUsername("")
            }}
            avatar={<Avatar src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"/>}
            title="Ajay Raj"
            subheader={"@ajayraj"}
            />
        </Card>
      )}
      </div>
      
    </div>
  )
}

export default SearchUser

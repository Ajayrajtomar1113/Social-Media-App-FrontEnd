// import { Avatar, Card, CardHeader } from '@mui/material'
// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { searchUser } from '../../Redux/Auth/auth.action';
// import { createChat } from '../../Redux/Message/message.action';
// import { useNavigate } from 'react-router-dom';

// function SearchUser({isChat}) {
//   const [username,setUsername]=useState(null)
//   const dispatch = useDispatch();
//   const auth=useSelector(store=>store.auth)
//   const navigate = useNavigate()
  
//   const handleSearchUser=(e)=>{
//     setUsername(e.target.value);
//     dispatch(searchUser(username))
//   }

//   const handleClick = (id) => {
//   if (isChat) {
//     dispatch(createChat({ userId: id }))
//   } else {
//     navigate(`/profile/${id}`)
//   }
// }
//   return (
//     <div>
//       <div className="py-5 relative">
//         <input type="text" 
//         className='bg-transparent border border-[#3b4054] outline-none w-full px-5 py-3 rounded-full' 
//         placeholder='Search user...' 
//         onChange={handleSearchUser}
//         />
//         {
//           username && 
//           (
//             auth.searchUser?.map((item)=>(
//               <Card key={item.id} className='absolute w-full z-10 top-[4.5rem] cursor-pointer'> 
//                 <CardHeader
//                   onClick={()=>{
//                     handleClick(item.id)
//                     setUsername("")
//                   }}
//                   avatar={<Avatar src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"/>}
//                   title={item.firstName + " " + item.lastName}
//                   subheader={"@" + item.firstName.toLowerCase()+"_"+item.lastName.toLowerCase()}
//                 />
//               </Card>
//             ))
//           )}
//       </div>
      
//     </div>
//   )
// }

// export default SearchUser

import { Avatar, Card, CardHeader } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchUser } from '../../Redux/Auth/auth.action';
import { createChat } from '../../Redux/Message/message.action';
import { useNavigate } from 'react-router-dom';

function SearchUser({ isChat }) {

  const [username, setUsername] = useState(""); // ✅ fixed
  const dispatch = useDispatch();
  const auth = useSelector(store => store.auth);
  const navigate = useNavigate();

  // ✅ FIX: useEffect for API call
  useEffect(() => {
    if (username.trim()) {
      dispatch(searchUser(username));
    }
  }, [username, dispatch]);

  const handleSearchUser = (e) => {
    setUsername(e.target.value);
  }

  const handleClick = (id) => {
    if (isChat) {
      dispatch(createChat({ userId: id }))
    } else {
      navigate(`/home/profile/${id}`)
    }
    setUsername(""); // ✅ clear input
  }

  return (
    <div>
      <div className="py-5 relative">

        <input
          type="text"
          value={username}
          className='bg-transparent border border-[#3b4054] outline-none w-full px-5 py-3 rounded-full'
          placeholder='Search user...'
          onChange={handleSearchUser}
        />

        {/* ✅ Safe rendering */}
        {username && auth.searchUser?.length > 0 && (
          <div className="absolute w-full z-10 top-[4.5rem] bg-white rounded-md shadow-md">

            {auth.searchUser.map((item) => (
              <div
                key={item.id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleClick(item.id)}
              >
                <CardHeader
                  avatar={<Avatar src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg" />}
                  title={item.firstName + " " + item.lastName}
                  subheader={`@${item.firstName.toLowerCase()}_${item.lastName.toLowerCase()}`}
                />
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  )
}

export default SearchUser
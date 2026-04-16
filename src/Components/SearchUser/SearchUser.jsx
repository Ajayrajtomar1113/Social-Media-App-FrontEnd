import { Avatar, CardHeader } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchUser } from '../../Redux/Auth/auth.action'
import { createChat } from '../../Redux/Message/message.action'
import { useNavigate } from 'react-router-dom'

function SearchUser({ isChat }) {

  const [username, setUsername] = useState("")
  const [debouncedValue, setDebouncedValue] = useState("")

  const dispatch = useDispatch()
  const auth = useSelector(store => store.auth)
  const navigate = useNavigate()

  /* =========================
     🔥 DEBOUNCE (smooth search)
  ========================= */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(username)
    }, 400)

    return () => clearTimeout(timer)
  }, [username])

  /* =========================
     🔥 API CALL
  ========================= */
  useEffect(() => {
    if (debouncedValue.trim()) {
      dispatch(searchUser(debouncedValue))
    }
  }, [debouncedValue, dispatch])

  /* =========================
     🔥 FILTER USERS
  ========================= */
  const filteredUsers = useMemo(() => {
    return auth.searchUser?.filter(
      item =>
        item.id !== auth.user?.id &&   // ❌ remove self
        item.role !== "ADMIN"          // ❌ remove admin
    )
  }, [auth.searchUser, auth.user])

  const handleClick = (id) => {
    if (isChat) {
      dispatch(createChat({ userId: id }))
    } else {
      navigate(`/home/profile/${id}`)
    }
    setUsername("")
  }

  return (
    <div className="relative">
      <div className="py-5">
        <input
          type="text"
          value={username}
          className='bg-transparent border border-[#3b4054] outline-none w-full px-5 py-3 rounded-full'
          placeholder='Search user...'
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      {username && (
        <div className="absolute w-full z-10 top-[4.5rem] bg-white rounded-md shadow-md max-h-72 overflow-y-auto">

          {filteredUsers?.length > 0 ? (
            filteredUsers.map((item) => (
              <div
                key={item.id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleClick(item.id)}
              >
                <CardHeader
                  avatar={
                    <Avatar src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg" />
                  }
                  title={`${item.firstName} ${item.lastName}`}
                  subheader={`@${item.firstName.toLowerCase()}_${item.lastName.toLowerCase()}`}
                />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">
              No users found
            </p>
          )}

        </div>
      )}

    </div>
  )
}

export default SearchUser
import React, { useEffect } from 'react'
import PopularUserCard from './PopularUserCard'
import { Card } from '@mui/material'
import SearchUser from '../SearchUser/SearchUser'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUserAction } from '../../Redux/Auth/auth.action'

function HomeRight() {
  const dispatch = useDispatch()
  const auth = useSelector(store => store.auth)

  useEffect(() => {
    dispatch(getAllUserAction())
  }, [dispatch])

  // ✅ SAFE USERS
  const safeUsers = Array.isArray(auth?.users) ? auth.users : [];

  return (
    <div className='pr-2'>
      <SearchUser isChat={false}/>
      
      <Card className='p-2'>
        <div className="flex justify-between py-5 items-center">
          <p className='font-semibold opacity-70 pl-3'>Suggestions for you</p>
          <p className='text-xs font-semibold opacity-95 pr-5'>View All</p>
        </div>

        <div>
          {safeUsers
            .filter(item => 
              item?.id !== auth?.user?.id && item?.role === "USER"
            )
            .map((item) => (
              <PopularUserCard key={item?.id} item={item} />
          ))}
        </div>

      </Card>
    </div>
  )
}

export default HomeRight
import React from 'react'
import PopularUserCard from './PopularUserCard'
import { Card } from '@mui/material'
import SearchUser from '../SearchUser/SearchUser'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllUserAction } from '../../Redux/Auth/auth.action'

const popularUser = [1,1,1,1,1]

function HomeRight() {
  const dispatch = useDispatch()
  const auth = useSelector(store=>store.auth)
  useEffect(()=>{
    dispatch(getAllUserAction)
  },[dispatch])
  console.log(auth.users)
  return (
    <div className='pr-2'>
      <SearchUser/>
      <Card className='p-2'>
          <div className="flex justify-between py-5 items-center">
            <p className='font-semibold opacity-70 pl-3'>Suggestions for you</p>
            <p className='text-xs font-semibold opacity-95 pr-5'>View All</p>
          </div>
          <div>
            {popularUser.map((item)=><PopularUserCard/>)}
          </div>
      </Card>
      
    </div>
  )
}

export default HomeRight

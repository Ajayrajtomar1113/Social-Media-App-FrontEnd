import React from 'react'
import PopularUserCard from './PopularUserCard'
import { Card } from '@mui/material'
import SearchUser from '../SearchUser/SearchUser'

const popularUser = [1,1,1,1,1]
function HomeRight() {
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

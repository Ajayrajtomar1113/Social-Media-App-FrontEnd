import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserReelCard from './UserReelCard'
import { getAllReelAction, deleteReel } from '../../Redux/Post/Post.action'

function Reels() {
  const dispatch = useDispatch()
  const { reels = [] } = useSelector(store => store.post)

  useEffect(() => {
    dispatch(getAllReelAction())
  }, [dispatch])

  return (
    <div className="h-screen w-full flex justify-center bg-black">
      
      {/* 📱 Reel Container */}
      <div className="
        h-screen 
        w-full 
         sm:max-w-[700px] 
        overflow-y-scroll 
        snap-y snap-mandatory 
        hideScrollbar
      ">
        
        {reels.length > 0 ? (
          reels.map((item) => (
            <UserReelCard
              key={item.id} 
              item={item}
              onDelete={(id) => dispatch(deleteReel(id))}
            />
          ))
        ) : (
          <div className="text-white flex items-center justify-center h-full">
            No reels available
          </div>
        )}

      </div>
    </div>
  )
}

export default Reels
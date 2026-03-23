import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserReelCard from './UserReelCard'
import { getAllReelAction } from '../../Redux/Post/Post.action'


function Reels() {
  const dispatch = useDispatch()
  const post = useSelector(store=>store.post)
  useEffect(()=>{
    dispatch(getAllReelAction())
  },[])
 
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory hideScrollbar border border-zinc-600"> 
      {post.reels.map((item)=>
        <UserReelCard item={item}/>
      )}
     
    </div>
    
  )
}

export default Reels

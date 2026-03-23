import { Avatar, Card, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import StoryCircle from './StoryCircle';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import ArticleIcon from '@mui/icons-material/Article';
import PostCard from '../Post/PostCard';
import CreatePostModel from '../CreatePost/CreatePostModel';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostAction } from '../../Redux/Post/Post.action';

const story=[1,1,1,1,1,1]


function MiddlePart() {
  const dispatch = useDispatch()
  const post = useSelector(store=>store.post)
  
  
  const [openCreatePostModal,setOpenCreatePostModal] = useState(false);
  const handleCloseCreatePostModal = ()=>setOpenCreatePostModal(false);
  
  const handleOpenCreatePostModal=()=>{
    setOpenCreatePostModal(true);
  }

  useEffect(()=>{
    dispatch(getAllPostAction())
  },[post.newComment])
  return (
    <div className='px-5'>
      <section className="flex bg-zinc-300 items-center p-4 rounded-b-md">
        <div className='flex flex-col items-center mr-4 cursor-pointer'>
          <Avatar sx={{width:"4.5rem",height:"4.5rem"}} 
        src="" 
        >
          <AddIcon sx={{fontSize:"3rem"}}/>
        </Avatar>
        <p>New</p>
        </div>
        {story.map((item)=><StoryCircle />)}
      </section>
      
      <Card className='p-5 mt-5'>
        <div className="flex justify-between">
          <Avatar/>
          <input
          onClick={handleOpenCreatePostModal}
          type="text" placeholder='Create new post...' 
          readOnly
          className='outline-none w-[90%] bg-slate-100 rounded-full px-5 bg-transparent border border-[#c7c9d3]'/>
        </div>
        <div className="flex justify-center space-x-9 mt-5">
          <div className="flex items-center">
            <IconButton color='primary' onClick={handleOpenCreatePostModal}>
              <ImageIcon/>
            </IconButton>
            <span>media</span>
          </div>
          <div className="flex items-center">
            <IconButton color='primary' onClick={handleOpenCreatePostModal}>
              <VideocamIcon/>
            </IconButton>
            <span>video</span>
          </div>
          <div className="flex items-center">
            <IconButton color='primary' onClick={handleOpenCreatePostModal}>
              <ArticleIcon/>
            </IconButton>
            <span>Article</span>
          </div>
        </div>
      </Card>
      <div className="mt-5 space-y-5">
        {post.posts.map((item)=><PostCard item={item}/>)}
        
      </div>
      <div>
        <CreatePostModel handleClose={handleCloseCreatePostModal} open={openCreatePostModal}></CreatePostModel>
      </div>
    </div>
  )
}

export default MiddlePart

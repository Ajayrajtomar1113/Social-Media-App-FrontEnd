import { Avatar, Card, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import ArticleIcon from '@mui/icons-material/Article';
import PostCard from '../Post/PostCard';
import CreatePostModel from '../CreatePost/CreatePostModel';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostAction } from '../../Redux/Post/Post.action';

function MiddlePart() {

  const dispatch = useDispatch();

  const { posts, loading, error } = useSelector(store => store.post);

  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);

  const handleCloseCreatePostModal = () => setOpenCreatePostModal(false);
  const handleOpenCreatePostModal = () => setOpenCreatePostModal(true);

  useEffect(() => {
    dispatch(getAllPostAction());
  }, [dispatch]);

  const safePosts = Array.isArray(posts) ? posts : [];

  /* =========================
     LOADING STATE
  ========================= */
  if (loading) {
    return (
      <div className="text-center mt-5 text-gray-500">
        Loading posts...
      </div>
    );
  }

  /* =========================
     ERROR STATE
  ========================= */
  if (error) {
    return (
      <div className="text-center mt-5 text-red-500">
        {error.message || "Something went wrong"}
      </div>
    );
  }

  return (
    <div className='px-5'>

      {/* =========================
         CREATE POST BOX
      ========================= */}
      <Card className='p-5 mt-5'>
        <div className="flex justify-between">
          <Avatar />
          <input
            onClick={handleOpenCreatePostModal}
            type="text"
            placeholder='Create new post...'
            readOnly
            className='outline-none w-[90%] bg-slate-100 rounded-full px-5 border border-[#c7c9d3]'
          />
        </div>

        <div className="flex justify-center space-x-9 mt-5">
          <div className="flex items-center">
            <IconButton color='primary' onClick={handleOpenCreatePostModal}>
              <ImageIcon />
            </IconButton>
            <span>media</span>
          </div>

          <div className="flex items-center">
            <IconButton color='primary' onClick={handleOpenCreatePostModal}>
              <VideocamIcon />
            </IconButton>
            <span>video</span>
          </div>

          <div className="flex items-center">
            <IconButton color='primary' onClick={handleOpenCreatePostModal}>
              <ArticleIcon />
            </IconButton>
            <span>Article</span>
          </div>
        </div>
      </Card>

      {/* =========================
         POSTS LIST
      ========================= */}
      <div className="mt-5 space-y-5">
        {safePosts.length > 0 ? (
          safePosts.map((item) => (
            <PostCard key={item?.id || item?._id} item={item} />
          ))
        ) : (
          <p className="text-center text-gray-500">
            No posts available
          </p>
        )}
      </div>

      {/* =========================
         CREATE POST MODAL
      ========================= */}
      <CreatePostModel
        handleClose={handleCloseCreatePostModal}
        open={openCreatePostModal}
      />
    </div>
  );
}

export default MiddlePart;

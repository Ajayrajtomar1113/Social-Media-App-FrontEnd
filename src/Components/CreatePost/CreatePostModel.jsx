import { Avatar, Backdrop, Box, Button, CircularProgress, IconButton, Modal, Typography } from '@mui/material'
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react'
import ImageIcon from '@mui/icons-material/Image';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { uploadToCloudinary } from '../../utils/uploadToCloudnary';
import { createCommentAction, createPostAction } from '../../Redux/Post/Post.action';

const style = {
  position:"absolute",
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius:"0.6rem",

};

function CreatePostModel({open,handleClose}) {
    const [selectedImage,setSelectedImage]=useState();
    const [selectedVideo,setSelectedVideo]=useState();
    const [isLoading,setIsLoading]=useState(false);
    const dispatch = useDispatch()

    const formik = useFormik({
    initialValues: {
      caption: "",
      image: "",
      video: "",
    },
    onSubmit: async (values) => {
      if (!values.caption && !values.image && !values.video) {
        alert("Post empty hai");
        return;
      }
      console.log("FINAL POST DATA ", values);
      dispatch(createPostAction(values));
      handleClose();
    },
  });

    

    const handleSelectImage = async (event)=>{
        setIsLoading(true)
        const imageUrl = await uploadToCloudinary(event.target.files[0],"image")
        setSelectedImage(imageUrl);
        setIsLoading(false)
        formik.setFieldValue("image",imageUrl)
    }
    
  const handleSelectedVideo = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const videoUrl = await uploadToCloudinary(file, "video");
      setSelectedVideo(videoUrl);
      formik.setFieldValue("video", videoUrl);
    } catch (err) {
      console.log("Video upload error", err);
    }
    setIsLoading(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col space-y-4">

            {/* USER INFO */}
            <div className="flex space-x-4 items-center">
              <Avatar />
              <div>
                <p className="font-bold text-lg">code with ajay</p>
                <p className="text-sm text-gray-500">@codewithajay</p>
              </div>
            </div>

            {/* CAPTION */}
            <textarea
              name="caption"
              placeholder="Write caption..."
              rows="4"
              className="w-full border p-2 outline-none bg-transparent border-[#3b4054] rounded-sm"
              onChange={formik.handleChange}
              value={formik.values.caption}
            />

            {/* MEDIA BUTTONS */}
            <div className="flex space-x-6 items-center">
              {/* IMAGE */}
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSelectImage}
                  style={{ display: "none" }}
                  id="image-input"
                />
                <label htmlFor="image-input" className="flex items-center space-x-1 cursor-pointer">
                  <IconButton color="primary" component="span">
                    <ImageIcon />
                  </IconButton>
                  <span>Image</span>
                </label>
              </div>

              {/* VIDEO */}
              <div>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleSelectedVideo}
                  style={{ display: "none" }}
                  id="video-input"
                />
                <label htmlFor="video-input" className="flex items-center space-x-1 cursor-pointer">
                  <IconButton color="primary" component="span">
                    <VideoCallIcon />
                  </IconButton>
                  <span>Video</span>
                </label>
              </div>
            </div>

            {/* IMAGE PREVIEW */}
            {selectedImage && (
              <img
                src={selectedImage}
                alt="preview"
                className="h-[10rem] object-cover rounded-md"
              />
            )}

            {/* VIDEO PREVIEW */}
            {selectedVideo && (
              <video
                src={selectedVideo}
                controls
                className="h-[10rem] rounded-md"
              />
            )}

            {/* SUBMIT */}
            <div className="flex justify-end">
              <Button type="submit" variant="contained" sx={{ borderRadius: "1.5rem" }}>
                Post
              </Button>
            </div>
          </div>
        </form>

        {/* LOADER */}
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Modal>
  );
}

export default CreatePostModel;
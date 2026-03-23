import { useFormik } from "formik";
import React, { useState } from "react";
import { uploadToCloudinary } from "../../utils/uploadToCloudnary";
import { createReelAction } from "../../Redux/Post/Post.action";
import { useDispatch } from "react-redux";

const CreateReelForm = () => {

  const [videoPreview, setVideoPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
      video: "",
    },

    onSubmit: async (values) => {
      if (!values.video) {
        alert("Video required hai ");
        return;
      }

      setIsLoading(true); 

      try {
        await dispatch(createReelAction(values));
      } catch (err) {
        console.log(err);
      }

      setIsLoading(false); 
    },
  });

  
  const handleSelectedVideo = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // setVideoPreview(URL.createObjectURL(file));

    setIsLoading(true); 

    try {
      const videoUrl = await uploadToCloudinary(file, "video");
      formik.setFieldValue("video", videoUrl);
    } catch (err) {
      console.log("Video upload error", err);
    }

    setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white ">
      
      {isLoading && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="h-12 w-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="w-full max-w-md p-4">

        <h1 className="text-2xl font-bold mb-4 text-center">
          Create Reel 🎬
        </h1>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Enter title..."
            value={formik.values.title}
            onChange={formik.handleChange}
            className="w-full p-2 rounded bg-gray-800"
          />
          <input
            type="file"
            accept="video/*"
            onChange={handleSelectedVideo}
            className="w-full bg-gray-800 p-2 rounded"
          />
          {videoPreview && (
            <video
              src={videoPreview}
              controls
              className="w-full h-64 object-cover rounded"
            />
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-500 hover:bg-red-600 p-2 rounded font-semibold disabled:opacity-50"
          >
            Upload Reel 🚀
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateReelForm;
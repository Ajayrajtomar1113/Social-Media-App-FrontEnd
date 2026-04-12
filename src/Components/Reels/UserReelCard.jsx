import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReel } from "../../Redux/Post/Post.action";

const UserReelCard = ({ item }) => {
  const videoRef = useRef(null);
  const [liked, setLiked] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useDispatch();
  const { auth } = useSelector(store => store); 

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.7 }
    );

    if (videoRef.current) observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleDelete = () => {
    setShowMenu(false);
    dispatch(deleteReel(item.id))
  };

  return (
    <div className="h-screen snap-start relative bg-black flex items-center justify-center">

      {/* 🎥 Video */}
      <video
        ref={videoRef}
        src={item.video}
        className="h-full w-full object-cover"
        loop
        playsInline
      />

      {/* 🔲 Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/80 to-transparent" />

      {/* 👤 User + Title */}
      <div className="absolute bottom-6 left-4 text-white z-10 max-w-[70%]">
        <h2 className="font-semibold text-base sm:text-lg">
          @{item.user?.firstName?.toLowerCase() + "_" + item.user?.lastName?.toLowerCase()}
        </h2>
        <p className="text-xs sm:text-sm opacity-90 mt-1">
          {item.title}
        </p>
      </div>

      {/* ❤️ Actions */}
      <div className="absolute right-3 sm:right-4 bottom-20 sm:bottom-24 flex flex-col items-center gap-5 sm:gap-6 text-white z-10">     
        <button
          onClick={handleLike}
          className="text-2xl sm:text-3xl hover:scale-110 transition-transform"
        >
          {liked ? "❤️" : "🤍"}
        </button>

        <button className="text-xl sm:text-2xl hover:scale-110 transition-transform">
          💬
        </button>

        <button className="text-xl sm:text-2xl hover:scale-110 transition-transform">
          📤
        </button>
      </div>

      {/* 🔥 3 DOT MENU */}
      <div className="absolute top-4 right-4 z-20">

        {/* 👇 Only owner can see delete */}
        {auth?.user?.id === item.user?.id && (
          <>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-white text-2xl"
            >
              ⋮
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded-lg shadow-lg overflow-hidden">
                <button
                  onClick={handleDelete}
                  className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-500"
                >
                  Delete
                </button>
              </div>
            )}
          </>
        )}
      </div>

    </div>
  );
};

export default UserReelCard;
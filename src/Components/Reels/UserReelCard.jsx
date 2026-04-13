import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReel } from "../../Redux/Post/Post.action";

const UserReelCard = ({ 
  item, 
  isGrid = false, 
  activeVideo, 
  setActiveVideo 
}) => {

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useDispatch();
  const auth = useSelector(store => store.auth);

  // ✅ AUTO PLAY (REELS PAGE ONLY)
  useEffect(() => {
    if (isGrid) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;

        if (entry.isIntersecting) {
          videoRef.current.play().catch(() => {});
          setIsPlaying(true);
        } else {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.7 }
    );

    if (videoRef.current) observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, [isGrid]);

  // ✅ CONTROL PLAY (ONLY ONE VIDEO)
  useEffect(() => {
    if (!videoRef.current || !isGrid) return;

    if (activeVideo === item.id) {
      videoRef.current.play().catch(() => {
        console.log("Play blocked (need user interaction)");
      });
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [activeVideo, isGrid]);

  // ✅ CLICK PLAY
  const handlePlayPause = (e) => {
    e.stopPropagation();

    if (!videoRef.current) return;

    if (activeVideo === item.id) {
      videoRef.current.pause();
      setActiveVideo(null);
    } else {
      setActiveVideo(item.id); // 🔥 only one active
    }
  };

  const handleDelete = () => {
    setShowMenu(false);
    dispatch(deleteReel(item.id));
  };

  return (
    <div
      className={`relative bg-black 
      ${isGrid ? "aspect-[9/16]" : "h-screen snap-start"}`}
    >

      {/* 🎥 VIDEO */}
      <video
        ref={videoRef}
        src={item.video}
        className="w-full h-full object-cover"
        loop
        playsInline
        controls={false} // clean UI
      />

      {/* CLICK LAYER */}
      <div
        onClick={handlePlayPause}
        className="absolute inset-0 z-10 cursor-pointer"
      />

      {/* ▶ ICON */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center text-white text-4xl z-20 pointer-events-none">
          ▶
        </div>
      )}

      {/* USER */}
      <div className="absolute bottom-4 left-3 text-white z-20">
        <p>@{item.user?.firstName}_{item.user?.lastName}</p>
        <p>{item.title}</p>
      </div>

      {/* DELETE */}
      {auth?.user?.id === item.user?.id && (
        <div className="absolute top-2 right-2 z-20">
          <button onClick={() => setShowMenu(!showMenu)}>⋮</button>

          {showMenu && (
            <button onClick={handleDelete} className="text-red-500">
              Delete
            </button>
          )}
        </div>
      )}

    </div>
  );
};

export default UserReelCard;
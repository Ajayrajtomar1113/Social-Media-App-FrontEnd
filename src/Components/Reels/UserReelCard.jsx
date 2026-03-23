import React, { useEffect, useRef, useState } from "react";

const UserReelCard = ({ item }) => {
  const videoRef = useRef(null);
  const [liked, setLiked] = useState(false);

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

  return (
  <div className="h-screen snap-start relative bg-black flex items-center justify-center">
    
    <video
      ref={videoRef}
      src={item.video}
      className="h-full w-full object-cover"
      loop
      muted
      playsInline
    />

    {/* Gradient overlay (important for readability) */}
    <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/80 to-transparent " />

    {/* User + Title */}
    <div className="absolute bottom-6 left-4 text-white z-10 max-w-[70%]">
      <h2 className="font-semibold text-lg">
        @{item.user.firstName.toLowerCase() + "_" + item.user.lastName.toLowerCase()}
      </h2>
      <p className="text-sm opacity-90 mt-1">
        {item.title}
      </p>
    </div>

    <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 text-white z-10">     
      <button
        onClick={handleLike}
        className="text-3xl hover:scale-110 transition-transform"
      >
        {liked ? "❤️" : "🤍"}
      </button>

      <button className="text-2xl hover:scale-110 transition-transform">
        💬
      </button>

      <button className="text-2xl hover:scale-110 transition-transform">
        📤
      </button>
    </div>

  </div>
)}
export default UserReelCard;
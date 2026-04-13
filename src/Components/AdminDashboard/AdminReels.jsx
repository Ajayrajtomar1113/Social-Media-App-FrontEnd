import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReelAction, deleteReel } from "../../Redux/Post/Post.action";

function AdminReels() {
  const dispatch = useDispatch();
  const post = useSelector((store) => store.post);

  useEffect(() => {
    dispatch(getAllReelAction());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this reel?")) {
      dispatch(deleteReel(id));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Manage Reels</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {post?.reels?.map((reel) => (
          <div key={reel.id} className="bg-white rounded shadow p-3">
            
            {/* VIDEO */}
            <video
              src={reel.video}
              controls
              className="w-full h-[200px] object-cover rounded"
            />

            {/* INFO */}
            <div className="mt-2">
              <p className="text-sm font-semibold">
                {reel.title || "No caption"}
              </p>
              <p className="text-xs text-gray-500">
                By: {reel.user?.firstName}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="mt-3 flex justify-between">
              <button
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                onClick={() => handleDelete(reel.id)}
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminReels;
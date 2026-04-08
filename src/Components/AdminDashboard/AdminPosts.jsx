import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostAction, deletePostAction } from "../../Redux/Post/Post.action";

function AdminPosts() {
  const dispatch = useDispatch();
  const { posts } = useSelector((store) => store.post);

  useEffect(() => {
    dispatch(getAllPostAction());
  }, [dispatch]);

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this post?")) {
//       dispatch(deletePostAction(id));
//     }
//   };

  return (
    <div className="p-4 bg-slate-200">
      <h1 className="text-xl font-bold mb-4">Manage Posts</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {posts?.map((post) => (
          <div key={post.id} className="bg-white rounded shadow p-3 bg-zinc-300">

          
            {post.image && (
              <img
                src={post.image}
                alt=""
                className="w-full h-[200px] object-cover rounded"
              />
            )}

            {/* INFO */}
            <div className="mt-2">
              <p className="text-sm font-semibold">
                {post.caption || "No caption"}
              </p>
              <p className="text-xs text-gray-500">
                By: {post.user?.firstName}
              </p>
            </div>

            {/* STATS
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>❤️ {post.likes?.length || 0}</span>
              <span>💬 {post.comments?.length || 0}</span>
            </div> */}

            <div className="mt-3 flex justify-between">
              <button
                className="bg-red-500 text-white px-3 py-1 rounded text-sm "
                // onClick={() => handleDelete(post.id)}
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

export default AdminPosts;
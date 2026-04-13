import React, { useEffect } from "react";
import { FaUsers, FaVideo, FaChartBar, FaFlag, FaCog } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllReelAction } from "../../Redux/Post/Post.action";
import { getAllUserAction, logoutAction } from "../../Redux/Auth/auth.action";
import { Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import UserData from "./UserData";
import WestIcon from '@mui/icons-material/West';
import AdminReels from "./AdminReels";
import Profile from "../../Pages/Profile/Profile";
import AdminPosts from "./AdminPosts";

function AdminDashboard() {
  const dispatch = useDispatch();

  const { users } = useSelector((store) => store.auth);
  const post = useSelector((store) => store.post);
  const navigate = useNavigate()
  const location = useLocation();
  const isProfilePage = location.pathname.includes("/admin/profile");

  useEffect(() => {
    dispatch(getAllReelAction());
    dispatch(getAllUserAction());
  }, [dispatch]);

  const handleLogout = () => {
      dispatch(logoutAction());
      localStorage.removeItem("jwt");
      navigate("/"); 
      
    };
  return (
    <div className="min-h-screen flex bg-zinc-100">

      {/* SIDEBAR */}
      <div className="w-[240px] bg-white shadow-md hidden md:block">
        <div className="p-5 font-bold text-xl border-b">Admin Panel</div>

        <ul className="p-3 space-y-3">
          <li className="flex items-center gap-3 p-2 hover:bg-zinc-100 rounded cursor-pointer" onClick={()=>navigate("/")}>
            <FaChartBar /> Dashboard
          </li>
          <li className="flex items-center gap-3 p-2 hover:bg-zinc-100 rounded cursor-pointer"  onClick={()=>navigate("/")}>
            <FaUsers /> Users
          </li>
          <li className="flex items-center gap-3 p-2 hover:bg-zinc-100 rounded cursor-pointer" onClick={()=>navigate("/admin/posts")}>
            <FaVideo /> Posts
          </li>
          <li className="flex items-center gap-3 p-2 hover:bg-zinc-100 rounded cursor-pointer" onClick={()=>navigate("/admin/reels")}>
            <FaVideo /> Reels
          </li>
          {/* <li className="flex items-center gap-3 p-2 hover:bg-zinc-100 rounded cursor-pointer">
            <FaFlag /> Reports
          </li>
          <li className="flex items-center gap-3 p-2 hover:bg-zinc-100 rounded cursor-pointer">
            <FaCog /> Settings
          </li> */}
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-4">

        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <button className="bg-black text-white px-4 py-2 rounded" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* 🔥 STATS CARDS (always visible) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-gray-500">Total Users</h2>
            <p className="text-2xl font-bold">
              {(Array.isArray(users) ? users : []).filter((u) => u.role === "USER").length}
            </p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-gray-500">Total Posts</h2>
            <p className="text-2xl font-bold">{post?.posts?.length || 0}</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-gray-500">Reel</h2>
            <p className="text-2xl font-bold">{post?.reels?.length || 0}</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-gray-500">Active Users</h2>
            <p className="text-2xl font-bold">980</p>
          </div>

        </div>

        <div className="bg-white rounded shadow p-4 overflow-x-auto">
  
          {/* {isProfilePage ? (
            <>
              <div 
                className="flex space-x-4 items-center py-5 cursor-pointer"
                onClick={() => navigate("/admin")}
              >
                <WestIcon />
                <h1 className="text-xl font-bold">Home</h1>
              </div>

              <div className="max-w-[500px] mx-auto bg-white rounded shadow">
                <Outlet />
              </div>
            </>
          ) : (
            <div className="bg-white rounded shadow p-4 overflow-x-auto">
              <UserData users={users}  />
            </div>
          )} */}

            <Routes>
                    
                    <Route index element={<UserData users={users}/>} />
                    <Route path="profile/:id" element={<Profile />} />
                    <Route path="reels" element={<AdminReels />} />
                    <Route path="posts" element={<AdminPosts />} />
                    
            </Routes>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;
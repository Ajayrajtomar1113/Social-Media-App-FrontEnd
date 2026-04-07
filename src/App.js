import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './App.css';
import Authentication from './Pages/Authentication/Authentication';
import HomePage from './Pages/HomePage/HomePage';
import Message from './Pages/Message/Message';
import './index.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { getProfileAction } from './Redux/Auth/auth.action';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import Profile from './Pages/Profile/Profile';   // 🔥 import
import UserData from './Components/AdminDashboard/UserData';
import AdminReels from './Components/AdminDashboard/AdminReels';

function App() {

  const auth = useSelector(store => store.auth);
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();

  useEffect(() => {
    if (jwt) {
      dispatch(getProfileAction());
    }
  }, [jwt, dispatch]);

  return (
    <div>
      <Routes>

        {/* USER SIDE */}
        <Route 
          path="/home/*" 
          element={auth.user ? <HomePage /> : <Navigate to="/" />} 
        />

        {/* MESSAGE */}
        <Route 
          path="/message" 
          element={auth.user ? <Message /> : <Navigate to="/" />} 
        />

        <Route 
          path="/admin/*" 
          element={
            auth.user && auth.user.role === "ADMIN"
              ? <AdminDashboard />
              : <Navigate to="/home" />
          }
        >
          {/* <Route path="profile/:id" element={<Profile />} />
          <Route path="reels" element={<AdminReels />} /> */}
        </Route>

        <Route
          path="/*"
          element={
            !auth.user
              ? <Authentication />
              : auth.user.role === "ADMIN"
              ? <Navigate to="/admin" />
              : <Navigate to="/home" />
          }
        />

      </Routes>
    </div>
  );
}

export default App;
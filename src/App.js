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

import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { removePostFromStore, removeReelFromStore } from './Redux/Post/Post.action';

function App() {

  const auth = useSelector(store => store.auth);
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();

  useEffect(() => {
    if (jwt) {
      dispatch(getProfileAction());
    }
  }, [jwt, dispatch]);

useEffect(() => {

  const client = new Client({
   webSocketFactory: () => new SockJS("https://social-media-app-backend-h6yf.onrender.com/ws"),
    reconnectDelay: 5000,

    onConnect: () => {
      

      // Post delete
      client.subscribe("/topic/delete-post", (message) => {
        const postId = message.body;
        console.log("Post Deleted:", postId);
        dispatch(removePostFromStore(postId));
      });

      // Reel delete
      client.subscribe("/topic/delete-reel", (message) => {
        const reelId = message.body;
        console.log("Reel Deleted:", reelId);
        dispatch(removeReelFromStore(reelId));
      });
    }
  });

  client.activate();

  return () => {
    client.deactivate();
  };

}, [dispatch]);
  

  return (
    <div>
      <Routes>

        <Route 
          path="/home/*" 
          element={auth.user ? <HomePage /> : <Navigate to="/" />} 
        />

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
        />

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
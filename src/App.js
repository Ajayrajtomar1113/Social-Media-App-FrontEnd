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
import { removePostFromStore } from './Redux/Post/Post.action';

function App() {

  const auth = useSelector(store => store.auth);
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();

  useEffect(() => {
    if (jwt) {
      dispatch(getProfileAction());
    }
  }, [jwt, dispatch]);

  // 🔥 WEBSOCKET (DELETE POST ONLY)
  useEffect(() => {

    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      reconnectDelay: 5000,

      onConnect: () => {
        console.log("Connected for delete-post");

        client.subscribe("/topic/delete-post", (message) => {
          const postId = message.body;
          console.log("🗑️ Deleted:", postId);

          // ✅ ONLY REMOVE FROM STORE (NO API CALL)
          dispatch(removePostFromStore(postId));
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
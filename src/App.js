// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import './App.css';
// import Authentication from './Pages/Authentication/Authentication';
// import HomePage from './Pages/HomePage/HomePage';
// import Message from './Pages/Message/Message'; 
// import './index.css';
// import { Route,Routes } from 'react-router-dom';
// import { getProfileAction } from './Redux/Auth/auth.action'

// function App() {
//   const auth=useSelector(store=>store.auth)
//   const jwt = localStorage.getItem("jwt")
//   const dispatch = useDispatch()
//   useEffect(()=>{
//         dispatch(getProfileAction(jwt))
//       },[jwt])

//   return (
//     <div>
//         <Routes>
//           <Route path="/home/*" element={auth.user ? <HomePage />:<Authentication/>} />
//           <Route path="/message" element={<Message/>} />
//           <Route path="/*" element={<Authentication />} />
//         </Routes>
//     </div>
//   ); 
// }

// export default App;

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

        <Route path="/home/*" element={ auth.user ? <HomePage /> : <Navigate to="/" /> } />

    
        <Route path="/message" element={ auth.user ? <Message /> : <Navigate to="/" /> } />

        
        <Route path="/admin" element={ auth.user && auth.user.role === "ADMIN" ? <AdminDashboard /> : <Navigate to="/home" /> } />

        
        <Route
          path="/*"
          element={ !auth.user ? <Authentication /> : auth.user.role === "ADMIN" ? <Navigate to="/admin" /> : <Navigate to="/home" /> } />

      </Routes>
    </div>
  );
}

export default App;
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './App.css';
import Authentication from './Pages/Authentication/Authentication';
import HomePage from './Pages/HomePage/HomePage';
import Message from './Pages/Message/Message'; 
import './index.css';
import { Route,Routes } from 'react-router-dom';
import { getProfileAction } from './Redux/Auth/auth.action'

function App() {
  const {auth}=useSelector(store=>store)
  const jwt = localStorage.getItem("jwt")
  const dispatch = useDispatch()
  useEffect(()=>{
        dispatch(getProfileAction(jwt))
      },[jwt])

  return (
    <div>
        <Routes>
          <Route path="/home/*" element={auth.user ? <HomePage />:<Authentication/>} />
          <Route path="/message" element={<Message/>} />
          <Route path="/*" element={<Authentication />} />
        </Routes>
    </div>
  ); 
}

export default App;

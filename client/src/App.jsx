import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import useCurrentUser from './customHooks/useCurrentUser';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Profile from './pages/Profile';
import useOtherUsers from './customHooks/useOtherUsers';
import { io } from 'socket.io-client';
import { useEffect } from 'react';
import { serverUrl } from './main';

function App() {
  // redux: reducers called:
  useCurrentUser();
  useOtherUsers();//we called this as this reducer helps to get all other users

  let { userData } = useSelector(state => state.user);//get the data from the user slice using useSelector hook


  // Jab user login karega(userData aayega), tab ek socket connection banega server se.
  // Jab user logout karega(userData null hoga), tab wo socket connection band ho jayega.
  useEffect(() => {
    if (userData) {
      const socketio = io(`${serverUrl}`, {
        query: {
          userId: userData?._id
        }
      })
      dispatch(setSocket(socketio))

      socketio.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users))
      })

      return () => socketio.close()

    } else {
      if (socket) {
        socket.close()
        dispatch(setSocket(null))
      }
    }


  }, [userData])

  console.log("Redux userData in App:", userData);
  //* This hook helps you fetch the current user from the backend and save them to Redux so your whole app knows who is logged in.
  return (
    <Routes>
      <Route path='/login' element={!userData ? <Login /> : <Navigate to={'/'} />} />
      {/* if userData is prsnt in cookies then we get directed to homepage */}
      <Route path='/signup' element={!userData ? <Signup /> : <Navigate to={'/profile'} />} />
      {/* making our routes protected */}
      <Route path='/' element={userData ? <Home /> : <Navigate to={'/login'} />} />
      <Route path='/profile' element={userData ? <Profile /> : <Navigate to={'/signup'} />} />
    </Routes>
  );
}

export default App;

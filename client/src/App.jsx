import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import useCurrentUser from './customHooks/useCurrentUser';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Profile from './pages/Profile';
import useOtherUsers from './customHooks/useOtherUsers';

function App() {
  // redux: reducers called:
  useCurrentUser();
  useOtherUsers();//we called this as this reducer helps to get all other users

  let { userData } = useSelector(state => state.user);//get the data from the user slice using useSelector hook
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

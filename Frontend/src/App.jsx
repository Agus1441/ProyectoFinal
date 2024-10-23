import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
import RegisterPage from './Pages/Register/Register';
import Feed from './Pages/Feed/Feed';
import MyProfile from './Pages/MyProfile/MyProfile';
import Profile from './Pages/Profile/Profile';
import Post from './Components/Post/Post';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/myfeed' element={<Feed />} />
          <Route path='/myprofile' element={<MyProfile />} />
          <Route path='/posts/:id' element={<Post />} />
          <Route path='/profile/:id' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;


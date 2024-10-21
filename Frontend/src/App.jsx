import './App.css'
import Login from './Pages/Login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import Feed from './Pages/Feed/Feed'
import MyProfile from './Pages/MyProfile/MyProfile'
import Profile from './Pages/Profile/Profile'
import Post from './Components/Post/Post'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/myfeed' element={<Feed/>}/>
          <Route path='/myprofile' element={<MyProfile />}></Route>
          <Route path='/myprofile/posts/:id' element={<Post />}></Route>
          <Route path='/profile/:id' element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

import './app.scss'
import './App.css'
import Home from './pages/home/Home'
import Watch from './pages/watch/Watch'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import {BrowserRouter as Main, Route, Routes, Navigate} from 'react-router-dom';
import { useContext } from 'react'
import { AuthContext } from "./authContext/AuthContext"
function App() {
  const { user } = useContext(AuthContext); 
  return (
    <div>
      <Main>
      <Routes>
      <Route exact path='/' element={user ? <Home /> : <Navigate to="register" />}></Route>
      <Route  path='/register' element={!user ? <Register /> : <Navigate to="/"/>}></Route>
      <Route  path='/login' element={!user ? <Login /> : <Navigate to="/" />}></Route>
      <Route  path='/movies' element={user ? <Home type="movie"/> : <Navigate to="/login" />}></Route>
      <Route  path='/series' element={user ? <Home type="series"/> : <Navigate to="/login" />}></Route>
      <Route  path='/watch' element={user ? <Watch /> : <Navigate to="/login" />}></Route>
      </Routes>
      </Main>
    </div>
  )
}

export default App

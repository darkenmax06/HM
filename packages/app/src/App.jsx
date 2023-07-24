import './App.css'
import { Routes, Route } from 'react-router-dom'
import AdminCreate from './pages/AdminCreate'
import Home from './pages/Home'
import Redirect from "./components/Redirect"
import Login from './pages/Login'

function App() {

  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/home' element={
        <Redirect>
          <Home />
        </Redirect>
      } />
      <Route path='/admin/create' element={<AdminCreate />} />
    </Routes>
  )
}

export default App

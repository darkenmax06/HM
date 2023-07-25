import { Route, Routes } from 'react-router-dom'
import './App.css'
import Redirect from "./components/Redirect"
import AdminCreate from './pages/AdminCreate'
import Create from './pages/Create'
import Home from './pages/Home'
import Login from './pages/Login'
import UserManagment from './pages/UserManagment'

function App() {

  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />

      <Route path='/login' element={<Login />} />

      <Route path='/search' element={
        <Redirect type="user" goTo='/managment' >
          <Home />
        </Redirect>
      } />

      <Route path='/managment' element={
        <Redirect type="admin" goTo='/search' >
          <UserManagment />
        </Redirect>
      } />

      <Route path='/create' element={
        <Redirect type="user" >
          <Create />
        </Redirect>
      } />
      <Route path='/admin/create' element={<AdminCreate />} />
    </Routes>
  )
}

export default App

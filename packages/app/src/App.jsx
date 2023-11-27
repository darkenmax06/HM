import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Redirect from "./components/Redirect"
import Login from './pages/Login'
import UpdateRegister from './pages/UpdateRegister'
import AdminCreate from './pages/adminPages/AdminCreate'
import ChangePassword from './pages/adminPages/ChangePassword'
import CreateUser from './pages/adminPages/CreateUser'
import UserManagment from './pages/adminPages/UserManagment'
import CreateRegister from './pages/userPages/CreateRegister'
import Home from './pages/userPages/Home'
import CreateWithExcel from './pages/userPages/CreateWithExcel'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/login"} />} />

      <Route path='/login' element={<Login />} />

      {/*--- user Routes ---*/}
      <Route path='/search' element={
        <Redirect type="user" goTo='/managment' >
          <Home />
        </Redirect>
      } />

      <Route path='/create/registers' element={
        <Redirect type="user" >
          <CreateRegister />
        </Redirect>
      } />

      <Route path='/create/registers/upfile' element={
        <Redirect type="user" >
          <CreateWithExcel />
        </Redirect>
      } />

      {/*--- Admin Routes ---*/}
      <Route path='/managment' element={
        <Redirect type="admin" goTo='/search' >
          <UserManagment />
        </Redirect>
      } />

     <Route path='/managment/:id' element={
        <Redirect type="admin" goTo='/search' >
          <ChangePassword />
        </Redirect>
      } />

     <Route path='/update/registers/:id' element={
        <Redirect type="user" >
          <UpdateRegister />
        </Redirect>
      } />

      <Route path='/create/user' element={
        <Redirect type="admin" >
          <CreateUser />
        </Redirect>
      } />
      
      <Route path='/admin/create' element={<AdminCreate />} />
    </Routes>
  )
}

export default App

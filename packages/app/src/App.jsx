import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import AdminCreate from './pages/AdminCreate'
import Home from './pages/Home'
import Redirect from './components/redirect'


function App() {

  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
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

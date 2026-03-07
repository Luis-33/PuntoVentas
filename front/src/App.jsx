import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './pages/login/login.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import DashboardLayout from "./layouts/DashboardLayout.jsx";

const App = () => {
  return (
  <Routes>
    <Route path='/' element={<Login />} />
        <Route element={<DashboardLayout/>}>
            <Route path='/dashboard' element={<Dashboard />} />
        </Route>

  </Routes>
  )
}

export default App

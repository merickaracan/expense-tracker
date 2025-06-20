//import { useState } from 'react'
import './App.css'
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';

function App() {
  const [token, useToken] = useState(localStorage.getItem("token"));
  const isAuth = !!token

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/dashboard" 
        element={token ? <Dashboard /> : <Navigate to="/"/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

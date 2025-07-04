//import { useState } from 'react'
import './App.css'
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';

function App() {
  const [token, useToken] = useState(localStorage.getItem("token"));
  const isAuth = !!token

  return(
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path = "/" element={<Navigate to="/login"/>} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/"/>} />
      </Routes>
    </Router>
  )
}

export default App;

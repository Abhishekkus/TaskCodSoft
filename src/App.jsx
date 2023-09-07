//App.js
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import JobList from './pages/JobList'
import Dashboard from './pages/Dashboard'
import JobDetail from './pages/JobDetail'
import About from './pages/About';

function App() {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" exact  element={<Home />} />
        <Route path="/jobs/search" element={<JobList />} />
        <Route path="/joblist" element={<JobList/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/login" element={<SignIn/>} />
        <Route path="/jobs/:id" element={<JobDetail/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </Router>
    
  )
}

export default App




import React from 'react'

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Auth/Login"
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Expense from "./pages/Dashboard/Expense";
import Income from "./pages/Dashboard/Income";
import UserProvider from './context/userContext';

const Root = ()=>{
  //check if token is present in local storage
  const isAuthenticated = !!localStorage.getItem('token');

  //redirect to dashboard if authenticated,otherwise to login

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  )
}


const App = () => {
  return (
    <UserProvider>
      <div>
        
        <Router>
          <Routes>
            <Route path="/" element={<Root/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp/>} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/income" element={<Income />} />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  )
}

export default App





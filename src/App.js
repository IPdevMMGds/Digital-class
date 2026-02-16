import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import Dashboard from "./pages/Dashboard"
import EmailConfirmation from "./pages/EmailConfirmation"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/confirm-email" element={<EmailConfirmation />} />
      </Routes>
    </Router>
  )
}

export default App

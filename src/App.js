import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import Dashboard from "./pages/Dashboard"
import EmailConfirmation from "./pages/EmailConfirmation"
import ProfileSetup from "./pages/ProfileSetup"
import ProtectedRoute from "./components/layout/ProtectedRoute"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ProfileSetup" element={<ProfileSetup />} />
        <Route path="/confirm-email" element={<EmailConfirmation />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App

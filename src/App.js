import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import Dashboard from "./pages/Dashboard"
import EmailConfirmation from "./pages/EmailConfirmation"
import ProfileSetup from "./pages/ProfileSetup"
import ProtectedRoute from "./components/layout/ProtectedRoute"
import { UserProvider } from "./components/context/UserContext"
import Layout from "./components/layout/Layout"

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ProfileSetup" element={<ProfileSetup />} />
          <Route path="/confirm-email" element={<EmailConfirmation />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>  
    </UserProvider>
  )
}

export default App

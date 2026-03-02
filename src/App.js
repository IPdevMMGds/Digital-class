import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import MonthlyView from "./pages/MonthlyView"
import EmailConfirmation from "./pages/EmailConfirmation"
import ProfileSetup from "./pages/ProfileSetup"
import ProtectedRoute from "./components/layout/ProtectedRoute"
import { UserProvider } from "./components/context/UserContext"
import Layout from "./components/layout/Layout"
import WeeklyView from "./pages/WeeklyView"
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
            path="/MonthlyView"
            element={
              <ProtectedRoute>
                <Layout>
                  <MonthlyView />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/WeeklyView"
            element={
              <ProtectedRoute>
                <Layout>
                  <WeeklyView />
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

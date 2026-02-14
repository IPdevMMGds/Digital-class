import React from "react"
import { logoutUser } from "../services/authService"
import { useNavigate } from "react-router-dom"
function Dashboard() {
    const navigate = useNavigate()
    const handleLogout = async () => {
        await logoutUser()
        navigate("/")
    }
    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}
export default Dashboard

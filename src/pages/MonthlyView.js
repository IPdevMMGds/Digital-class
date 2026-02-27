import React, { useEffect } from "react"
import { logoutUser } from "../services/authService"
import { useNavigate } from "react-router-dom"
function Dashboard() {
    const navigate = useNavigate()
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                    </tr>
                </thead>
            </table>
        </div>
    )
}
export default Dashboard

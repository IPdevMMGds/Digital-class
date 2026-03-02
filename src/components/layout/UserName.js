import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "./UserName.css"
export default function UserName({ user }) {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <span
      className="user-name"
      onClick={() => navigate("/ProfileSetup", { state: { from: location.pathname } })}
    >
      {user.firstName} {user.lastName}
    </span>
  )
}
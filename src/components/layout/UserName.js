import React from "react"
import { useNavigate } from "react-router-dom"
import "./UserName.css"
export default function UserName({ user }) {
  const navigate = useNavigate()
  return (
    <span
      className="user-name"
      onClick={() => navigate("/ProfileSetup")}
    >
      {user.firstName} {user.lastName}
    </span>
  )
}
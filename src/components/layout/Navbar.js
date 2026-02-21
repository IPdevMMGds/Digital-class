import React, { useContext } from "react"
import { UserContext } from "../context/UserContext"
import UserName from "./UserName"
import SubjectsDropdown from "./SubjectsDropdown"
import ClockDate from "./ClockDate"
import ProjectsLink from "./ProjectsLink"
import BackButton from "./BackButton"
import "./Navbar.css"
function Navbar() {
  const { user, loading } = useContext(UserContext)
  if (loading || !user) return null
  return (
    <header className="navbar">
      <div className="navbar-left">
        <UserName user={user} />
        <div className="user-info">
          <span className="grade">{user.grade} </span>
          <SubjectsDropdown subjects={user.subjects} />
        </div>
      </div>
      <div className="navbar-center">
        <BackButton />
        <ProjectsLink />
      </div>
      <div className="navbar-right">
        <ClockDate />
        {/* Future logo here */}
      </div>
    </header>
  )
}
export default Navbar
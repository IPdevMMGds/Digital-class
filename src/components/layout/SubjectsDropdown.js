import React, { useState, useEffect, useRef } from "react"
import "./SubjectsDropdown.css"
export default function SubjectsDropdown({ subjects }) {
  const [open, setOpen] = useState(false)
  const ref = useRef()
  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false)
    }
  }
  useEffect(() => {
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])
  return (
    <div className="subjects-dropdown" ref={ref}>
      <span className="subjects-toggle" onClick={() => setOpen(!open)}>
        Subjects
      </span>
      {open && (
        <ul className="subjects-list">
          {subjects.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
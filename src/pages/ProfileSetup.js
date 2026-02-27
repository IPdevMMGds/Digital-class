import React, { useEffect, useState } from "react"
import { getGradeList, updateUserInformation, getUserInformation } from "../services/userService"
import { useNavigate } from "react-router-dom"
import { logoutUser } from "../services/authService"
import { return_ } from "../components/utility/x_close";
import { UserContext } from "../components/context/UserContext"
import { useContext } from "react"
function ProfileSetup() {
    const { user, loading, fetchUser } = useContext(UserContext)
    const navigate = useNavigate()
    const [grades, setGrades] = useState([])
    const [form, setForm] = useState({
        First_Name: "",
        Last_Name: "",
        Grade: null,
        Subject_1: "",
        Subject_2: "",
        Subject_3: "",
        Subject_4: "",
        Subject_5: "",
        Subject_6: "",
        Subject_7: "",
        Subject_8: ""
    })
    useEffect(() => {
        loadData()
    }, [])
    const loadData = async () => {
        const { data: gradeData } = await getGradeList()
        setGrades(gradeData)
        const { data: userData } = await getUserInformation()
        setForm({
            ...userData,
            Grade: userData.Grade ? Number(userData.Grade) : ""
        })
        console.log(userData)
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({
            ...prev,
            [name]: name === "Grade"
                ? (value === "" ? "" : Number(value))
                : value
        }))
        console.log(name,value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { Grade_List, ...cleanForm } = form
        const { error } = await updateUserInformation(cleanForm)
        if (error) {
            console.error(error)
            alert(error.message)
            return
        }
        const load = async () => {
            await fetchUser()
        }
        load()
        navigate("/MonthlyView")
    }
    const handleLogout = async () => {
        await logoutUser()
        navigate("/")
    }
    return (
        <div className="profile-container">
            <button className="x-close" onClick={() => return_(navigate, "/MonthlyView")}>
                ✕
            </button>
            <h2>Complete Your Profile</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="First_Name"
                    placeholder="First Name"
                    value={form.First_Name || ""}
                    onChange={handleChange}
                    required
                />
                <input
                    name="Last_Name"
                    placeholder="Last Name"
                    value={form.Last_Name || ""}
                    onChange={handleChange}
                    required
                />
                <select
                    name="Grade"
                    value={form.Grade_ID || ""}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Grade</option>
                    {grades.map(g => (
                        g.Grade_ID === 0 ? (
                            null
                        ) : (
                            <option key={g.Grade_ID} value={g.Grade_ID}>
                                {g.Grade_Name}
                            </option>
                        )
                    ))}
                </select>
                {[1,2,3,4,5,6,7,8].map(num => (
                    <input
                        key={num}
                        name={`Subject_${num}`}
                        placeholder={`Subject ${num}${num === 1 ? " (required)" : ""}`}
                        value={form[`Subject_${num}`] || ""}
                        onChange={handleChange}
                        required={num === 1}
                    />
                ))}
                <button type="submit" disabled={!form.First_Name || !form.Last_Name || !form.Grade || !form.Subject_1}>Save</button>
            </form>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}
export default ProfileSetup
import React, { useEffect, useState } from "react"
import { getGradeList, updateUserInformation, getUserInformation } from "../services/userService"
import { useNavigate } from "react-router-dom"
function ProfileSetup() {
    const navigate = useNavigate()
    const [grades, setGrades] = useState([])
    const [form, setForm] = useState({
        First_Name: "",
        Last_Name: "",
        Grade: "",
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
        setForm(userData)
    }
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.First_Name || !form.Last_Name || !form.Grade || !form.Subject_1) {
            alert("Please complete all required fields")
            return
        }
        await updateUserInformation(form)
        navigate("/dashboard")
    }
    return (
        <div className="profile-container">
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
                    value={form.Grade || ""}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Grade</option>
                    {grades.map(g => (
                        <option key={g.Grade_ID} value={g.Grade_ID}>
                            {g.Grade_Name}
                        </option>
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
        </div>
    )
}
export default ProfileSetup
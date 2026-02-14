import React, { useState } from "react"
import { signUpUser } from "../../services/authService"
import "./Auth.css"
import { useNavigate } from "react-router-dom"
function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const handleSignup = async (e) => {
        e.preventDefault()
        const { error } = await signUpUser(email, password)
        if (error) {
            setError(error.message)
        } else {
            navigate("/")
        }
    }
    return (
        <div className="auth-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Create Account</button>
            </form>
            {error && <p className="error-text">{error}</p>}
        </div>
    )
}
export default Signup

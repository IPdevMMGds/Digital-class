import React, { useState } from "react"
import { signUpUser } from "../../services/authService"
import "./Auth.css"
import { useNavigate, Link } from "react-router-dom"
function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleSignup = async (e) => {
        e.preventDefault()
        if (loading) return
        setLoading(true)
        const { error } = await signUpUser(email, password)
        setLoading(false)
        if (error) {
            setError(error.message)
        } else {
            navigate("/confirm-email", { state: { email } })
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
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label className="show-password">
                    <input
                        type="checkbox"
                        onChange={() => setShowPassword(!showPassword)}
                    />
                    Show Password
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? "Creating Account..." : "Create Account"}
                </button>
            </form>
            {error && <p className="error-text">{error}</p>}
            <p>
                Already have an account? <Link to="/">Login</Link>
            </p>
        </div>
    )
}
export default Signup

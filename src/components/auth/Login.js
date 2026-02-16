import React, { useState } from "react"
import { loginUser } from "../../services/authService"
import { resendConfirmationEmail } from "../../services/authService"
import "./Auth.css"
import { useNavigate, Link } from "react-router-dom"
function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [unconfirmedEmail, setUnconfirmedEmail] = useState("")
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault()
        const { error } = await loginUser(email, password)
        if (error) {
            if (error.message.includes("Email not confirmed")) {
                setError("Email not confirmed.")
                setUnconfirmedEmail(email)
            } else {
                setError(error.message)
            }
        } else {
            navigate("/dashboard")
        }
    }
    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Login</button>
            </form>
            {error && <p className="error-text">{error}</p>}
            {unconfirmedEmail && (
                <button
                    type="button"
                    onClick={async () => {
                        const { error } = await resendConfirmationEmail(unconfirmedEmail)
                        if (error) {
                            setError(error.message)
                        } else {
                            setError("Confirmation email resent.")
                        }
                    }}
                    style={{ marginTop: "10px" }}
                >
                    Resend Confirmation Email
                </button>
            )}
            <p>
                Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
        </div>
    )
}
export default Login
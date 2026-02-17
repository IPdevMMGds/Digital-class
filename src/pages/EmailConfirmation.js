import React, { useState } from "react"
import { resendConfirmationEmail } from "../services/authService"
import { Link, useLocation } from "react-router-dom"
import "../App.css"
function EmailConfirmation() {
    const location = useLocation()
    const email = location.state?.email
    const [message, setMessage] = useState("")
    const handleResend = async () => {
        if (!email) {
            setMessage("No email found. Please try signing up again.")
            return
        }
        const { error } = await resendConfirmationEmail(email)
        if (error) {
            setMessage(error.message)
        } else {
            setMessage("Confirmation email resent.")
        }
    }
    return (
        <div className="auth-container">
            <h2>Confirm Your Email</h2>
            <p>
                Thank you for signing up.
            </p>
            <p>
                Please check your email and click the confirmation link
                before logging in.
            </p>
            <button onClick={handleResend} style={{ marginTop: "15px" }}>
                Resend Confirmation Email
            </button>
            {message && <p>{message}</p>}
            <Link to="/">
                <button style={{ marginTop: "20px" }}>
                    Return to Login
                </button>
            </Link>
        </div>
    )
}
export default EmailConfirmation

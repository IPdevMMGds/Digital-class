import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { supabase } from "../../services/supabaseClient"
import { getUserInformation } from "../../services/userService"
function ProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true)
    const [redirect, setRedirect] = useState(null)
    useEffect(() => {
        checkUser()
    }, [])
    const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            setRedirect("/")
            setLoading(false)
            return
        }

        const { data, error } = await getUserInformation()

        if (error) {
            console.error("User info fetch error:", error)
            setLoading(false)
            return
        }

        if (!data) {
            console.error("No user information row found")
            setLoading(false)
            return
        }

        if (!data.First_Name || !data.Subject_1) {
            setRedirect("/ProfileSetup")
        }

        setLoading(false)
    }
    if (loading) return null
    if (redirect) return <Navigate to={redirect} />
    return children
}
export default ProtectedRoute
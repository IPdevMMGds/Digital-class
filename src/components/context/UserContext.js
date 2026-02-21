import React, { createContext, useState, useEffect } from "react"
import { getUserInformation } from "../../services/userService"
import { supabase } from "../../services/supabaseClient"
export const UserContext = createContext()
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (!authUser) {
        setUser(null)
        setLoading(false)
        return
      }
      const { data, error } = await getUserInformation()
      if (error) {
        console.error("Failed to fetch user info", error)
        setUser(null)
      } else {
        const subjects = []
        for (let i = 1; i <= 8; i++) {
          if (data[`Subject_${i}`]) subjects.push(data[`Subject_${i}`])
        }
        setUser({
          id: data.User_ID,
          firstName: data.First_Name,
          lastName: data.Last_Name,
          grade: data.Grade,
          subjects
        })
      }
      setLoading(false)
    }
    fetchUser()
  }, [])
  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  )
}
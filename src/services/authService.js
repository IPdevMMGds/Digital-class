import { supabase } from "./supabaseClient"
export const signUpUser = async (email, password) => {
    return await supabase.auth.signUp({
        email,
        password
    })
}
export const loginUser = async (email, password) => {
    return await supabase.auth.signInWithPassword({
        email,
        password
    })
}
export const logoutUser = async () => {
    return await supabase.auth.signOut()
}
export const getCurrentUser = async () => {
    return await supabase.auth.getUser()
}
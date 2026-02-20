import { supabase } from "./supabaseClient"
export const getUserInformation = async () => {
    return await supabase
        .from("User_Information")
        .select("*")
        .single()
    console.log("getUserInformation")
}
export const updateUserInformation = async (data) => {
    return await supabase
        .from("User_Information")
        .update(data)
        .eq("User_ID", (await supabase.auth.getUser()).data.user.id)
    console.log("updateUserInformation")
}
export const getGradeList = async () => {
    return await supabase
        .from("Grade_List")
        .select("*")
        .order("Grade_ID")
    console.log("getGradeList")
}
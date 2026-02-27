import { supabase } from "./supabaseClient"
export const getUserInformation = async () => {
  const { data, error } = await supabase
    .from("User_Information")
    .select(`
      User_ID,
      First_Name,
      Last_Name,
      Grade,
      Grade_List(Grade_Name),
      Subject_1,
      Subject_2,
      Subject_3,
      Subject_4,
      Subject_5,
      Subject_6,
      Subject_7,
      Subject_8
    `)
    .single()
  if (error) {
    console.error("Error fetching user information:", error)
    return { data: null, error }
  }
  return {
    data: {
      ...data,
      Grade_ID: data.Grade,
      Grade: data.Grade_List.Grade_Name,
    },
    error: null
  }
}
export const updateUserInformation = async (data) => {
  const { data: userData, error: authError } = await supabase.auth.getUser()
  if (authError || !userData.user) {
    console.error("No user logged in")
    return { data: null, error: authError }
  }

  const { data: updateData, error } = await supabase
    .from("User_Information")
    .update(data)
    .eq("User_ID", userData.user.id)

  return { data: updateData, error }
}
export const getGradeList = async () => {
  const { data, error } = await supabase
    .from("Grade_List")
    .select("*")
    .order("Grade_ID")
  return { data, error }
}
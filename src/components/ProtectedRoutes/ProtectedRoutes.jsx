import { Navigate } from "react-router-dom"







export const  ProtectedRoutesUser =({children})=>{
   const user = localStorage.getItem("user")
   if(user){
return children
   }else{
  return   <Navigate to="/login"/>
   }
}
export const  ProtectedRoutesAdmin =({children})=>{
    const admin = JSON.parse(localStorage.getItem('user'))
    if(admin?.user?.email === "princeadmin@gmail.com"){
 return children
    }else{
   return   <Navigate to="/login"/>
    }
 }

export const Adminuser = ()=>{
   const admin = JSON.parse(localStorage.getItem('user'))
   if(admin?.user?.email === "princeadmin@gmail.com"){
return true
   }else{
  return   false
   }
 }
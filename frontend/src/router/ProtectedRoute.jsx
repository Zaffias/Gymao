import { Navigate, Outlet } from "react-router-dom"
import { useContext } from "react"
import { AppContext } from "../context"

export const ProtectedRoute = ({ children, redirectPath = '/login' }) => {
    const {user} = useContext(AppContext)
    console.log(user)
    if(!user) return <Navigate to={redirectPath} replace/>
    return children ? children : <Outlet/>
}
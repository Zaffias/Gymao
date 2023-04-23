import { BrowserRouter as Router, Route, Routes, Navigate  } from "react-router-dom"
import { ProtectedRoute } from "./ProtectedRoute"
import { Login, Register, Home } from "../components";

export const MainRouting = () => {
    return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          {/*The protected routes (components inside the route below this comment) are components that will only render if the user is logged in.*/}
          <Route path="home" element={<ProtectedRoute/>}>
            <Route index element={<Home/>}/>
          </Route>
          <Route path="*" element={<Navigate to="home" replace></Navigate>}/>
        </Routes>
    </Router>
    )
}
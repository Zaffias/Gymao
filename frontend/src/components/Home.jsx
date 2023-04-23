import { useEffect, useContext } from "react"
import { AppContext } from "../context"
import { Navigate } from "react-router-dom";

export const Home = () => {
    const { setAuthenticated, authenticated } = useContext(AppContext);
    const handleLogout = () => {
        setAuthenticated(false);
        localStorage.removeItem("token");
    }
    return(
        <div>
            {!authenticated && <Navigate to={'/login'}></Navigate>}
            <button onClick={handleLogout}>a</button>
        </div>
    )
}
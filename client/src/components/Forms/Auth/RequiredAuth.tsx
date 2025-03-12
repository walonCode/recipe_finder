import { Navigate,Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";



function RequiredAuth() {
    const location = useLocation()
    const token = true
  return token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace/>
}

export default RequiredAuth
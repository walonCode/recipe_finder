import { Navigate,Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";



function RequiredAuth() {
    const location = useLocation()
    const token = Cookies.get("accessToken")
    console.log('navigating')
  return token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace/>
}

export default RequiredAuth
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Outlet, Navigate } from "react-router-dom";
function PrivateRoute() {
  const isUserLoggedIn = useSelector((state: RootState) => state.user.isUserLoggedin);

  
  console.log(isUserLoggedIn);

  return isUserLoggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default PrivateRoute;

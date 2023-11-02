// ProtectedRoute.js
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const _user = localStorage.getItem("users");
  return _user ? true : false;
};

const ProtectedRoute = () => {
  const isAuthenticated = useAuth();
if(isAuthenticated){
  return <Navigate to={'/dashboard'} replace/>
}
return <Navigate to={'/login'} replace/>

  //return isAuthenticated ? <Outl8/>et /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

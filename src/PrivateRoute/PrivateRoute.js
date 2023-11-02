import { Navigate } from "react-router-dom";

const authencateLogin=()=>{
   const _user = JSON.parse(localStorage.getItem('users'));
    return _user ? true : false
};
export const PrivateRoute=({component : Component})=>{
    const isAuthencated = authencateLogin();
    if(isAuthencated){
        return <Component/>
    } 
    return <Navigate to='/login' />
}
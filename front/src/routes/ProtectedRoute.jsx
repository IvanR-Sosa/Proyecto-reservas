import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { Navigate } from "react-router-dom";


export const ProtectedRoute = ({children}) =>{

    const {user,loading} = useContext(AuthContext);
    
    if(loading) return <div>Cargando seguridad...</div>;
    // si n encuentra usuario logueado pasa al login
    if(!user){
        return <Navigate to='/Login' replace />
    }
    
    //si lo encuentra
    return children
}
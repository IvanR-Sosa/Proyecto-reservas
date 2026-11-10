import api from "./api"
import { dataUsers as originalData} from "../fakeFile/dataUsers";



const PATH_USER="/users"

//---------ADAPTACIONES AL BACK ------------------------------
export const loginUserApi = async (email,password) => {
  const response = await api.post('/auth/login',{email,password});
  return response.data;
  
}

export const registeUserApi = async (user) => {
  const response = await api.post('/auth/register',{
    name:user.name,
    lastName: user.lastName,
    email: user.email,
    password: user.password
  })
  return response.data;
  
}

export const getAllUsersApi = async () => {
  try {
    const response = await api.get(PATH_USER);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los datos de los usuarios ::> ",error);
    throw error;
  }
}
export const deleteUserApi = async (id) =>{
  try{
    const response= await api.delete(`${PATH_USER}/${id}`);
    return response.data;

  }catch (error){
    console.error("Error al borrar usuario ::> ",error);
    throw error;
  }
}
export const updateUserApi = async(id,user) =>{
  try {
   
    const response = await api.put(`${PATH_USER}/${id}`,user);
    return response.data;
    
  } catch (error) {
    console.error("Error al modificar perfil de usuario ::> ",error);
    throw error;
  }
}
export const changeRoleUserApi = async (id,currentRole) => {
  try {
    const nextRole = currentRole === "ADMIN" ? "USER" : "ADMIN";

    const response = await api.patch(`${PATH_USER}/${id}/role`,nextRole);
    return response.data;
  } catch (error) {
    console.error("Error al cambiar de rol ::> ",error);
    throw error;
  }
  
}
export const changePasswordApi = async (id,password) => {
  try {
    const response = await api.patch(`${PATH_USER}/${id}/password`,{password});
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la contraseña ::> ",error);
    throw error;
  }
  
}
//------------------------------------------------------------
//Esto me servira para poder ver los cambio mientras navego entre paginas usarlos desde el localStorage
//para que se refresque la pagina pero los datos sigan existiendo mientras tanto 
const getStoredUsers = ()=>{
    const stored = localStorage.getItem("dataUsers");
    if(!stored){
        localStorage.setItem("dataUsers",JSON.stringify(originalData));
        return originalData;
    }
    return JSON.parse(stored)
}



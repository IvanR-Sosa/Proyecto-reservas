import { dataUsers as originalData} from "../fakeFile/dataUsers";


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

export const getAllUsers = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...originalData]);
    }, 500);
  });
};
export const deleteUser = async (id) => {
  const newUsers = originalData.filter((u) => u.id !== id);
  originalData.length = 0;
  originalData.push(...newUsers);
  localStorage.setItem("dataUsers",JSON.stringify(originalData));
};

export const changeRolUser = async (id) => {
  const usuario = originalData.find((u) => u.id === id);
  if (usuario) {
    usuario.rol = usuario.rol === "ADMIN" ? "USER" : "ADMIN";
  }
  localStorage.setItem("dataUsers",JSON.stringify(originalData));
};

export const createUser = async (user) => {
  try {
    const verifyEmail = originalData.find((u) => u.email === user.email);
    if (verifyEmail) {
      throw new Error("Este correo electrónico ya está en uso."); 
    }
    const newId = originalData.length>0 ? Math.max(...originalData.map(u=>u.id))+1:1;
 
    const newUser = {
        ...user,
        id:newId,
        rol:'USER'
    }
    originalData.push(newUser);
    localStorage.setItem("dataUsers",JSON.stringify(originalData));
    console.log("Usuario creado con éxito:", newUser);
    console.log("Lista actualizada:", originalData);
  } catch (error) {
    console.error("No se pudo realizar el registro ::> ", error);
    throw error;
  }
};

export const updateUser = async (id,userData) => {
  try {
    const index = originalData.findIndex(i => i.id == id)
    if(index !== -1){
      originalData[index]=userData;
    }else{
      console.error('Usuario no encontrado')
    }
  } catch (error) {
      console.error('Error al actualizar::> ',error)
  }
  
}

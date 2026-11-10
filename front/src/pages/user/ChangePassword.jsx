
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../auth/AuthContext';
import { changePasswordApi } from '../../service/ApiUser';

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const {user} = useContext(AuthContext);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(password !== confirmPassword){
            alert('Las contraseñas no coinciden');
            return;
        }
        if(password.trim() === ''){
            alert('La nueva contraseña no puede ser vacia');
            return;
        }
        try {
            await changePasswordApi(user.id,password);
            alert("Contraseña cambiada con exito! Ya puedes usarla en tu proxima sesion");
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            alert('Hubo un error al cambiar la contraseña ::> ',error);
        }
    }
  return (
  
            <form className="form change_password" onSubmit={handleSubmit}>
                <h2>Cambiar Contraseña</h2>
                <label>
                    Nueva Contraseña:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <label>
                    Confirmar Contraseña:
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </label>
                <button type="submit">Actualizar Contraseña</button>
            </form>
      
  )
}

export default ChangePassword
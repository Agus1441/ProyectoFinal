const URL = "http://localhost:3001/api/";

export const register = async (registerData) => {
    try {
        const res = await fetch(`${URL}auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerData),
        });

        if (res.status === 400) {
            return { success: false, message: 'El usuario ya existe' };
        }

        if (res.status === 201) {
            const data = await res.json();
            return { 
                success: true, 
                message: 'Registro exitoso',
            };
        }

        return { success: false, message: `Error inesperado: ${res.status}` };
    } catch (error) {
        return { success: false, message: `Error de conexión: ${error.message}` };
    }
};







export const login = async (loginData) => {
    try {
        const res = await fetch(`${URL}auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (res.status === 401) {
            return { success: false, message: 'Credenciales incorrectas' };
        }

        if (res.ok) {
            const data = await res.json();

            //Manejo de Token con Local Storage
            if (data.token) {
                localStorage.setItem('token', data.token);

                return {
                    success: true,
                    message: 'Login exitoso',
                    data,
                };
            } else {
                return { 
                    success: false, 
                    message: 'Token no recibido en la respuesta' 
                };
            }
        }

        return { success: false, message: `Error inesperado: ${res.status}` };
    } catch (error) {
        return { success: false, message: `Error de conexión: ${error.message}` };
    }
};









export const getUser = async (id) => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            return { success: false, message: 'Token no disponible. Por favor, inicia sesión.' };
        }

        const res = await fetch(`${URL}user/profile/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (res.status === 404) {
            return { success: false, message: 'Usuario no encontrado' };
        }

        if (res.ok) {
            const data = await res.json();
            return { 
                success: true, 
                message: 'Usuario obtenido con éxito', 
                data 
            };
        }

        return { success: false, message: `Error inesperado: ${res.status}` };
    } catch (error) {
        return { success: false, message: `Error de conexión: ${error.message}` };
    }
};
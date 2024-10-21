const URL = "http://localhost:3001/api/";

export const getPosts = async () => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            return { success: false, message: 'Token no disponible. Por favor, inicia sesión.' };
        }

        const res = await fetch(`${URL}posts/feed`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (res.status === 401) {
            return { success: false, message: 'No autorizado. El token no es válido o ha expirado.' };
        }

        if (res.ok) {
            const posts = await res.json();
            return { 
                success: true, 
                message: 'Posts obtenidos con éxito', 
                data: posts 
            };
        }

        return { success: false, message: `Error inesperado: ${res.status}` };
    } catch (error) {
        return { success: false, message: `Error de conexión: ${error.message}` };
    }
};










export const commentPost = async (comment, postID) => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            return { success: false, message: 'Token no disponible. Por favor, inicia sesión.' };
        }

        const JSONComment = { content: comment };

        const res = await fetch(`${URL}posts/${postID}/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(JSONComment),
        });

        if (res.status === 400) {
            return { success: false, message: 'Comentario inválido.' };
        }

        if (res.status === 404) {
            return { success: false, message: 'Post no encontrado.' };
        }

        if (res.status === 201) {
            const data = await res.json();
            return { 
                success: true, 
                message: 'Comentario publicado exitosamente', 
                data 
            };
        }

        return { success: false, message: `Error inesperado: ${res.status}` };
    } catch (error) {
        return { success: false, message: `Error de conexión: ${error.message}` };
    }
};







export const likePost = async (postID) => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            return { success: false, message: 'Token no disponible. Por favor, inicia sesión.' };
        }

        const res = await fetch(`${URL}posts/${postID}/like`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (res.status === 400) {
            return { success: false, message: 'El Usuario ya ha dado like a este post.' };
        }

        if (res.status === 404) {
            return { success: false, message: 'Post no encontrado.' };
        }

        if (res.status === 201) {
            const data = await res.json();
            return { 
                success: true, 
                message: 'Like agregado exitosamente', 
                data 
            };
        }

        return { success: false, message: `Error inesperado: ${res.status}` };
    } catch (error) {
        return { success: false, message: `Error de conexión: ${error.message}` };
    }
};



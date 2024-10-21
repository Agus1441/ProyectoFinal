const URL = "http://localhost:3001/api/";

export const register = async (registerData) => {
    const res = await fetch(URL + 'auth/register', {
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(registerData)
    });
    return await res.json();
}

export const login = async (loginData) => {
    const res = await fetch(URL + 'auth/login', {
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(loginData)
    });
    return await res.json();
}

export const getUser = async (id) => {
    const res = await fetch(URL + 'user/profile/' + id);
    return await res.json();
}
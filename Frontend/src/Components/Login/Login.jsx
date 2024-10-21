/* eslint-disable no-unused-vars */
// src/Login.js
// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import './Login.css';
import RegisterModal from './Modal';
import './Modal.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(''); // Estado para manejar el mensaje de error
    const navigate = useNavigate(); // Inicializar el hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Iniciando sesión con:', username, password);
        
        // Aquí deberías realizar la autenticación con el servidor
        const userData = { username, password };

        try {
            const response = await fetch('http://localhost:3001/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                // Si la autenticación es exitosa, redirigir al dashboard
                navigate('/dashboard');
            } else {
                // Si hay un error, mostrar mensaje de error
                setError('Usuario o contraseña incorrectos.');
            }
        } catch (error) {
            console.error('Error de red:', error);
            setError('Error de red. Intenta de nuevo más tarde.');
        }
    };

    return (
        <div className="container">
            <div className="login-box">
                <h1>Iniciar Sesión</h1>
                <form onSubmit={handleSubmit}>
                    <div className="textbox">
                        <input 
                            type="text" 
                            placeholder="Nombre de usuario" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="textbox">
                        <input 
                            type="password" 
                            placeholder="Contraseña" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>} {/* Mostrar mensaje de error */}
                    <button className="btn" type="submit">Iniciar Sesión</button>
                    <button className="btn" type="button" onClick={() => navigate('/register')}>Registrarse</button> {/* Botón para redirigir a registro */}
                    <p className="message">¿No tienes una cuenta? <a href="#" onClick={() => setIsModalOpen(true)}>Regístrate</a></p>
                </form>
            </div>
            <RegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default Login;

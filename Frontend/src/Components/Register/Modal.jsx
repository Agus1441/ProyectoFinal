/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import './Modal.css';

const RegisterModal = ({ isOpen, onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // Estado para el mensaje de éxito
    const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error
    const navigate = useNavigate(); // Inicializar useNavigate

    const handleRegister = async (e) => {
        e.preventDefault();
        const userData = { username, password, email };

        try {
            // Realizar la solicitud POST para registrar al usuario
            const registerResponse = await fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const responseData = await registerResponse.json(); // Obtener la respuesta JSON

            if (registerResponse.ok) {
                console.log('Usuario registrado con éxito:', userData);
                setSuccessMessage('Registro exitoso. ¡Ahora puedes iniciar sesión!'); // Establecer el mensaje de éxito
                setErrorMessage(''); // Limpiar el mensaje de error

                // Intentar loguear al usuario automáticamente después de registrarlo
                const loginResponse = await fetch('http://localhost:3001/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }), // Usar las mismas credenciales
                });

                if (loginResponse.ok) {
                    console.log('Usuario logueado con éxito');
                    onClose(); // Cierra el modal
                    navigate('/'); // Redirigir a la página principal
                } else {
                    const loginErrorData = await loginResponse.json();
                    console.error('Error al iniciar sesión:', loginErrorData);
                    setErrorMessage('Error al iniciar sesión. Inténtalo de nuevo.'); // Mensaje de error
                }
            } else {
                console.error('Error al registrar el usuario:', responseData);
                setErrorMessage(`Error al registrar: ${responseData.message || 'Inténtalo de nuevo.'}`); // Mensaje de error
                setSuccessMessage(''); // Limpiar el mensaje de éxito
            }
        } catch (error) {
            console.error('Error de red:', error);
            setErrorMessage('Error de red. Por favor, intenta más tarde.'); // Mensaje de error
            setSuccessMessage(''); // Limpiar el mensaje de éxito
        }
    };

    const handleClose = () => {
        onClose();
        navigate('/');
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Registrar Usuario</h2>
                <form onSubmit={handleRegister}>
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
                    <div className="textbox">
                        <input
                            type="email"
                            placeholder="Correo Electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button className="btn" type="submit">Registrarse</button>
                    <button type="button" onClick={handleClose}>Cerrar</button>
                </form>
                {successMessage && <p className="success-message">{successMessage}</p>} 
                {errorMessage && <p className="error-message">{errorMessage}</p>} 
            </div>
        </div>
    );
};

export default RegisterModal;

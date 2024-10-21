import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Modal.css';

const RegisterModal = ({ isOpen, onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const userData = { username, password, email };

        try {
            const response = await fetch('http://localhost:3001/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                console.log('Usuario registrado con éxito:', userData);
                onClose();
            } else {
                console.error('Error al registrar el usuario:', response.statusText);
            }
        } catch (error) {
            console.error('Error de red:', error);
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
            </div>
        </div>
    );
};

export default RegisterModal;

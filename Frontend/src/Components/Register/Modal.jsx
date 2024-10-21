import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Modal.css';
import { register } from '../../Services/UsersService';

const RegisterModal = ({ isOpen, onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const userData = { username, email, password };

        const { success, message, data } = await register(userData);

        if (success) {
            console.log('Registro exitoso: ' + data.username);
            handleClose();
        } else {
            setError(message);
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
                    {error && <p className="error-message">{error}</p>}
                    <button className="btn" type="submit">Registrarse</button>
                    <button type="button" onClick={handleClose}>Cerrar</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterModal;

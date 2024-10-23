import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../Services/UsersService';
import RegisterModal from '../../Components/Register/Modal';
import './Login.css';
import './../../Components/Register/Modal.css';

const Login = () => {
    
    //Redireccionamiento al feed si ya está loggeado
    const navigate = useNavigate();
    useEffect(() => {
        
        if (localStorage.getItem('token')){navigate('/myfeed');}
    }, [navigate]);


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { email, password };

        const { success, message, data } = await login(userData);

        if (success) {
            console.log('Login exitoso:', data);
            navigate('/myfeed');
        } else {
            setError(message);
        }
    };

    return (
        <div className="container">
            <div className="login-box">
                <h1>Fakestagram</h1>
                <form onSubmit={handleSubmit}>
                    <div className="textbox">
                        <input
                            type="text"
                            placeholder="Correo Electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    {error && <p className="error-message">{error}</p>}
                    <button className="btn" type="submit">Iniciar Sesión</button>
                    <p className="message">
                        ¿No tienes una cuenta?{' '}
                        <Link to="/register" state={{ openModal: true }}>
                            Registrarse
                        </Link>
                    </p>
                </form>
            </div>
            <RegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default Login;



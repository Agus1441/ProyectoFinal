import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  // Estado para los campos del formulario
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  // Manejar el envío del formulario
  const handleSubmit = async (login) => {
    login.preventDefault();

    // Crear el nuevo evento con los datos del formulario
    const newEvent = {
      user,
      password
    };

    try {
      onNewEvent(newEvent);  
    } catch (error) {
      console.error("Error al crear el evento:", error);
    }
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:  </label>
          <input
            type="text"
            value={user}
            onChange={(login) => setUser(login.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:  </label>
          <input
            type="text"
            value={password}
            onChange={(login) => setPassword(login.target.value)}
            required
          />
        </div>
        <button className="enviar" type="submit">Login</button>
        <p>Si no tienes cuenta ingrese <Link className="link" to={"../register"}>aqui</Link></p>
      </form>
    </div>
  );
};

export default Login;
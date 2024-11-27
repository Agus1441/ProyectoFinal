import React, { useState } from "react";
import './EditProfile.css';
import { putUser } from "../../Services/UsersService";
import defaultPhoto from "../../assets/defaultpic.jpg";

const EditProfile = ({ user, onClose, onUpdate }) => {
    const [updatedName, setUpdatedName] = useState(user?.username || "");
    const [profilePicture, setProfilePicture] = useState(user?.profilePicture || defaultPhoto);
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const handleNameChange = (event) => {
        setUpdatedName(event.target.value);
    };

    const handleImageChange = (event) => {
        const fileUploaded = event.target.files[0];
        if (fileUploaded) {
            setProfilePicture(URL.createObjectURL(fileUploaded));
            setFile(fileUploaded);
            setErrorMessage("");
        }
    };

    const handleSubmit = async () => {
        if (!updatedName.trim()) {
            setErrorMessage("El nombre no puede estar vacío.");
            return;
        }
    
        const formData = {
            username: updatedName,
            profilePicture: file ? file.name : null,
        }
        console.log("Datos enviados al servidor:", formData);
    
        try {
            const response = await putUser(formData); 
            console.log("Respuesta del servidor:", response);
            if (response.success) {
                onUpdate(); 
                onClose(); 
            } else {
                setErrorMessage(response.message);
            }
        } catch (error) {
            console.error("Error en handleSubmit:", error);
            setErrorMessage("Hubo un error al actualizar el perfil.");
        }
    };


    return (
        <div className="edit-profile-modal">
            <div className="edit-profile-content">
                <h2>Editar Perfil</h2>
                <div className="edit-profile-section">
                    <h3>Foto de Perfil</h3>
                    <img src={profilePicture} alt="Profile" className="edit-profile-picture" />
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>
                <div className="edit-profile-section">
                    <h3>Nombre de Usuario</h3>
                    <input
                        type="text"
                        value={updatedName}
                        onChange={handleNameChange}
                        placeholder="Nuevo nombre de usuario"
                        className="edit-profile-input"
                    />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className="edit-profile-buttons">
                    <button onClick={handleSubmit} className="save-button">Guardar</button>
                    <button onClick={onClose} className="cancel-button">Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;

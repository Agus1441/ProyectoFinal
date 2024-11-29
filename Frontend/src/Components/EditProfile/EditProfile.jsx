import React, { useState } from "react";
import './EditProfile.css';

const EditProfile = ({ user, onClose, onUpdate }) => {
    const [updatedName, setUpdatedName] = useState(user?.username || "");
    const [profilePicture, setProfilePicture] = useState(user?.profilePicture || "");
    const [errorMessage, setErrorMessage] = useState("");

    const handleNameChange = (event) => {
        setUpdatedName(event.target.value);
    };

    const handlePictureLinkChange = (event) => {
        setProfilePicture(event.target.value);
    };

    const putUser = async (url, data, token) => {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        return await response.json();
    };

    const handleSubmit = async () => {
        if (!updatedName.trim()) {
            setErrorMessage("El nombre no puede estar vacío.");
            return;
        }

        const data = {
            username: updatedName,
            profilePicture: profilePicture.trim() || user.profilePicture,
        };

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setErrorMessage("No estás autenticado. Por favor, inicia sesión.");
                return;
            }

            const response = await putUser(
                'http://localhost:3001/api/user/profile/edit',
                data,
                token
            );

            if (response.success) {
                onUpdate(); // Actualiza los datos en el perfil
                onClose();  // Cierra el modal
            } else {
                setErrorMessage(response.message);
            }
        } catch (error) {
            setErrorMessage("Hubo un error al actualizar el perfil.");
        }
    };

    return (
        <div className="edit-profile-modal">
            <div className="edit-profile-content">
                <h2>Editar Perfil</h2>
                <div className="edit-profile-section">
                    <h3>Foto de Perfil</h3>
                    <input
                        type="text"
                        value={profilePicture}
                        onChange={handlePictureLinkChange}
                        placeholder="Link de la foto de perfil"
                        className="edit-profile-input"
                    />
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

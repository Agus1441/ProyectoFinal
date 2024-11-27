import React, { useState } from "react";
import './EditProfile.css';
import defaultPhoto from "../../assets/defaultpic.jpg";

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

    const putUser = async (url, data) => {
        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error en putUser:", error);
            throw error;
        }
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

        console.log("Datos enviados al servidor:", data);

        try {
            const response = await putUser('http://localhost:3001/api/user/profile/edit', data);
            console.log("Respuesta del servidor:", response);
            if (response.success) {
                onUpdate();
                onClose();
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

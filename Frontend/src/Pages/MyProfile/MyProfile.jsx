import React, { useState } from "react";
import './MyProfile.css'; 
import Footer from "../../Components/Footer/Footer";

const MyProfile = () => {
  const [user, setUser] = useState({
    name: "Mateo",
    username: "mateo123",
    bio: "Estudiante en UCU.",
    profilePicture: "https://i.pinimg.com/736x/37/8a/27/378a270e775265622393da8c0527417e.jpg",
    postsCount: 153,
    friendsCount: 209,
    posts: [
      {
        id: 1,
        imageUrl: "https://www.mensjournal.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MjA2MjcxNzAxMzg1NjE4NjA4/elden-ring-best-route.jpg",
        caption: "Jugando Elden Ring",
      },
      {
        id: 3,
        imageUrl: "https://media.elobservador.com.uy/p/ec698a312ec601c8b59ded21937bd494/adjuntos/362/imagenes/100/557/0100557383/1000x0/smart/20241020-penarol-festejo-el-triunfo-boston-river-pensando-botafogo-la-copa-libertadores.jpeg",
        caption: "Alentando a PEÑAROL",
      },
      {
        id: 4,
        imageUrl: "https://www.ucu.edu.uy/imgnoticias/202305/W950/2416.jpg",
        caption: "En la facultad 😎",
      },
      {
        id: 2,
        imageUrl: "https://s2-ug.ap4r.com/image-aigc-article/seoPic/origin/15aa3f1d8146fe8ea01c12b750ed5d5c225d2aaf.jpg",
        caption: "Mi Primer Post",
      },
    ],
  });

  // Estado para controlar el modal y los datos de la nueva publicación
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPostData, setNewPostData] = useState({
    imageUrl: "",
    description: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // Para almacenar el mensaje de error

  // Función para abrir el modal
  const openModal = () => setIsModalOpen(true);

  // Función para cerrar el modal
  const closeModal = () => {
    setNewPostData({ imageUrl: "", description: "" }); // Resetea los datos
    setErrorMessage(""); // Resetea el mensaje de error
    setIsModalOpen(false);
  };

  // Función para manejar la subida de la nueva imagen
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewPostData((prevData) => ({
        ...prevData,
        imageUrl: URL.createObjectURL(file), // Mostramos la imagen localmente
      }));
      setErrorMessage(""); // Limpiar el mensaje de error si selecciona una imagen
    }
  };

  // Función para manejar el cambio de descripción
  const handleDescriptionChange = (event) => {
    setNewPostData((prevData) => ({
      ...prevData,
      description: event.target.value,
    }));
  };

  // Función para subir la nueva publicación
  const handleUpload = () => {
    // Validación: Verificar si se ha seleccionado una imagen
    if (!newPostData.imageUrl) {
      setErrorMessage("Debes subir una foto antes de publicar.");
      return;
    }

    const newPost = {
      id: user.posts.length + 1,
      imageUrl: newPostData.imageUrl,
      caption: newPostData.description || "Nueva publicación", // Si no hay descripción, usar un texto por defecto
    };

    // Actualizamos el estado del usuario agregando la nueva publicación
    setUser((prevUser) => ({
      ...prevUser,
      posts: [newPost, ...prevUser.posts], // Agregar al principio de la lista
      postsCount: prevUser.postsCount + 1, // Incrementamos el conteo de posts
    }));

    // Cerramos el modal
    closeModal();
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <img src={user.profilePicture} alt="Profile" className="profile-picture" />
        
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p>@{user.username}</p>
          <p>{user.bio}</p>
        </div>
        
        <div className="profile-stats">
          <div>
            <span>{user.postsCount}</span>
            <p>Posts</p>
          </div>
          <div>
            <span>{user.friendsCount}</span>
            <p>Friends</p>
          </div>
        </div>

        <button className="profile-edit-button">Edit profile</button>
      </div>

      <div className="profile-posts">
        {user.posts.map((post) => (
          <div key={post.id} className="profile-post">
            <img src={post.imageUrl} alt="Post" className="post-image" />
          </div>
        ))}
      </div>
      
      {/* Pasamos la función openModal al Footer */}
      <Footer onOpenModal={openModal} />

      {/* Modal de subida de imagen */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Subir una nueva publicación</h2>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {newPostData.imageUrl && (
              <img src={newPostData.imageUrl} alt="Preview" className="image-preview" />
            )}
            <textarea
              placeholder="Escribe una descripción..."
              value={newPostData.description}
              onChange={handleDescriptionChange}
              className="description-box"  
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Mensaje de error */}
            <button onClick={handleUpload}>Subir</button>
            <button onClick={closeModal}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;

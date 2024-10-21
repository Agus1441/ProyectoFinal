import { useEffect, useState } from "react";
import Comment from "../Comment/Comment";
import { getUser } from "../../Services/UsersService";
import { commentPost, likePost } from "../../Services/PostsService";

const Post = ({ user, caption, likes, createdAt, postId, userName, userProfPic, description, comments }) => {
    const [userData, setUserData] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [liked, setLiked] = useState(likes.includes(user)); // Verificar si el usuario ha dado like
    const [commenting, setCommenting] = useState(false);
    const [error, setError] = useState('');

    // Cargar datos del usuario al montar el componente
    useEffect(() => {
        const fetchUser = async () => {
            const data = await getUser(user); // Obtén los datos del usuario por ID
            if (data) setUserData(data);
        };
        fetchUser();
    }, [user]);

    // Manejar el like del post
    const handleLike = async () => {
        const response = await likePost(postId);
        if (response.success) {
            setLiked(!liked); // Alternar el estado del like
        } else {
            setError(response.message); // Manejo de errores
        }
    };

    // Manejar envío de comentario
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const result = await commentPost(newComment, postId);
        if (result.success) {
            // Agregar el nuevo comentario al estado (aquí podrías actualizar el estado para reflejarlo)
            setNewComment(''); // Limpiar el input del comentario
            setCommenting(false); // Cerrar el modo de comentar
        } else {
            setError(result.message); // Manejo de errores
        }
    };

    return (
        <div className="post">
            {/* Foto de perfil y nombre del usuario */}
            <img src={userProfPic} alt={"Foto de Perfil de " + userName} />
            <p>{userName}</p>

            {/* Opciones de post (Compartir/Reportar) */}
            <select name="Opciones de Post">
                <option value="Compartir">Compartir</option>
                <option value="Reportar">Reportar</option>
            </select>

            {/* Imagen de la publicación */}
            <img src={`https://example.com/posts/${postId}.jpg`} alt="Publicación" />

            {/* Botón de like */}
            <button onClick={handleLike}>
                {liked ? "Liked" : "Like"}
            </button>

            {/* Botón para comentar */}
            <button onClick={() => setCommenting(!commenting)}>
                Comentar
            </button>

            {/* Mostrar cantidad de likes */}
            <p>{likes.length} Likes</p>

            {/* Descripción del post */}
            <p>{userName + " " + description}</p>

            {/* Mostrar número de comentarios */}
            <div style={{ color: 'grey' }}>Ver los {comments.length} comentarios</div>

            {/* Modo de comentario */}
            {commenting && (
                <form onSubmit={handleCommentSubmit}>
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Escribe un comentario..."
                        required
                    />
                    <button type="submit">Enviar</button>
                </form>
            )}

            {/* Mostrar comentarios */}
            <div className="comments">
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <Comment key={index} commentData={comment} />
                    ))
                ) : (
                    <p>No hay comentarios.</p>
                )}
            </div>

            {/* Mostrar errores si los hay */}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Post;

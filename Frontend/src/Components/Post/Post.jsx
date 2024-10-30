import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "../Comment/Comment";
import { getUser } from "../../Services/UsersService";
import { commentPost, getPosts, likePost } from "../../Services/PostsService";
import styles from "./post.module.css";

const Post = ({ postId: propPostId }) => {
    const { id: paramId } = useParams();
    const postId = propPostId || paramId; // Usa propPostId si está disponible, sino toma el id de la URL

    const [postData, setPostData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [liked, setLiked] = useState(false);
    const [commenting, setCommenting] = useState(false);
    const [error, setError] = useState('');
    const exampleImage = "https://i.pinimg.com/736x/37/8a/27/378a270e775265622393da8c0527417e.jpg";

    useEffect(() => {
        if (!postId) return; // Si no hay postId, no ejecuta la función

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await getPosts();
                if (response.data) {
                    const post = response.data.find(post => post._id === postId);
                    if (post) {
                        setPostData(post);
                        const userResponse = await getUser(post.user);
                        if (userResponse) setUserData(userResponse);
                    } else {
                        setError("Publicación no encontrada");
                    }
                }
            } catch (err) {
                setError("Error al cargar la publicación");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [postId]);

    const handleLike = async () => {
        try {
            const response = await likePost(postId);
            if (response.success) {
                setLiked(!liked);
            } else {
                setError(response.message || "Error al dar 'Me gusta'");
            }
        } catch (err) {
            setError("Error al dar 'Me gusta'");
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await commentPost(newComment, postId);
            if (result.success) {
                setNewComment('');
                setCommenting(false);
            } else {
                setError(result.message || "Error al comentar");
            }
        } catch (err) {
            setError("Error al comentar");
        }
    };

    if (loading) return <div>Cargando Datos...</div>;
    if (error) return <div>{error}</div>;
    if (!postData || !userData) return <div>No se pudo encontrar la publicación :C</div>;

    return (
        <div className={styles.post}>
            <div className={styles.profileInfo}>
                <img
                    src={exampleImage}
                    alt={"Foto de Perfil de " + userData.username}
                    className={styles.profileImage}
                />
                <h2 className={styles.username}>{userData.username}</h2>
            </div>

            <select name="Opciones de Post">
                <option value="Compartir">Compartir</option>
                <option value="Reportar">Reportar</option>
            </select>

            <img
                src={`./posts/${postId}.jpg`}
                alt={`Publicación ${postId}`}
                className={styles.postImage}
            />

            <div className={styles.actions}>
                <button onClick={handleLike} className={styles.actionButton}>
                    {liked ? (
                        <svg width="24" height="24" fill="red" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    ) : (
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    )}
                </button>

                <button onClick={() => setCommenting(!commenting)} className={styles.actionButton}>
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" />
                    </svg>
                </button>
            </div>

            <p>{postData.likes.length} Likes</p>
            <p>{userData.username + " " + postData.content}</p>

            <div className={styles.commentSection}>Ver los {/*comments.length*/} comentarios</div>

            {commenting && (
                <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Escribe un comentario..."
                        required
                        className={styles.commentInput}
                    />
                    <button type="submit" className={styles.submitButton}>Enviar</button>
                </form>
            )}

            {error && <p className={styles.errorMessage}>{error}</p>}
        </div>
    );
};

export default Post;

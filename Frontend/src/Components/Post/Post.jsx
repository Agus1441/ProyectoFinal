import { createElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "../Comment/Comment";
import { commentPost, getPosts, likePost, removeLike } from "../../Services/PostsService";
import styles from "./post.module.css";
import { backendURL } from "../../Constants";
import defaultPhoto from "../../assets/defaultpic.jpg";

const Post = ({ postId, publisher, caption, likes, createdAt, imageUrl, comments }) => {

    const { id } = useParams();

    const [postData, setPostData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [liked, setLiked] = useState(false);
    const [commenting, setCommenting] = useState(false);
    const [error, setError] = useState('');
    const [optionsVisible, setOptionsVisible] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const navigate = useNavigate();

    if (window.location.href.startsWith("http://localhost:5173/posts/")) {
        const { id } = useParams();
        if (!id) return;
        useEffect(() => {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const response = await getPosts();
                    if (response.data) {
                        const post = response.data.find(post => post._id === id);
                        if (post) {
                            post.publisher = post.user;
                            setPostData(post);
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
        }, []);
    }
    else{
        useEffect(() => {
            setPostData({
                _id: postId,
                publisher: publisher,
                caption: caption,
                likes: likes,
                createdAt: createdAt,
                imageUrl: imageUrl,
                comments: comments,
            });
            setLoading(false);
        }, [])
    }

    useEffect(() => {
        if (postData) {
            setLiked(postData.likes.includes(localStorage.getItem('userId')));
        }
    }, [postData]);

    const handleLike = async () => {

        if(postData.likes.includes(localStorage.getItem('userId'))){
            try {
                const response = await removeLike(postData._id);
                if (response.success) {
                    setLiked(!liked);
                    setPostData({
                        ...postData,
                        likes: postData.likes.filter(userId => userId !== localStorage.getItem('userId'))
                    });
                } else {
                    setError(response.message || "Error al quitar el 'Me gusta'");
                }
            } catch (err) {
                setError("Error al quitar el 'Me gusta'");
            }
        }
        else{
            try {
                const response = await likePost(postData._id);
                if (response.success) {
                    setLiked(!liked);
                    setPostData({
                        ...postData,
                        likes: [...postData.likes, localStorage.getItem('userId')]
                    });
                } else {
                    setError(response.message || "Error al dar 'Me gusta'");
                }
            } catch (err) {
                setError("Error al dar 'Me gusta'");
            }
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const result = await commentPost(newComment, postData._id);
        if (result.success) {
            setNewComment('');
            setCommenting(false);
        } else {
            setError(result.message);
        }
    };

    const toggleOptions = () => {
        setOptionsVisible(!optionsVisible);
    };

    const closeOptions = () => {
        setOptionsVisible(false);
    };


    const toggleComments = () => {
        setShowComments(!showComments);
    };

    if (loading) return <div>Cargando Datos...</div>;
    if (error) return <div>{error}</div>;
    if (!postData) return <div>No se pudo encontrar la publicación :C</div>;

    return (
        <div className={styles.post}>
            <div className={styles.profileInfo}>
                <img
                    src={postData.publisher.profilePicture || defaultPhoto}
                    alt={"Foto de Perfil de " + postData.publisher.username}
                    className={styles.profileImage}
                    onClick={() => {navigate(`/profile/${postData.publisher._id}`)}}
                />
                <h2 className={styles.username} 
                    onClick={() => {navigate(`/profile/${postData.publisher._id}`)}}
                >
                    {postData.publisher.username}
                </h2>

                <button onClick={toggleOptions} className={styles.optionsButton}>
                    <svg width="20" height="20" viewBox="0 0 24 24">
                        <circle cx="5" cy="12" r="2" />
                        <circle cx="12" cy="12" r="2" />
                        <circle cx="19" cy="12" r="2" />
                    </svg>
                </button>

                {optionsVisible && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <span className={styles.close} onClick={closeOptions}>&times;</span>
                            <button onClick={() => {/* lógica para compartir */ }} className={styles.submitButton}>Compartir</button>
                            <button onClick={() => {/* lógica para reportar */ }} className={styles.submitButton}>Reportar</button>
                        </div>
                    </div>
                )}
            </div>

            <img
                style={{ borderRadius: "8px", width: "100%", height: "100%" }}
                src={backendURL + postData.imageUrl}
                alt={postData.caption}
                className={styles.postImage}
            />

            <div className={styles.actions}>
                <button onClick={handleLike} className={styles.actionButton}>
                    {liked ? (
                        <svg width="24" height="24" fill="black" viewBox="0 0 24 24">
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

            <p className={styles.likes}>{postData.likes.length} Likes</p>
            <p> 
                <b className={styles.smallUsername}>{postData.publisher.username} </b>
                {postData.caption}
            </p>


            <div className={styles.commentSection} onClick={toggleComments}>
                {showComments 
                    ? `Ocultar comentarios` 
                    : `Ver los ${postData.comments?.length || 0} comentarios`}
            </div>

            {showComments && postData.comments.map((commentId) => (
                <Comment key={commentId} id={commentId} />
            ))}

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

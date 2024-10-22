import { useEffect, useState } from "react";
import Comment from "../Comment/Comment";
import { getUser } from "../../Services/UsersService";
import { commentPost, getPosts, likePost } from "../../Services/PostsService";
import { useParams } from "react-router-dom";

/*
    Post de Ejemplo:
    {
    "_id": "634f1b5c8f25c32a5cd55f9b",
    "user": "634f1b2c8f25c32a5cd55f9a",
    "content": "Este es un post de ejemplo",
    "likes": [
        "634f1b2c8f25c32a5cd55f9a"
    ],
    "createdAt": "2024-10-05T15:21:34.788Z"
    }
*/


const Post = ({ postId }) => {
    //Sí estoy en una página de post individual, cargo la id de la URL en la prop.
    if (window.location.href.startsWith("http://localhost:5173/posts/")){
        const { id } = useParams();
        if(id) postId = id;
        console.log("Id obtenida por URL: " + postId);
    }

    const [postData, setPostData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [liked, setLiked] = useState(false);
    const [commenting, setCommenting] = useState(false);
    const [error, setError] = useState('');
    const exampleImage = "https://i.pinimg.com/736x/37/8a/27/378a270e775265622393da8c0527417e.jpg";




    // Cargar datos del usuario al montar el componente
    useEffect(() => {
        const fetchData = async () => {
            const response = await getPosts();
            if (response.data){
                response.data.forEach(async post => {
                    console.log(postId == post._id)
                    if(post._id == postId){
                        setPostData(post);
                        const data = await getUser(post.user);
                        if (data) setUserData(data);   
                    }
                });
            }
            setLoading(false);
        };
        fetchData();
    }, []);



    // Manejar el like del post
    const handleLike = async () => {
        const response = await likePost(postId);
        if (response.success) {
            setLiked(!liked);
        } else {
            setError(response.message);
        }
    };





    // Manejar envío de comentario
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const result = await commentPost(newComment, postId);
        if (result.success) {
            setNewComment('');
            setCommenting(false);
        } else { 
            setError(result.message);
        }
    };


    if(loading) return <div>Cargando Datos...</div>
    if(!postData || !userData) return <div>No se pudo encontrar la publicación :C</div> 

    return (
        <div className="post">
            <img src={/*userData.profpic*/exampleImage} alt={"Foto de Perfil de " + userData.username} />
            <h2>{userData.username}</h2>

            <select name="Opciones de Post">
                <option value="Compartir">Compartir</option>
                <option value="Reportar">Reportar</option>
            </select>

            <img src={`./posts/${postId}.jpg`} alt={`Publicación ${postId}`} />


            <button onClick={handleLike}>
                {liked ? "Liked" : "Like"}
            </button>


            <button onClick={() => setCommenting(!commenting)}>
                Comentar
            </button>


            <p>{postData.likes.length} Likes</p>

            <p>{userData.username + " " + postData.content}</p>

            {/*Falta un endpoint para pedirle los comentarios al backend*/}
            <div style={{ color: 'grey' }}>Ver los {/*comments.length*/} comentarios</div>

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

            {
                /* Falta un endpoint para pedirle los comentarios al backend

                <div className="comments">
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <Comment key={index} commentData={comment} />
                        ))
                    ) : (
                        <p>No hay comentarios.</p>
                    )}
                </div>
                */
            }

            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Post;

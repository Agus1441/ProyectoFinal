import { useState } from "react";
import Comment from "../Comment/Comment";

const Post = ({postData}) => {

    const [commenting, setCommenting] = useState(false);

    return <></>
    /* Primer Intento de Post
    return (
        <div>
            <img src={postData.userProfPic} alt={"Foto de Perfil de " + postData.userName} />
            {postData.userName}
            <select name="Opciones de Post">
                <option value="Compartir">Compartir</option>
                <option value="Reportar">Reportar</option>
            </select>
            <img src={postData.src} alt="Publicación" />
            <button>{userData.likedPosts.includes(postData.id) ? "Liked" : "Like"}</button>
            <button onClick={() => {setCommenting(true)}}>Comentar</button>
            {postData.likes + " Likes"} 
            {postData.userName + " " + postData.description}
            <div style={{color: 'grey'}}>Ver los {postData.commentsNumber} comentarios</div>
            {postData.comments.map(comment => {
                <Comment commentData = {comment}/>
            })}
        </div>
    )
    */
}

export default Post;
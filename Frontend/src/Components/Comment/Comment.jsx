/*
Objeto Comentario para Referencia:
{
  "_id": "634f1b5c8f25c32a5cd55f9b",
  "user": "634f1b2c8f25c32a5cd55f9a",
  "post": "634f1b5c8f25c32a5cd55f9c",
  "content": "Este es un comentario de ejemplo",
  "createdAt": "2024-10-05T15:21:34.788Z"
}
*/
import { getUser } from "../../Services/UsersService";

const Comment = ({commentData}) => {

    const [userData, setUserData] = useState({});

    useEffect(() => {
        const FetchUser = async () => {
            setUserData(await getUser(commentData.user));
        }
        FetchUser();
    })

    return(
        <div>
            {userData.username + " " + commentData.content}
            <br />
            {commentData.createdAt}
        </div>
    )
}

export default Comment;
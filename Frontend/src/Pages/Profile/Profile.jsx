import React, { useEffect, useState } from "react";
import Footer from "../../Components/Footer/Footer";
import { getUser } from "../../Services/UsersService";
import { useNavigate, useParams } from "react-router-dom";
import { getPosts, uploadPost } from "../../Services/PostsService";
import defaultPhoto from "../../assets/defaultpic.jpg";
import Logout from "../../Components/Logout/logout";
import { backendURL } from "../../Constants";


const Profile = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const [user, setUser] = useState({});
    const [userPosts, setUserPosts] = useState([]);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
    const { id } = useParams();

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!userId) {
            navigate('/');
        } else {
            const fetchUser = async () => {
                const userObject = await getUser(id);
                console.log(userObject);
                setUser(userObject.data.user);
                setUserPosts(userObject.data.posts);
            };
            fetchUser();
        }
    }, [userId, navigate]);

    const [errorMessage, setErrorMessage] = useState("");


    return (
        user && <div className="profile">
            <div className="profile-header">

                <img src={user.profilePicture || defaultPhoto} alt="Profile" className="profile-picture" />

                <div className="profile-info">
                    <h2>{user.username}</h2>
                </div>

                <div className="profile-stats">
                    <div>
                        <span>{userPosts?.length || 0}</span>
                        <p>Posts</p>
                    </div>
                    <div>
                        <span>{user.friends?.length || 0}</span>
                        <p>Friends</p>
                    </div>
                </div>
            </div>


            {userPosts.length > 0 ?
                <div className="profile-posts">{
                    userPosts.map((post) => (
                        <div key={post._id} className="profile-post">
                            <img src={backendURL + post.imageUrl} alt="Post" className="post-image" onClick={() => { navigate(`/posts/${post._id}`) }} />
                        </div>
                    ))
                }
                </div> :
                <p className="bigMessage">{user.username} todavía no ha publicado nada</p>
            }

            <Footer />
        </div>
    );
};

export default Profile;

import React, { useEffect, useState } from "react";
import './MyProfile.css'; 
import Footer from "../../Components/Footer/Footer";
import { getUser } from "../../Services/UsersService";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../Services/PostsService";
import defaultPhoto from "../../assets/defaultpic.jpg";
import Logout from "../../Components/Logout/logout";

const MyProfile = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const [user, setUser] = useState({});
    const [myPosts, setMyPosts] = useState([]);

    useEffect(() => {
        if(!userId){
            navigate('/');
        } else {
            const fetchUser = async () => {
                const userObject = await getUser(userId);
                setUser(userObject.data.user);
                setMyPosts(userObject.data.posts);
            };
            fetchUser();
        }
    }, [userId, navigate]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPostData, setNewPostData] = useState({
        imageUrl: "",
        description: "",
    });
    const [errorMessage, setErrorMessage] = useState("");

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setNewPostData({ imageUrl: "", description: "" });
        setErrorMessage("");
        setIsModalOpen(false);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setNewPostData((prevData) => ({
                ...prevData,
                imageUrl: URL.createObjectURL(file),
            }));
            setErrorMessage("");
        }
    };

    const handleDescriptionChange = (event) => {
        setNewPostData((prevData) => ({
            ...prevData,
            description: event.target.value,
        }));
    };

    const handleUpload = () => {
        if (!newPostData.imageUrl) {
            setErrorMessage("Debes subir una foto antes de publicar.");
            return;
        }

        const newPost = {
            id: user.posts ? user.posts.length + 1 : 1,
            imageUrl: newPostData.imageUrl,
            caption: newPostData.description || "Nueva publicación",
        };

        setUser((prevUser) => ({
            ...prevUser,
            posts: [newPost, ...(prevUser.posts || [])],
            postsCount: (prevUser.postsCount || 0) + 1,
        }));

        closeModal();
    };

    return (
        user && <div className="profile">
            <div className="profile-header">
                <img src={user.profilePicture || defaultPhoto} alt="Profile" className="profile-picture" />
                
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
                {myPosts.length > 0 ? myPosts.map((post) => (
                    <div key={post._id} className="profile-post">
                        <img src={post.image} alt="Post" className="post-image" />
                    </div>
                )) : <p>No posts available</p>}
            </div>
            
            <Footer onOpenModal={openModal} />

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
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <button onClick={handleUpload}>Subir</button>
                        <button onClick={closeModal}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyProfile;

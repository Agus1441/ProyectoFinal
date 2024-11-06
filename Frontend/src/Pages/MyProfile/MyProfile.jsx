import React, { useEffect, useState } from "react";
import './MyProfile.css';
import Footer from "../../Components/Footer/Footer";
import { getUser } from "../../Services/UsersService";
import { useNavigate } from "react-router-dom";
import { getPosts, uploadPost } from "../../Services/PostsService";
import defaultPhoto from "../../assets/defaultpic.jpg";
import Logout from "../../Components/Logout/logout";
import { backendURL } from "../../Constants";


const MyProfile = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const [user, setUser] = useState({});
    const [myPosts, setMyPosts] = useState([]);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
    const [file, setFile] = useState();

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
        const fileUploaded = event.target.files[0];
        if (fileUploaded) {
            setNewPostData((prevData) => ({
                ...prevData,
                imageUrl: URL.createObjectURL(fileUploaded),
            }));
            setErrorMessage("");
            setFile(fileUploaded);
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

        console.log(newPostData);
        console.log(uploadPost(file, newPostData.description || "Nueva publicación"));

        closeModal();
    };

    return (
        user && <div className="profile">
            <div className="profile-header">
               
                <img src={user.profilePicture || defaultPhoto} alt="Profile" className="profile-picture" />
                 
                    <button className="upload-button" onClick={openModal}>
                        <img src="https://static-00.iconduck.com/assets.00/camera-icon-2048x1821-0b66mmq3.png" alt="Camera" className="icon upload-icon" />
                    </button>
                
                
            
                <div className="profile-info">
                    <h2>Nombre: {user.name}</h2>
                    <p>@{user.username}</p>
                    <p>Descripcion: {user.bio}</p>
                </div>


                

                <div className="profile-stats">
                    <div>
                        <span>{user.postsCount}</span>
                        <p>Posts</p>
                    </div>
                    <div>
                        <span>{user.friendsCount}</span>
                        <p>Friends </p>
                    </div>
                </div>

                <button className="profile-edit-button">Edit profile</button>
            </div>

            <div className="profile-posts">
                {myPosts.length > 0 ? myPosts.map((post) => (
                    <div key={post._id} className="profile-post">
                        <img src={backendURL + post.imageUrl} alt="Post" className="post-image" />
                    </div>
                )) : <p>No posts available</p>}
            </div>



            <Footer />

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

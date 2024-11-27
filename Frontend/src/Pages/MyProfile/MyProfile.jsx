import React, { useEffect, useState } from "react";
import './MyProfile.css';
import Footer from "../../Components/Footer/Footer";
import { getUser } from "../../Services/UsersService";
import { useNavigate } from "react-router-dom";
import { getPosts, uploadPost } from "../../Services/PostsService";
import defaultPhoto from "../../assets/defaultpic.jpg";
import MoreOptions from "../../Components/MoreOptions/MoreOptions";
import { backendURL } from "../../Constants";
import EditProfile from "../../Components/EditProfile/EditProfile";

const MyProfile = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const [user, setUser] = useState({});
    const [myPosts, setMyPosts] = useState([]);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
    const [file, setFile] = useState();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);


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
                <div className="profile-header-content">
                    <button className="upload-button" onClick={openModal}>
                        <img src="https://static-00.iconduck.com/assets.00/upload-icon-2048x2048-eu9n5hco.png" alt="upload" className="icon upload-icon" />
                    </button>
                    <MoreOptions />
                </div>
                <img src={user.profilePicture || defaultPhoto} alt="Profile" className="profile-picture" />
                <div className="profile-info">
                    <h2>{user.username}</h2>
                </div>
                <div className="profile-stats">
                    <div>
                        <span>{myPosts?.length || 0}</span>
                        <p>Posts</p>
                    </div>
                    <div>
                        <span>{user.friends?.length || 0}</span>
                        <p>Friends</p>
                    </div>
                </div>
                <button className="profile-edit-button" onClick={() => setIsEditModalOpen(true)}>Editar perfil</button>
                {isEditModalOpen && (
                    <EditProfile
                        user={user}
                        onClose={() => setIsEditModalOpen(false)}
                        onUpdate={() => {
                            // Recargar datos del usuario
                            const fetchUser = async () => {
                                const userObject = await getUser(userId);
                                setUser(userObject.data.user);
                            };
                            fetchUser();
                        }}
                    />
                )}

            </div>
            {myPosts.length > 0 ? (
                <div className="profile-posts">{
                    myPosts.map((post) => (
                        <div key={post._id} className="profile-post">
                            <img src={backendURL + post.imageUrl} alt="Post" className="post-image" onClick={() => { navigate(`/posts/${post._id}`) }} />
                        </div>
                    ))
                }</div>
            ) : (
                <p className="bigMessage">Todavía no has publicado nada</p>
            )}
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

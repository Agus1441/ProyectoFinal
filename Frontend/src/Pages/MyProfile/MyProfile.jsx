import React from "react";
import './MyProfile.css'; 

const MyProfile = () => {
  const user = {
    name: "Mateo",
    username: "mateo123",
    bio: "Estudiante en UCU.",
    profilePicture: "https://via.placeholder.com/150", 

    //posts de ejemplo
    posts: [
      {
        id: 1,
        imageUrl: "https://via.placeholder.com/300", 
        caption: "Mi primer post",
      },
      {
        id: 2,
        imageUrl: "https://via.placeholder.com/300",
        caption: "Jugando Elden Ring",
      },
    ],
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <img src={user.profilePicture} alt="Profile" className="profile-picture" />
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p>@{user.username}</p>
          <p>{user.bio}</p>
        </div>
      </div>

      <div className="profile-posts">
        {user.posts.map(post => (
          <div key={post.id} className="profile-post">
            <img src={post.imageUrl} alt="Post" className="post-image" />
            <p>{post.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProfile;

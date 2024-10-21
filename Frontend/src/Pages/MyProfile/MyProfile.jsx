import React from "react";
import './MyProfile.css'; 
import Footer from "../../Components/Footer/Footer";

const MyProfile = () => {
  const user = {
    name: "Mateo",
    username: "mateo123",
    bio: "Estudiante en UCU.",
    profilePicture: "https://i.pinimg.com/736x/37/8a/27/378a270e775265622393da8c0527417e.jpg", 

    postsCount: 153,
    friendsCount: 209,

    // Posts de ejemplo
    posts: [
      {
        id: 1,
        imageUrl: "https://www.mensjournal.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MjA2MjcxNzAxMzg1NjE4NjA4/elden-ring-best-route.jpg", 
        caption: "Jugando Elden Ring",
      },
      {
        id: 3,
        imageUrl: "https://media.elobservador.com.uy/p/ec698a312ec601c8b59ded21937bd494/adjuntos/362/imagenes/100/557/0100557383/1000x0/smart/20241020-penarol-festejo-el-triunfo-boston-river-pensando-botafogo-la-copa-libertadores.jpeg",
        caption: "Alentando a PEÑAROL",
      },
      {
        id: 4,
        imageUrl: "https://www.ucu.edu.uy/imgnoticias/202305/W950/2416.jpg",
        caption: "En la facultad 😎",
      },
      {
        id: 2,
        imageUrl: "https://s2-ug.ap4r.com/image-aigc-article/seoPic/origin/15aa3f1d8146fe8ea01c12b750ed5d5c225d2aaf.jpg",
        caption: "Mi Primer Post",
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
        {user.posts.map(post => (
          <div key={post.id} className="profile-post">
            <img src={post.imageUrl} alt="Post" className="post-image" />
          </div>
        ))}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MyProfile;


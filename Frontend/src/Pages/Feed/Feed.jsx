import React, { useState, useEffect } from 'react';
import Post from '../../Components/Post/Post';
import { getPosts } from '../../Services/PostsService';
import styles from './feed.module.css';
import Footer from '../../Components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import Title from '../../Components/Title/title';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        if (response.message === "Token no disponible. Por favor, inicia sesión.") {
          navigate('/');
        }
        console.log(response);
        setPosts(response.data);
      } catch (error) {
        console.error('Error al cargar las publicaciones:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Cargando publicaciones...</div>;
  }

  return (
    <div className={styles['feed-container']}>
      <Footer />
      <div className={styles['feed-content']}>
        {posts.length === 0 ? (
          <div>No hay publicaciones disponibles</div>
        ) : (
          posts.map((post) => (
            <div key={post._id} className={styles['feed-item']}>
              <Post
                postId={post._id}
                publisher={post.user}
                caption={post.caption}
                likes={post.likes}
                createdAt={post.createdAt}
                imageUrl = {post.imageUrl}
                comments = {post.comments}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Feed;

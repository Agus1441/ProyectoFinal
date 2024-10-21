import React, { useState, useEffect } from 'react';
import Post from '../../Components/Post/Post';
import { getPosts } from '../../Services/PostsService';
import styles from './feed.module.css';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response);
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
      {posts.length === 0 ? (
        <div>No hay publicaciones disponibles</div>
      ) : (
        posts.map((post) => (
          <div key={post.id} className={styles['feed-item']}>
            <Post
              user={post.user}
              image={post.image}
              caption={post.caption}
              likes={post.likes}
              comments={post.comments}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Feed;

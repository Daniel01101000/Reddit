import React, { useState, useEffect } from 'react';
import "../../styles/RedditPosts.css";
import LoadingSpinner from '../Loading/LoadingSpinner.jsx';

// URL base dinámica: local en desarrollo, producción en GitHub Pages
const BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:5000'
  : 'https://reddit-3.onrender.com';

// Función para obtener una imagen aleatoria
const fetchRandomImage = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/random-image`);
    const data = await response.json();
    return data.imageUrl;
  } catch (err) {
    console.error('Error obteniendo imagen aleatoria:', err);
    return '/images/Errors/RedditErrorInsects.png';
  }
};

export default function RedditPosts({ subreddit }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${BASE_URL}/api/posts?subreddit=${subreddit}`);
        if (!response.ok) throw new Error('No se pudieron obtener los posts');
        const data = await response.json();

        const postsWithFallback = await Promise.all(
          data.map(async (post) => {
            const fallbackImage = await fetchRandomImage();
            return { ...post, fallbackImage };
          })
        );
        setPosts(postsWithFallback);
      } catch (err) {
        setError(err.message);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchData();
  }, [subreddit]);

  const handleImageError = (e, fallbackImage) => {
    e.target.onerror = null;
    e.target.src = fallbackImage || '/images/Errors/RedditErrorInsects.png';
  };

  return (
    <div>
      {loading && <LoadingSpinner />}
      {error && <p className="error-message">Error: {error}</p>}
      {!loading && !error && (
        <div className='PostsContainer'>
          {posts.map((post, index) => (
            <div key={index} className='Post'>
              <p>{post.author}</p>
              <h2>{post.title}</h2>
              <a href={post.link} target="_blank" rel="noopener noreferrer">
                <img 
                  src={post.image || post.fallbackImage || '/images/Errors/RedditErrorInsects.png'}
                  className='ImagenPost' 
                  alt="Post" 
                  onError={(e) => handleImageError(e, post.fallbackImage)}
                />
              </a>
            </div>
          ))}
        </div> 
      )}
    </div>
  );
}
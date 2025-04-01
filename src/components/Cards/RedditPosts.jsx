import React, { useState, useEffect } from 'react';
import "../../styles/RedditPosts.css";
import LoadingSpinner from '../Loading/LoadingSpinner.jsx'; // Importamos el spinner

// Función asíncrona para obtener una imagen aleatoria
const fetchRandomImage = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/random-image');
    const data = await response.json();
    return data.imageUrl; // Regresa la URL de la imagen aleatoria
  } catch (err) {
    console.error('Error obteniendo imagen aleatoria:', err);
    return '/images/Errors/RedditErrorInsects.png'; // Imagen por defecto en caso de error
  }
};

export default function RedditPosts({ subreddit }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Asegurar que loading inicia en `true`
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Obtener posts
        const response = await fetch(`http://localhost:5000/api/posts?subreddit=${subreddit}`);
        if (!response.ok) throw new Error('No se pudieron obtener los posts');
        const data = await response.json();

        // Para cada post, asignar una imagen aleatoria de respaldo
        const postsWithFallback = await Promise.all(
          data.map(async (post) => {
            // Si el post no tiene imagen o queremos usar la aleatoria como respaldo
            const fallbackImage = await fetchRandomImage();
            return { ...post, fallbackImage };
          })
        );
        setPosts(postsWithFallback);
      } catch (err) {
        setError(err.message);
      } finally {
        setTimeout(() => setLoading(false), 500); // 🔹 Retraso para que el spinner se vea
      }
    };

    fetchData();
  }, [subreddit]);

  // Manejador de error para cada imagen
  const handleImageError = (e, fallbackImage) => {
    e.target.onerror = null; // Prevenir bucles infinitos en caso de fallo repetido
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
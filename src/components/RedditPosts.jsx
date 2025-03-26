// RedditPosts.js
import React, { useEffect, useState } from 'react';
import { fetchRedditPosts } from '../SolicitudApi/getToken.js';  // Importa la función de Api.js

const RedditPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Llamamos a la función que obtiene las publicaciones de Reddit
    fetchRedditPosts()
      .then(response => {
        const publicaciones = response.data.data.children;
        setPosts(publicaciones); // Almacena las publicaciones en el estado
        setLoading(false); // Termina de cargar la información
      })
      .catch(error => {
        setError('Error al cargar las publicaciones');
        console.log(error);
        setLoading(false); // Termina la carga aunque haya error
      });
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Publicaciones de Reddit - EarthPorn</h1>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <h2>{post.data.title}</h2>
            <a href={`https://www.reddit.com${post.data.permalink}`} target="_blank" rel="noopener noreferrer">
              Ver en Reddit
            </a>
            <p>Upvotes: {post.data.ups}</p>
            <img src={post.data.url} alt={post.data.title} style={{ maxWidth: '100%', height: 'auto' }} />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RedditPosts;
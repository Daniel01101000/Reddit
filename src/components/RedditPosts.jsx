import React, { useState, useEffect } from 'react';
import "../styles/RedditPosts.css";

export default function RedditPosts({ subreddit }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:5000/api/posts?subreddit=${subreddit}`);
        if (!response.ok) throw new Error('No se pudieron obtener los posts');
        
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [subreddit]);

  return (
    <div>
      <h1>Mostrando: r/{subreddit}</h1>
      {loading && <p>Cargando posts...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <h2>{post.title}</h2>
            <p>Autor: {post.author}</p>
            <img src={post.image}/>
            <a href={post.link} target="_blank" rel="noopener noreferrer">Ver en Reddit</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

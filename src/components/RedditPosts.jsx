import { useEffect, useState } from 'react';
import "../styles/RedditPosts.css";

function RedditPosts() {{}
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/posts')
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => console.error('Fetch error:', error));
    }, []);

    return (
        <div className='PostsContainer'>
                {posts.map((post, index) => (
                    <div key={index} className='Post'>
                            <h4>{post.author}</h4>
                            <h3>{post.title}</h3>
                            <a href={post.link} target="_blank" rel="noopener noreferrer">
                            <img src={post.image} alt={post.title} className='ImagenPost'/>
                        </a>
                        <p>Upvotes: {post.upvotes}</p>
                    </div>
                ))}
            
        </div>
    );
}
 
export default RedditPosts;


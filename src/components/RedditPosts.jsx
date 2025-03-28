import { useEffect, useState } from 'react';

function RedditPosts() {{}
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/posts')
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => console.error('Fetch error:', error));
    }, []);

    return (
        <div>
            <h1>Reddit Posts</h1>
            <ul>
                {posts.map((post, index) => (
                    <li key={index}>
                        <a href={post.link} target="_blank" rel="noopener noreferrer">
                            <h3>{post.title}</h3>
                            <img src={post.image} alt={post.title} />
                        </a>
                        <p>Upvotes: {post.upvotes}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
 
export default RedditPosts;

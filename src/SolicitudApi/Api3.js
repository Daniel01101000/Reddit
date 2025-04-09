const axios = require('axios');
const getRedditToken = require('./getToken.js');

async function getData(subreddit) { 
    try {
        const accessToken = await getRedditToken();
        if (!accessToken) throw new Error('No se pudo obtener el token de acceso.');

        // Usamos una variable de entorno para definir la URL base
        const apiUrl = process.env.API_URL || 'https://oauth.reddit.com'; // Para desarrollo, puedes usar la URL local de Reddit si es necesario

        const response = await axios.get(`${apiUrl}/r/${subreddit}/new.json`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'User-Agent': 'RedditScraper/1.0 by u/Mental-Ambition4267',
            },
            params: { limit: 5 }
        });

        const posts = response.data.data.children.map(post => ({
            title: post.data.title,
            link: `https://www.reddit.com${post.data.permalink}`,
            upvotes: post.data.ups,
            image: post.data.url,
            author: post.data.author,
        }));

        return posts;
    } catch (error) {
        console.error(`Error obteniendo datos de r/${subreddit}:`, error.message);
        return [];
    }
}

module.exports = { getData };
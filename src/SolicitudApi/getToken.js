const axios = require('axios');
const qs = require('qs');

module.exports = async function getRedditToken() {
    const clientId = 'yxGR18TuLR6_k9F6FXSTmA';
    const clientSecret = 'mHf1Gwdimp8lWShnX4qa69YaXQkztA';
    const username = 'Mental-Ambition4267';
    const password = 'reddittt112233';
    
    const tokenUrl = 'https://www.reddit.com/api/v1/access_token';
    const authHeader = 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    try {
        const response = await axios.post(
            tokenUrl,
            qs.stringify({ grant_type: 'password', username, password }),
            {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                    'Authorization': authHeader,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
        
        const access_token = response.data.access_token;
        console.log('Access Token:', access_token);
        return access_token;
    } catch (error) {
        console.error('Error fetching token:', error.response ? error.response.data : error.message);
    }
}

// Ejemplo de uso
//getRedditToken().then(access_token => {
//    if (access_token) {
//        console.log('Token almacenado:', access_token);
//    }
//});

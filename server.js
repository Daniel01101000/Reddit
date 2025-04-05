const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { getData } = require('./src/SolicitudApi/Api3.js');

const app = express();

// Usar el puerto dinámico de Heroku si está disponible, sino usar 5000 localmente
const PORT = process.env.PORT || 5000;

// Configuración de CORS
// Permitir solicitudes desde el dominio de GitHub Pages
const allowedOrigins = ['http://localhost:3000', 'https://daniel01101000.github.io'];
app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true); // Permite solicitudes de estos orígenes
        } else {
            callback(new Error('No permitido por CORS')); // Bloquea solicitudes de orígenes no permitidos
        }
    }
}));

app.use(express.json());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

// Función para obtener una imagen aleatoria de la carpeta Errors
function getRandomImage() {
    const folderPath = path.join(__dirname, './reddit/public/images/Errors');

    try {
        const files = fs.readdirSync(folderPath); // Leemos los archivos de la carpeta

        const images = files.filter(file =>
            file.match(/\.(jpg|jpeg|png|gif)$/i) // Filtramos los archivos de imagen
        );

        if (images.length === 0) {
            console.log('No se encontraron imágenes en la carpeta');
            return null;
        }

        const randomImage = images[Math.floor(Math.random() * images.length)]; // Seleccionamos una imagen aleatoria
        return `/images/Errors/${randomImage}`; // Retornamos la URL relativa
    } catch (err) {
        console.error('Error al leer la carpeta:', err);
        return null;
    }
}

// Endpoint para obtener posts
app.get('/api/posts', async (req, res) => {
    try {
        const subreddit = req.query.subreddit || 'EarthPorn';
        console.log(`Solicitando posts de r/${subreddit}...`);

        const posts = await getData(subreddit);

        if (!posts || posts.length === 0) {
            throw new Error('No se encontraron publicaciones');
        }

        res.json(posts);
    } catch (error) {
        console.error('Error obteniendo posts:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para obtener una imagen aleatoria de la carpeta Errors
app.get('/api/random-image', (req, res) => {
    const randomImage = getRandomImage(); // Llamamos a la función que obtiene la imagen aleatoria

    if (!randomImage) {
        return res.status(404).json({ error: 'No hay imágenes disponibles' });
    }

    res.json({ imageUrl: randomImage }); // Devolvemos la URL de la imagen aleatoria
});

// Iniciar el servidor
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));

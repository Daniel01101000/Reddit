const express = require('express');
const path = require('path');
const fs = require('fs');
const { getData } = require('../src/SolicitudApi/Data/getData.js');
const cors = require('cors');

const app = express();

// Servir imágenes estáticas desde /images/Errors
app.use('/images/Errors', express.static(path.join(__dirname, '..', 'public/images/Errors')));
app.use(express.static(path.join(__dirname, '..', 'public'))); // Asegura que se sirva correctamente desde fuera de /Server

// Puerto
const PORT = process.env.PORT || 5000;

/*
// Versión original con control de origen (comentada temporalmente)
const allowedOrigins = [
  'http://localhost:3000',
  'https://daniel01101000.github.io',
  'https://reddit-3.onrender.com',
];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  }
}));
*/

// ✅ Versión más flexible (permite todos los orígenes)
app.use(cors()); // O también: app.use(cors({ origin: '*' }))

app.use(express.json());

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

// Endpoint para obtener una imagen aleatoria
app.get('/api/random-image', (req, res) => {
  const folderPath = path.join(__dirname, '..', 'public/images/Errors'); // ✅ Corregido

  try {
    const files = fs.readdirSync(folderPath);
    const images = files.filter(file => file.match(/\.(jpg|jpeg|png|gif)$/i));

    if (images.length === 0) {
      return res.status(404).json({ error: 'No se encontraron imágenes' });
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];
    const imageUrl = `${req.protocol}://${req.get('host')}/images/Errors/${randomImage}`;

    res.json({ imageUrl });
  } catch (err) {
    console.error('Error al obtener imagen aleatoria:', err);
    res.status(500).json({ error: 'Error al leer la carpeta de imágenes' });
  }
});

// Iniciar servidor
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
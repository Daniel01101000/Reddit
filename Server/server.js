const express = require('express');
const path = require('path');
const fs = require('fs');
const { getData } = require('../src/SolicitudApi/Data/getData.js');
const cors = require('cors');

const app = express();

// ✅ Lista de orígenes permitidos (incluye tu GitHub Pages y Render)
const allowedOrigins = [
  'http://localhost:3000',
  'https://daniel01101000.github.io',
  'https://reddit-3.onrender.com',
];

// ✅ Configuración de CORS segura y compatible con GitHub Pages
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  }
}));

// Middleware para JSON
app.use(express.json());

// ✅ Servir imágenes de errores
app.use('/images/Errors', express.static(path.join(__dirname, '..', 'public/images/Errors')));

// ✅ Servir contenido estático como el logo192.png y otros archivos públicos
app.use(express.static(path.join(__dirname, '..', 'public')));

// Puerto
const PORT = process.env.PORT || 5000;

// Endpoint: Obtener posts del subreddit
app.get('/api/posts', async (req, res) => {
  try {
    const subreddit = req.query.subreddit || 'EarthPorn';
    console.log(`📥 Solicitando posts de r/${subreddit}...`);

    const posts = await getData(subreddit);

    if (!posts || posts.length === 0) {
      throw new Error('No se encontraron publicaciones');
    }

    res.json(posts);
  } catch (error) {
    console.error('❌ Error obteniendo posts:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint: Imagen aleatoria
app.get('/api/random-image', (req, res) => {
  const folderPath = path.join(__dirname, '..', 'public/images/Errors');

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
    console.error('❌ Error al obtener imagen aleatoria:', err);
    res.status(500).json({ error: 'Error al leer la carpeta de imágenes' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
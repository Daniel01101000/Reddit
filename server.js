const express = require('express');
const path = require('path');
const fs = require('fs');
const { getData } = require('./src/SolicitudApi/Api3.js');

const app = express();

// Configura express para servir imágenes estáticas
app.use('/images', express.static(path.join(__dirname, 'reddit/public/images/Errors')));


// Función para obtener una imagen aleatoria de la carpeta Errors
function getRandomImage() {
  const folderPath = path.join(__dirname, './reddit/public/images/Errors'); // Ruta para la carpeta de imágenes 'Errors'

  try {
    const files = fs.readdirSync(folderPath); // Leemos los archivos de la carpeta

    const images = files.filter(file =>
      file.match(/\.(jpg|jpeg|png|gif)$/i) // Filtramos solo archivos de imagen
    );

    if (images.length === 0) {
      console.log('No se encontraron imágenes en la carpeta');
      return null;
    }

    const randomImage = images[Math.floor(Math.random() * images.length)]; // Seleccionamos una imagen aleatoria
    return `/images/Errors/${randomImage}`; // Devolvemos la URL relativa para acceder a la imagen
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

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, '../../../public/images/Errors');

function getRandomImage() {
  try {
    const files = fs.readdirSync(folderPath); // Usamos la versión síncrona para que la imagen se importe correctamente

    const images = files.filter(file =>
      file.match(/\.(jpg|jpeg|png|gif)$/i)
    );

    if (images.length === 0) {
      console.log('No se encontraron imágenes en la carpeta');
      return null;
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];
    // Retorna la URL relativa para que funcione en el frontend
    return `http://localhost:3000/images/Errors/${randomImage}`;
  } catch (err) {
    console.error('Error al leer la carpeta:', err);
    return null;
  }
}

module.exports = getRandomImage();
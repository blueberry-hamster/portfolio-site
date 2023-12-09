const sharp = require('sharp'); // Import sharp package for image transformation

const convertImageToJpeg = async (image_url) => {
  return await sharp({ uri: image_url })
    .jpeg()
    .toBuffer();
};

module.exports = convertImageToJpeg;
const axios = require('axios');

async function downloadImageFromUrl(url) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    if (response.status === 200) {
      return Buffer.from(response.data, 'binary');
    } else {
      throw new Error('Failed to download image');
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  downloadImageFromUrl,
};

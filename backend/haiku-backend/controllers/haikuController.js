// haikuController.js

const express = require('express');
const { Op } = require('sequelize');
const Haiku = require('../models/haikuModel');
const { downloadImageFromUrl } = require('../utils/imgDownloader');

const router = express.Router();

// Function to format haiku data
function formatHaikuData(haikuData) {
  return {
    haiku: haikuData.haiku,
    image: `data:image/jpeg;base64,${haikuData.image.toString('base64')}`,
    date: haikuData.createdAt
  };
}

// Create a haiku
router.post('/', async (req, res) => {
  try {
    const { haiku, image_url } = req.body;
    const transformedImageBuffer = await downloadImageFromUrl(image_url);
    const newHaiku = await Haiku.create({ haiku, transformedImageBuffer });
    res.json(newHaiku);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/// Get the newest haiku with image in the desired format
router.get('/newest', async (req, res) => {
  try {
    // Find the newest haiku with the latest timestamp
    const newestHaiku = await Haiku.findOne({
      order: [['createdAt', 'DESC']], // Order by createdAt in descending order (latest first)
    });

    if (!newestHaiku) {
      res.status(404).json({ error: 'No haiku found' });
      return;
    }

    res.json(formatHaikuData(newestHaiku));
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the newest haiku' });
  }
});


// Get haikus on a specific date
// ex "/haikus/2023-12-08"
router.get('/:date', async (req, res) => {
  try {
    const { date } = req.params;

    // Assuming the date format is 'YYYY-MM-DD'
    const haikus = await Haiku.findAll({
      where: {
        createdAt: {
          [Op.gte]: new Date(date), // Greater than or equal to the start of the date
          [Op.lt]: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000), // Less than the start of the next day
        },
      },
    });

    // Format each haiku and return as an array
    const formattedHaikus = haikus.map((haikuData) => formatHaikuData(haikuData));

    res.json({ haikus: formattedHaikus });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching haikus' });
  }
});

module.exports = router;

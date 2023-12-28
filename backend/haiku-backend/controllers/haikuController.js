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

// Get today's haiku with image in the desired format
router.get('/today', async (req, res) => {
  try {
    // Get the current date in 'YYYY-MM-DD' format
    const currentDate = new Date().toISOString().split('T')[0];

    // Find the haiku for today
    const todayHaiku = await Haiku.findOne({
      where: {
        createdAt: {
          [Op.gte]: new Date(currentDate), // Greater than or equal to the start of the date
          [Op.lt]: new Date(currentDate + 'T23:59:59.999Z'), // Less than the end of the date
        },
      },
    });

    if (!todayHaiku) {
      res.status(404).json({ error: 'No haiku found for today' });
      return;
    }

    res.json(formatHaikuData(todayHaiku));
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching today\'s haiku' });
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

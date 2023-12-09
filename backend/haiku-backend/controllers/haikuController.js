// haikuController.js

const express = require('express');
const { Op } = require('sequelize');
const Haiku = require('../models/haikuModel');
const convertImageToJpeg = require('./imageConverter');

const router = express.Router();

// Create a haiku
router.post('/', async (req, res) => {
  try {
    const { haiku, image_url } = req.body;
    const transformedImageBuffer = convertImageToJpeg(image_url);
    const newHaiku = await Haiku.create({ haiku, transformedImageBuffer });
    res.json(newHaiku);
  } catch (error) {
    res.status(500).json({ error: error.message });
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

    res.json({ haikus });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching haikus' });
  }
});

module.exports = router;

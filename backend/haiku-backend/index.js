const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const app = express();
const port = 3000;

// Create a Sequelize instance
const sequelize = new Sequelize('haiku_db', process.env.DB_USER, process.env.DB_PASS, {
  host: 'localhost',
  dialect: 'postgres',
});

// Define a model
const Haiku = sequelize.define('haiku', {
  haiku: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// Test the connection and initialize database
sequelize.sync({ force: true }) // Use { force: true } to drop tables and recreate on every restart (for testing purposes)
  .then(async () => {
    console.log('Connection has been established successfully.');

    // Add a test haiku on initialization
    const testHaiku = 'This is a test haiku';
    const testImageUrl = 'https://example.com/test_image.jpg';
    const newHaiku = await Haiku.create({ haiku: testHaiku, image_url: testImageUrl });

    // Log the added haiku to the console
    console.log('Added test haiku:', newHaiku.toJSON());
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Test route
app.get('/', (req, res) => {
  res.send('Welcome to the Haiku API!');
});

// Create a haiku
app.post('/haikus', async (req, res) => {
  try {
    const { haiku, image_url } = req.body;
    const newHaiku = await Haiku.create({ haiku, image_url });
    res.json(newHaiku);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

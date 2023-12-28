const { generateHaiku, generateImage } = require('../services/openAIHaikuService');
const schedule = require('node-schedule');
const Haiku = require('../models/haikuModel');
const { downloadImageFromUrl } = require('./imgDownloader');

// Function to run at midnight
const generateHaikuAndImage = async () => {
  try {

    // Generate the haiku
    const generatedHaiku = await generateHaiku();
    console.log('Generated Haiku:', generatedHaiku);

    // Generate the image using the haiku
    const generatedImage = await generateImage(generatedHaiku);
    console.log('Generated Image:', generatedImage);

    // Download the image with axios
    const transformedImageBuffer = await downloadImageFromUrl(generatedImage);
    console.log('Transformed Image:', transformedImageBuffer);

    // Save the generated haiku and transformed image to the database using Sequelize
    const createdHaiku = await Haiku.create({
      haiku: generatedHaiku,
      image: transformedImageBuffer, // Save the transformed image buffer
    });
    console.log('Saved to DB:', createdHaiku.toJSON());

  } catch (error) {
    console.error('Error generating haiku and image:', error);
    // Handle errors appropriately, e.g., retry or notify system admin
  }
};
// generateHaikuAndImage()

// Schedule the function to run at midnight
const midnightJob = schedule.scheduleJob('0 0 * * *', () => {
  generateHaikuAndImage();
});

module.exports = midnightJob;

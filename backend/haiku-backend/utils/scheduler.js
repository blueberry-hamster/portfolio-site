const { generateHaiku, generateImage } = require('../services/openAIHaikuService');
const schedule = require('node-schedule');
const Haiku = require('../models/haikuModel');
const { downloadImageFromUrl } = require('./imgDownloader');

// Function to run at midnight
const generateHaikuAndImage = async () => {
  try {
    // Generate the haiku
    const generatedHaiku = "Silent, still mountain,<br />Majestic peak, draped in mist,<br />Nature's tranquil gift.";
    console.log('Generated Haiku:', generatedHaiku);

    // Generate the image using the haiku
    const generatedImage = "https://t3.ftcdn.net/jpg/03/48/41/74/360_F_348417496_KaqWHc1VR5XnK4uBxY7ObsYxQ4z29IRJ.jpg";
    console.log('Generated Image:', generatedImage);

    // // Generate the haiku
    // const generatedHaiku = await generateHaiku();
    // console.log('Generated Haiku:', generatedHaiku);

    // // Generate the image using the haiku
    // const generatedImage = await generateImage(generatedHaiku);
    // console.log('Generated Image:', generatedImage);

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


async function testHaikuAccess() {
  try {
    const generatedImage = "https://t3.ftcdn.net/jpg/03/48/41/74/360_F_348417496_KaqWHc1VR5XnK4uBxY7ObsYxQ4z29IRJ.jpg";
    // Download the image with axios
    const transformedImageBuffer = await downloadImageFromUrl(generatedImage);
    console.log('Transformed Image:', transformedImageBuffer);
    
    // Fetch all haikus
    const haikus = await Haiku.findAll();
    console.log('Fetched Haikus:', haikus);

    // Create a new haiku record
    const newHaiku = await Haiku.create({
      haiku: 'Sample Haiku',
      image: transformedImageBuffer, 
    });
    console.log('Created Haiku:', newHaiku.toJSON());
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function to test Haiku access
testHaikuAccess();


// Schedule the function to run at midnight
// const midnightJob = schedule.scheduleJob('0 0 * * *', () => {
const midnightJob = schedule.scheduleJob('* * * * *', () => {
  // generateHaikuAndImage();
  testHaikuAccess();
});

module.exports = midnightJob;

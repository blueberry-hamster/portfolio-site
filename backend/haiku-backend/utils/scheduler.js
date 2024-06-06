const {
  generateHaiku,
  generateImage,
} = require("../services/openAIHaikuService");
const schedule = require("node-schedule");
const moment = require("moment-timezone");
const Haiku = require("../models/haikuModel");
const { downloadImageFromUrl } = require("./imgDownloader");
const { Op } = require("sequelize");

// Function to generate haiku and image and save to database
const generateHaikuAndImage = async (date = new Date()) => {
  try {
    const generatedHaiku = await generateHaiku();
    console.log("Generated Haiku:", generatedHaiku);

    const generatedImage = await generateImage(generatedHaiku);
    console.log("Generated Image:", generatedImage);

    const transformedImageBuffer = await downloadImageFromUrl(generatedImage);
    console.log("Transformed Image:", transformedImageBuffer);

    const createdHaiku = await Haiku.create({
      haiku: generatedHaiku,
      image: transformedImageBuffer,
      createdAt: date, // Save with the specified date
      updatedAt: date,
    });
    console.log("Saved to DB:", createdHaiku.toJSON());
  } catch (error) {
    console.error("Error generating haiku and image:", error);
  }
};

// Function to schedule a job in a specific timezone
const scheduleJobInTimeZone = (cronExpression, timezone, jobFunction) => {
  return schedule.scheduleJob(
    { tz: timezone, rule: cronExpression },
    jobFunction
  );
};

// Schedule the function to run at midnight Pacific Time
const midnightJob = scheduleJobInTimeZone(
  "0 0 * * *",
  "America/Los_Angeles",
  generateHaikuAndImage
);

// Function to generate haikus for missing dates
const generateMissingHaikus = async () => {
  try {
    const today = new Date();
    const startDate = new Date("2023-12-29");
    let missingHaikusCount = 0;

    for (
      let d = new Date(today);
      d >= startDate && missingHaikusCount < 3;
      d.setDate(d.getDate() - 1)
    ) {
      const haiku = await Haiku.findOne({
        where: {
          createdAt: {
            [Op.between]: [
              new Date(d.setHours(0, 0, 0, 0)),
              new Date(d.setHours(23, 59, 59, 999)),
            ],
          },
        },
      });

      if (!haiku) {
        await generateHaikuAndImage(new Date(d));
        missingHaikusCount++;
      }
    }
  } catch (error) {
    console.error("Error generating missing haikus:", error);
  }
};

// Schedule to run generateMissingHaikus every 10 days at midnight Pacific Time
const generateMissingHaikusJob = scheduleJobInTimeZone(
  "0 0 */10 * *",
  "America/Los_Angeles",
  generateMissingHaikus
);

// Export functions and jobs
module.exports = {
  midnightJob,
  generateMissingHaikusJob,
};

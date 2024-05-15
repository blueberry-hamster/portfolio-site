const OpenAI = require("openai");
require("dotenv").config();
const { getRandomHaikuTheme } = require("./haikuThemes"); // Make sure the path is correct

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateHaiku = async () => {
  // Get a random theme for the haiku
  const theme = getRandomHaikuTheme();
  console.log("Theme: ${theme}");

  // Adjusted prompt to include the theme
  const prompt = `Create a haiku that captures the essence of "${theme}". The haiku should evoke emotions and have the power to stir and move people’s soul. Use vivid and powerful words, yet ensure they are gentle and balanced. Write with grace.`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a masterful poet skilled in creating haikus.",
        },
        { role: "user", content: prompt },
      ],
      model: "gpt-4",
    });

    return completion.choices[0].message.content.replace(/\n/g, "<br />");
  } catch (error) {
    console.error("Error generating haiku:", error);
    throw error;
  }
};

const generateImage = async (haikuText) => {
  const prompt = `Paint a traditional minimal elegant beautiful awe-inspiring captivating peaceful classic historical asian oriental watercolor wet translucent look. It should look museum quality. Make sure it evokes the imagery, mood, and color scheme of this beautiful scene: ${haikuText} not cartoony not funny not modern not digital not sharp not blocky no inkspots pure landscape`;

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
    });

    return response.data[0].url;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};

module.exports = {
  generateHaiku,
  generateImage,
};

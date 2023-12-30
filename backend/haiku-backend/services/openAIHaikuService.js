const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const generateHaiku = async () => {
  const prompt = "Generate an elegant haiku about a natural landscape. Make sure to use alliteration sparingly, but do not repeat words or similar words. Double check that all the lines are cohesive in painting the picture of a single landscape. Make sure the poem makes sense";

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a masterful poet.' },
        { role: 'user', content: prompt },
      ],
      model: 'gpt-3.5-turbo',
    });

    return completion.choices[0].message.content.replace(/\n/g, '<br />');

  } catch (error) {
    console.error('Error generating haiku:', error);
    throw error;
  }
};

const generateImage = async (haikuText) => {
  const prompt = `Generate a minimalistic elegant beautiful peaceful traditional classic historical asian watercolor wet look. It should look museum quality. Make sure it evokes the imagery, mood, and color scheme of this beautiful landscape: ${haikuText} not cartoony not funny not modern not digital not sharp not svg no inkspots no text`;

  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
    });

    return response.data[0].url;

  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};

module.exports = {
  generateHaiku,
  generateImage,
};

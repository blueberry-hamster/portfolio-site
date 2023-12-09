const express = require('express');
const haikuController = require('./controllers/haikuController');
const midnightJob = require('./utils/scheduler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize routes
app.use('/haikus', haikuController);

// Use the scheduled job
midnightJob;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

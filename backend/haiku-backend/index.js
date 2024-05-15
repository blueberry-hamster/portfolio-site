const express = require('express');
const haikuController = require('./controllers/haikuController');
const midnightJob = require('./utils/scheduler');
const cors = require('cors');

const app = express();
const backendPort = process.env.PORT || 3307; // Use the correct backend port
const frontendPort = 3000; // Specify the frontend port explicitly

const frontendOrigin = `http://localhost:${frontendPort}`; // Construct the frontend origin URL

app.use(cors({ origin: frontendOrigin })); // Allow requests from the frontend origin
app.use(express.json());

// Initialize routes
app.use('/haikus', haikuController);

// Use the scheduled job
midnightJob;

app.listen(backendPort, () => {
  console.log(`Server is running on port ${backendPort} :)`);
});

const express = require("express");
const path = require("path");
const haikuController = require("./controllers/haikuController");
const midnightJob = require("./utils/scheduler");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3307; // Use the correct port for deployment

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:3000"; // Use environment variable for frontend origin

app.use(cors({ origin: frontendOrigin })); // Allow requests from the frontend origin
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../../frontend/build")));

// Initialize routes
app.use("/haikus", haikuController);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/build/index.html"));
});

// Use the scheduled job
midnightJob;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} :)`);
});

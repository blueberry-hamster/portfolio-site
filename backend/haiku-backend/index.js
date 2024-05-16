const express = require("express");
const path = require("path");
const haikuController = require("./controllers/haikuController");
const { midnightJob, generateMissingHaikusJob } = require("./utils/scheduler");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3307; // Use the correct port for deployment

// Force HTTPS middleware
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.hostname}${req.url}`);
  }
  next();
});

// Update CORS to allow requests from jianifan.com
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://jianifan.com",
      "https://www.jianifan.com",
    ],
  })
);
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
generateMissingHaikusJob;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} :)`);
});

const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

// Root route
app.get("/", (req, res) => {
  res.send("Hello from my Node.js app 🚀");
});

// Fetch a joke from an API
app.get("/joke", async (req, res) => {
  try {
    const response = await axios.get(
      "https://official-joke-api.appspot.com/random_joke"
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Failed to fetch a joke 😅");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Configure CORS to allow requests from both localhost:5173 and the Vercel app
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Allow requests from your local development environment
      "https://ak-auto-s-empire-alva.vercel.app", // Allow requests from the Vercel app
    ],
    methods: ["GET", "POST"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials if needed
  })
);

// API endpoint to fetch listings
app.get("/api/listings", async (req, res) => {
  const API_KEY = "LOGIN_FOR_FREE_API_KEY"; // Replace with your actual API key
  const url = `https://auto.dev/api/listings?apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data); // Send the fetched data as a JSON response
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Failed to fetch data" }); // Send an error response
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});

// Enable ES6 imports by setting "type": "module" in package.json

import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only this origin
  })
);

// Root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// API route to fetch listings
app.get("/api/listings", async (req, res) => {
  const API_KEY = "LOGIN_FOR_FREE_API_KEY"; // Replace with your actual API key
  const url = `https://auto.dev/api/listings?apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});

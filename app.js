const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors"); 
const app = express();
const PORT = 3000;

app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.use(
  cors({
    origin: "http://localhost:5173", // Allow only this origin
  })
);

app.get("/api/listings", async (req, res) => {
  const API_KEY = "LOGIN_FOR_FREE_API_KEY";
  const url = `https://auto.dev/api/listings?apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});

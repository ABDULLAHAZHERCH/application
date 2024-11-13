const express = require("express");
const https = require("https");
const cors = require("cors");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const products = require("./routes/products");
const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

require("dotenv").config();

let db = [];

app.use(express.json());
app.use(cors());
app.use("/auth", auth);
app.use("/products", products);

app.use(
  cors({
    origin: "https://application-6vtbbnr8w-chaudharys-projects.vercel.app/",
  })
);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

app.get("/weather", (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ message: "City is required" });
  }
  const url = `/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=metric`;
  https
    .get({ hostname: BASE_URL, path: url, method: "GET" }, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        if (response.statusCode === 200) {
          const weatherData = JSON.parse(data);
          return res.json({
            city: weatherData.name,
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description,
            humidity: weatherData.main.humidity,
            wind_speed: weatherData.wind.speed,
          });
        } else {
          return res
            .status(500)
            .json({ message: "Error fetching weather data" });
        }
      });
    })
    .on("error", (error) => {
      console.error(error);
      return res.status(500).json({ message: "Error fetching weather data" });
    });
});

app.get("/data", (req, res) => {
  res.json(db);
});

app.post("/data", (req, res) => {
  const { name, age } = req.body;

  if (!name || !age) {
    return res.status(400).json({ message: "Name and age are required" });
  }

  const newRecord = { id: db.length + 1, name, age };
  db.push(newRecord);
  res.status(201).json(newRecord);
});

app.put("/data/:id", (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;

  const record = db.find((record) => record.id === parseInt(id));
  if (!record) {
    return res.status(404).json({ message: "Record not found" });
  }

  if (name) record.name = name;
  if (age) record.age = age;

  res.json(record);
});

app.delete("/data/:id", (req, res) => {
  const { id } = req.params;

  const index = db.findIndex((record) => record.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ message: "Record not found" });
  }

  const deletedRecord = db.splice(index, 1);
  res.json(deletedRecord);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

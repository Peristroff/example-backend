const express = require('express');
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const bcrypt = require("bcrypt")

const url = "mongodb://127.0.0.1:27017"
const port = 5001;

// Database connection
mongoose.connect(url)
  .then(() => console.log("Mongoose has connected to MongoDB!"))
  .catch(err => console.error("MongoDB connection error:", err));

// Users routes
const userRoutes = require("./src/routes/UserRoutes")
app.use("/users", userRoutes)
const apis = require("./src/routes/PictureRoutes")
app.use("/api/", apis)

// Test endpoint
app.get("/", (req, res) => {
  res.send({ status: "Started" })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
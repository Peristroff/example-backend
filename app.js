const express = require('express');
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const bcrypt = require("bcrypt")

const url = "mongodb://127.0.0.1:27017"
const port = 5001;

mongoose.connect(url)
  .then(() => console.log("Mongoose has connected to MongoDB!"))
  .catch(err => console.error("MongoDB connection error:", err));

require("./UserDetails")
const User = mongoose.model("UserInfo");
console.log(User)

app.get("/", (req, res) => {
  res.send({ status: "Started" })
})

app.post("/register", async (req, res) => {
  const { name, surname, email, password } = req.body;

  const oldUser = await User.findOne({ email: email });

  if (oldUser) {
    return res.send({ status: "error", error: "User already exists" });
  }

  try {
    await User.create({
      name: name,
      surname: surname,
      email: email,
      password: password
    })
    res.send({ status: "ok", data: "User registered successfully" });
  } catch (error) {
    return res.status(400).send({ error: "Error registering user", details: error });
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
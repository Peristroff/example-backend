const express = require("express");
const router = express.Router();
const User = require("../models/UserDetails");

router.post("/register", async (req, res) => {
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
      password: password,
    });
    res.send({ status: "ok", data: "User registered successfully" });
  } catch (error) {
    return res
      .status(400)
      .send({ error: "Error registering user", details: error });
  }
});

module.exports = router;

// https://www.npmjs.com/package/ftp
const ftp = require("ftp");
const express = require("express");
const router = express.Router();
// https://nodejs.org/api/path.html
const path = require("node:path");
const filesystem = require("fs");

const IP = "127.0.0.1";
const PORT = "3921";
const FTP_FOLDER_PATH = "/Files/images/Products";
const USER = "backend";
const PASSWORD = "bah";

const ftpConfig = {
  host: `${IP}`,
  port: `${PORT}`,
  user: `${USER}`,
  password: `${PASSWORD}`,
};

router.get("/images", (req, res) => {
  const client = new ftp();
  console.log("Connecting: " + JSON.stringify(ftpConfig));
  client.connect(ftpConfig);

  client.on("greeting", (msg) => console.log("Greeting:", msg));

  client.on("ready", function () {
    console.log("Checking files...");
    client.list(FTP_FOLDER_PATH, (err, list) => {
      if (err) {
        console.error("FTP list error: " + err);
        client.end();
        return res.status(500).json({
          error: "Error while listing FTP files.",
        });
      }
      const images = list.filter(
        (file) =>
          file.type === "-" && /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)
      ).map(file => IP + FTP_FOLDER_PATH + "/" + file.name)
      res.json(images)
      client.end()
    });
  });

  client.on("error", (err) => {
    console.error("FTP connection error: " + err);
    res.status(500).json({ error: "Failed to connect to FTP server." });
  });

  client.on("end", () => console.log("FTP connection ended"));

  client.on("close", () => console.log("FTP connection closed"));

  client.on("timeout", () => {
    console.error("FTP connection timed out");
    client.end();
  });

});

module.exports = router;

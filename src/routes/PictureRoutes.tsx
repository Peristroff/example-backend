// https://www.npmjs.com/package/ftp
const ftp = require("ftp");

// https://nodejs.org/api/path.html
const path = require("node:path");

const IP = "192.168.1.5";
const FPT_FOLDER_PATH = "/Files/images/Products";

const ftpConfig = {
  host: `${IP}`,
};

router.get("/api/images", (req, res) => {
  
});

const fs = require("fs");
const path = require("path");
const image = require("./images/image");
const encryption = require("./lib/encryption");

fs.writeFileSync(
  path.join(__dirname, "./images/encrypted-image.txt"),
  encryption.encrypt(image)
);

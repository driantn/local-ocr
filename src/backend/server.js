const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");

const fileAnalyser = require("./analyser");

const app = express();
const port = 3000;
const dump = `${path.resolve("dump")}`;

if (!fs.existsSync(dump)) {
  fs.mkdirSync(dump);
}

app.use(cors());
app.use(fileUpload());

app.use(express.static(path.resolve("src/frontend")));

app.post("/api/image", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  const file = req.files.image;
  console.log(file);
  const filePath = `${dump}/${file.name}`;

  file.mv(filePath, function (err) {
    if (err) return res.status(500).send(err);
    fileAnalyser(filePath).then((text) => {
      fs.unlinkSync(filePath);
      res.status(200).json({ data: text });
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

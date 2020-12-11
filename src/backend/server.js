const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");

const fileAnalyser = require("./analyser");

const app = express();
const port = 3000;

app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(express.static(path.resolve("src/frontend")));

app.post("/api/image", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  const file = req.files.image;
  fileAnalyser(file.tempFilePath).then((text) =>
    res.status(200).json({ data: text })
  );
  // res.status(200).json({ success: true });
  // res.redirect("/");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

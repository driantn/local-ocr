const { createWorker } = require("tesseract.js");

const worker = createWorker({
  logger: (m) => console.log(m),
});

const analyze = (file) => {
  return new Promise((resolve, reject) => {
    worker
      .load()
      .then(() => worker.loadLanguage("deu"))
      .then(() => worker.initialize("deu"))
      .then(() => {
        worker.recognize(file).then((data) => {
          const text = data.text;
          worker.terminate().then(resolve(text));
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = analyze;
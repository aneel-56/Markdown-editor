const express = require("express");
const app = express();
const fs = require("fs");
const { marked } = require("marked");



app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/:filename", (req, res) => {
  const filename = req.params.filename;
  const markdown = `./posts/${filename}.md`;
  fs.readFile(markdown, "utf-8", (err, data) => {
    if (err) {
      res.send("file not found");
    } else {
      const html = marked(data);
      res.send(html);
    }
  });
});

app.listen(3000, () => {
  console.log("blog server listening on port 3000!");
});

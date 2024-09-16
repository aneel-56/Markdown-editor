const express = require("express");
const { marked } = require("marked");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
fs.readdir("./posts", (err, files) => {
  if (err) {
    console.log(err.message);
    return;
  }
  files.forEach((file) => {
    const name = file.split(".")[0];
    const filePath = path.join(__dirname, "posts", file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const html = marked(fileContent);
    app.get("/${name}", (req, res) => {
      res.render("post", { title: name, content: html }); //render sends generated HTML as response
    });
  });
});
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

const express = require("express");
const path = require("path");
const app = express();
app.use(express.static("./dist/teste-angular"));
app.get("/*", (req, res) =>
  res.sendFile("index.html", { root: "dist/teste-angular/" })
);
app.listen(process.env.PORT || 8080);

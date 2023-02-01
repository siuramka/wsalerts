const express = require("express");
const config = require("./configs/config")
const path = require("path")
const PORT = config.PORT
const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/front'))


app.get("/tts", (req, res) => {
  res.render("index", {port: PORT})
});

module.exports = {
  app
}
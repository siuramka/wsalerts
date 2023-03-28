const express = require("express");
const path = require("path")
const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/front'))


app.get("/tts", (req: any, res: { render: (arg0: string) => void; }) => {
  res.render("index")
});

module.exports = {
  app
}
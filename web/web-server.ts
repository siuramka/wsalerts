const path = require("path")
import express from 'express';

export class App {
  public app: express.Application;
  
  constructor() {
    this.app = express()
    this.config()
    this.routing()
  }

  private config(): void {
    this.app.set('view engine', 'ejs');
    this.app.set('views', path.join(__dirname, '../front'))
  }

  private routing(): void {
    this.app.get("/tts", (req,res) => {
      res.render("index")
    });
  }
  public getApp() {
    return this.app;
  }
}

import http from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { App } from "../web/webServer";
import eventHandler from "../events/TtsEventHandler";
import { SocketEventHandler } from "../events/SocketEventHandler";
import { config } from "../configs/configs";
import express from "express";

export class Server {
  private server: http.Server;
  private io: SocketIOServer;
  private port: number;
  private app: App;
  private appSocket: any;
  private socketEventHandler: SocketEventHandler;

  constructor(port: number) {
    this.port = port;
    this.app = new App();
    this.appSocket = express()
    this.createServer();
    this.createSocket();
    this.setupEventHandler();
  }
  private setupEventHandler() {
    this.socketEventHandler = new SocketEventHandler(this.io);
  }

  private createServer(): void {
    this.server = http.createServer(this.appSocket);
  }

  // create socket server
  private createSocket(): void {
    this.io = new SocketIOServer(this.server, {  cors: {
      origin: "http://vps1604.redfoxcloud.com",
      methods: ["GET", "POST"]
    }});
  }

  public start(): void {
    this.app.getApp().listen(config.PORT, () =>
      console.log("Express is running on" + config.PORT)
    );
    this.server.listen(this.port, () => {
      console.log(`IO server running on port ${this.port}`);
    });
  }

  public getApp(): App {
    return this.app;
  }
}

import http from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { App } from "../web/webServer";
import eventHandler from "../events/TtsEventHandler";
import { SocketEventHandler } from "../events/SocketEventHandler";

export class Server {
  private server: http.Server;
  private io: SocketIOServer;
  private port: number;
  private app: App;
  private socketEventHandler: SocketEventHandler;

  constructor(port: number) {
    this.port = port;
    this.app = new App();
    this.createServer();
    this.createSocket();
    this.setupEventHandler();
    
  }
  private setupEventHandler() {
    this.socketEventHandler = new SocketEventHandler(this.io);
  }

  private createServer(): void {
    this.server = http.createServer(this.app.getApp());
  }

  private createSocket(): void {
    this.io = new SocketIOServer(this.server);
  }

  public start(): void {
    this.server.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  public getApp(): App {
    return this.app;
  }
}
import http from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { App } from "../web/webServer";

export class Server {
  private server: http.Server;
  private io: SocketIOServer;
  private port: number;
  private app: App;

  constructor(port: number) {
    this.port = port;
    this.app = new App();
    this.createServer();
    this.createSocket();
  }

  private createServer(): void {
    this.server = http.createServer(this.app.getApp());
  }

  private createSocket(): void {
    this.io = new SocketIOServer(this.server);
    this.io.on("connection", (socket: Socket) => {
      console.log("A client connected");
      socket.on("disconnect", () => {
        console.log("A client disconnected");
      });
    });
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

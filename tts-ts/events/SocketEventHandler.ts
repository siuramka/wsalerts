import { Server as SocketIOServer, Socket } from "socket.io";
import eventHandler from "./TtsEventHandler";

export class SocketEventHandler {
  private io: SocketIOServer;

  constructor(socketIo: SocketIOServer) {
    this.io = socketIo;
    this.initialize();
  }

  public initialize() {
    this.io.on("connection", (socket: Socket) => {
      console.log("A client connected");
      socket.on("disconnect", () => {
        console.log("A client disconnected");
      });
    });
    eventHandler.on("sendAudioUrl", (audioLink: any) => {
      this.io.emit("data", audioLink);
    });
    eventHandler.on("sendAudioBlob", (audioBlob: any) => {
      this.io.emit("data", audioBlob);
    });
  }
}

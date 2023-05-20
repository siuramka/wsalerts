import DatabaseConfig from "./database/DatabaseConfig";
import { Server } from "./sockets/ioClient";
import { TwitchClient } from "./twitch/twitchClient";

(async () => {
  const server = new Server(3333);
  await server.start();
  
  const client = new TwitchClient();
  await client.initialize();
  await client.connect();
})();

const db = DatabaseConfig.getInstance();

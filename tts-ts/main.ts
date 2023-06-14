import DatabaseConfig from "./database/DatabaseConfig";
import { Server } from "./sockets/Server";
import { TwitchClient } from "./twitch/twitchClient";
import { TwitchClientEventsHandler } from "./twitch/twitchClientEventsHandler";
import { config } from "./configs/configs"
(async () => {
  console.log(process.env.DATABASE_URL)
  const server = new Server(parseInt(config.SOCKET_PORT as string));
  await server.start();
  
  const client = new TwitchClient();
  await client.initialize();
  await client.connect();

  const handler = new TwitchClientEventsHandler();
  await handler.initialize(client);
})();
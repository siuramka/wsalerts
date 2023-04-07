import { Server } from "./sockets/io-client"
import { TwitchClient } from "./twitch/twitchClient"

const client = new TwitchClient();
client.connect()

const server = new Server(3333)
server.start()

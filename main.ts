import { Server } from "./sockets/io-client"

const server = new Server(3333)
server.start()
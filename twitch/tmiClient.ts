import tmi from "tmi.js";
import { config } from "../configs/config";

const OAUTH = config.OAUTH;
const USERNAME_OAUTH = config.USERNAME_OAUTH;
const CHANNEL = config.CHANNEL


const options: tmi.Options = {
  options: {
    debug: true
  },
  connection: {
    reconnect: true
  },
  identity: {
    username: USERNAME_OAUTH,
    password: OAUTH
  },
  channels: CHANNEL
};
export const client = new tmi.Client(options);
client.connect();

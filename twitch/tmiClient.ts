import tmi from "tmi.js";
const config = require("../configs/config");

const OAUTH = config.OAUTH;
const USERNAME_OAUTH = config.USERNAME_OAUTH;
const CHANNEL = config.CHANNEL;

const options = {
  options: {
    debug: false
  },
  connection: {
    reconnect: true
  },
  identity: {
    username: USERNAME_OAUTH,
    password: OAUTH
  },
  channels: [CHANNEL]
};
const client = new tmi.Client(options);
client.connect();

module.exports = {
    client
}
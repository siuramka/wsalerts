const tmi = require("tmi.js");
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

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
  
  client.on("chat", (channel, user, message, self) => {
    if (user.username === CHANNEL) {
      console.log(`${user.username}: ${message}`);
      eventEmitter.emit("botMessage", message);
    }
  });

module.exports = eventEmitter;
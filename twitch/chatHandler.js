const events = require("../events/eventsHandler")
const commandHandler = require("./commandHandler")
const tmi = require("./tmiClient")
const config = require("../configs/config")
const USERNAME_OAUTH = config.USERNAME_OAUTH
/*

function handleCommandTts(messageInfo) {
    const synthMessage = `${messageInfo.user} said. ${messageInfo.messageContent}`
    twitchClient.eventEmitter.emit("synthesizeAudio", synthMessage);
}

function parseChatCommandMessage(user, message) {
    const messageContent = message.split("!tts ")
    return { user, messageContent }
}
  Emits event when message is from user CHANNEL
*/

tmi.client.on("chat", (channel, user, message, self) => {
  console.log("chatting...")
  try {
    if (user.username === USERNAME_OAUTH) {
      console.log(`${user.username}: ${message}`);
      events.eventEmitter.emit("synthesizeAudio", message);
    }

    if(message.startsWith("!tts")) {
      const messageInfo = commandHandler.parseChatCommandMessage(user, message)
      commandHandler.handleCommandTts(messageInfo)
    }

  } catch (error) {
    console.log(`Error in chat parsing! => `)
    console.log(error)
  }
});

tmi.client.on("redeem", (channel, user, rewardType, messageTags, message) => {
  console.log(`${user} radeemed ${channel}, ${user}, ${rewardType}, ${JSON.stringify(messageTags)}, ${message}`)
  events.eventEmitter.emit("channelPointsRedeem", message);
});

// mariuspure radeemed #nidas, mariuspure, highlighted-message, {"badge-info":{"subscriber":"18"},"badges":{"moderator":"1","subscriber":"18"},"color":"#2E8B57","display-name":"mariuspure","emotes":null,"first-msg":false,"flags":null,"id":"38d27acb-5ad4-48d3-aa21-e781f202a5f5","mod":true,"msg-id":"highlighted-message","returning-chatter":false,"room-id":"138907338","subscriber":true,"tmi-sent-ts":"1675247657788","turbo":false,"user-id":"85157395","user-type":"mod","emotes-raw":null,"badge-info-raw":"subscriber/18","badges-raw":"moderator/1,subscriber/18","username":"mariuspure","message-type":"chat"}, gonna lose all my points
// {
//   "badge-info": {
//     "subscriber": "18"
//   },
//   "badges": {
//     "moderator": "1",
//     "subscriber": "18"
//   },
//   "color": "#2E8B57",
//   "display-name": "mariuspure",
//   "emotes": null,
//   "first-msg": false,
//   "flags": null,
//   "id": "38d27acb-5ad4-48d3-aa21-e781f202a5f5",
//   "mod": true,
//   "msg-id": "highlighted-message",
//   "returning-chatter": false,
//   "room-id": "138907338",
//   "subscriber": true,
//   "tmi-sent-ts": "1675247657788",
//   "turbo": false,
//   "user-id": "85157395",
//   "user-type": "mod",
//   "emotes-raw": null,
//   "badge-info-raw": "subscriber/18",
//   "badges-raw": "moderator/1,subscriber/18",
//   "username": "mariuspure",
//   "message-type": "chat"
// }

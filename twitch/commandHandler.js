const events = require("../events/eventsHandler")

function handleCommandTts(messageInfo) {
    const synthMessage = `${messageInfo.username} said. ${messageInfo.messageContent}`
    events.eventEmitter.emit("synthesizeAudio", synthMessage);
}

function parseChatCommandMessage(user, message) {
    const messageContent = message.split("!tts ")
    const username = user.username
    return { username, messageContent }
}

module.exports = {
    handleCommandTts, parseChatCommandMessage
}
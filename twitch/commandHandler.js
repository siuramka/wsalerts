const events = require("../events/eventsHandler")

function handleCommandTts(messageInfo) {
    const synthMessage = `${messageInfo.username} said. ${messageInfo.messageContent}`
    events.eventEmitter.emit("synthesizeAudio", synthMessage);
}

function handleCommandTtsv(messageInfo) {
    const synthMessage = `${messageInfo.username} said. ${messageInfo.messageContent}`
    const voice = messageInfo.voice
    events.eventEmitter.emit("synthesizeAudio", synthMessage, voice);
}

function handleCommandTts11(messageInfo) {
    const synthMessage = `${messageInfo.username} said. ${messageInfo.messageContent}`
    events.eventEmitter.emit("synthesizeAudio11", synthMessage);
}

function parseChatCommandMessageTts(user, message) {
    const messageContent = message.replace("!tts ","")
    const username = user.username
    return { username, messageContent }
}

function parseChatCommandMessageTtsv(user, message) {
    let messageContent = message.replace("!ttsv ","")
    const voice = messageContent.split(" ")[0]
    messageContent = messageContent.replace(`${voice} `,``)
    const username = user.username
    return { username, messageContent, voice }
}

module.exports = {
    handleCommandTts11, parseChatCommandMessageTts, parseChatCommandMessageTtsv, handleCommandTts, handleCommandTtsv
}
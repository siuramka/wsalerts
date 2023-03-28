import { eventEmitter } from "../events/eventsHandler";

export function handleCommandTts(messageInfo: any) {
    const synthMessage = `${messageInfo.username} said. ${messageInfo.messageContent}`
    eventEmitter.emit("synthesizeAudioUberduck", synthMessage);
}

export function handleCommandTtsv(messageInfo:any ) {
    const synthMessage = `${messageInfo.username} said. ${messageInfo.messageContent}`
    const voice = messageInfo.voice
    eventEmitter.emit("synthesizeAudioUberduck", synthMessage, voice);
}

export function handleCommandTts11(messageInfo: any) {
    const synthMessage = `${messageInfo.username} said. ${messageInfo.messageContent}`
    eventEmitter.emit("synthesizeAudio11", synthMessage);
}

export function parseChatCommandMessageTts(user: any, message: any) {
    const messageContent = message.replace("!tts ","")
    const username = user.username
    return { username, messageContent }
}

export function parseChatCommandMessageTtsv(user: any, message: any) {
    let messageContent = message.replace("!ttsv ","")
    const voice = messageContent.split(" ")[0]
    messageContent = messageContent.replace(`${voice} `,``)
    const username = user.username
    return { username, messageContent, voice }
}
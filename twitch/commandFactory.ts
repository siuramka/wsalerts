import { eventEmitter } from "../events/eventsHandler";
import tmi from "tmi.js";


interface Command {
    handle(): void;
    parse(user: tmi.ChatUserstate, message: string): void
}

/**
 * 
 * https://www.baeldung.com/java-replace-if-statements logic from here, factory class
 */

export type parsedCommand = {
    username: string | undefined
    messageContent: string
    voice: string | undefined
}

class TtsCommand implements Command {
    private _message: parsedCommand

    constructor(){
        const initData = {
            username: undefined,
            messageContent: "",
            voice: undefined   
        }
        this._message = initData
    }

    parse(user: tmi.ChatUserstate, message: string): void {
        this._message.messageContent = message.replace("!tts ","")
        this._message.username = user.username
        this._message.voice = undefined
    }

    handle(): void {
        const synthMessage = `${this._message.username} said. ${this._message.messageContent}`
        eventEmitter.emit("synthesizeAudioUberduck", synthMessage);
    }
}

export class CommandFactory {
    static commandMap: Map<string, Command>;
    //init
    static {
        this.commandMap = new Map<string, Command>()
        this.commandMap.set("!tts", new TtsCommand)
    }

    public static getOperation(commandName: string): Command | undefined {
        return this.commandMap.get(commandName);
    }
}




class commandHandler {
    
    public static handleCommandTtsv(messageInfo:any ) {
        const synthMessage = `${messageInfo.username} said. ${messageInfo.messageContent}`
        const voice = messageInfo.voice
        eventEmitter.emit("synthesizeAudioUberduck", synthMessage, voice);
    }
    
    public static handleCommandTts11(messageInfo: any) {
        const synthMessage = `${messageInfo.username} said. ${messageInfo.messageContent}`
        eventEmitter.emit("synthesizeAudio11", synthMessage);
    }
    
    public static parseChatCommandMessageTts(user: any, message: any) {
        const messageContent = message.replace("!tts ","")
        const username = user.username
        return { username, messageContent }
    }
    
    public static parseChatCommandMessageTtsv(user: any, message: any) {
        let messageContent = message.replace("!ttsv ","")
        const voice = messageContent.split(" ")[0]
        messageContent = messageContent.replace(`${voice} `,``)
        const username = user.username
        return { username, messageContent, voice }
    }
}
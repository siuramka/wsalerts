import EventsHandler from "../events/eventHandler";
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
        EventsHandler.emit("synthesizeAudioUberduck", synthMessage);
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
        EventsHandler.emit("synthesizeAudioUberduck", synthMessage, voice);
    }
    
    public static handleCommandTts11(messageInfo: any) {
        const synthMessage = `${messageInfo.username} said. ${messageInfo.messageContent}`
        EventsHandler.emit("synthesizeAudio11", synthMessage);
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


//Channel points 
// tmi.client.on("redeem", (channel, user, rewardType, messageTags, message) => {
//   console.log(`${user} radeemed ${channel}, ${user}, ${rewardType}, ${JSON.stringify(messageTags)}, ${message}`)
//   events.eventEmitter.emit("channelPointsRedeem", message);
// });

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

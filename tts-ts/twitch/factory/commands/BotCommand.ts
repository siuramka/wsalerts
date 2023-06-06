import EventsHandler from "../../../events/TtsEventHandler";
import { Command } from "../../types/contracts/Command";
import { parsedCommand } from "../../types/parsedCommand";
import tmi from "tmi.js";

export class BotCommand implements Command {
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
        this.handle();
    }

    private handle(): void {
        const synthMessage = `${this._message.username} said. ${this._message.messageContent}`
        EventsHandler.emit("synthesizeAudioUberduck", synthMessage);
    }
}
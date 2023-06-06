import EventsHandler from "../../../events/TtsEventHandler";
import tmi from "tmi.js";
import { Command } from "../../types/contracts/Command";
import { parsedCommand } from "../commandFactory";

export class TtsCommand implements Command {
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
        this.handle()
    }

    private handle(): void {
        const synthMessage = `${this._message.username} said. ${this._message.messageContent}`
        EventsHandler.emit("synthesizeUberduck", synthMessage);
    }
}
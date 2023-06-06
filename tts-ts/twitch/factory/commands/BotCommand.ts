import EventsHandler from "../../../events/TtsEventHandler";
import { ICommand } from "../../types/contracts/ICommand";
import { parsedCommand } from "../../types/parsedCommand";
import tmi from "tmi.js";
import { BaseCommand } from "./BaseCommand";

export class BotCommand extends BaseCommand implements ICommand {
    constructor() {
        super()
    }

    parse(user: tmi.ChatUserstate, message: string): void {
        this._message.messageContent = message.replace("!tts ","")
        this._message.username = user.username
        this._message.voice = undefined
        this.handle();
    }

    private handle(): void {
        const synthMessage = `${this._message.username} said. ${this._message.messageContent}`
        EventsHandler.emit("synthesizeElevenlabs", synthMessage);
    }
}
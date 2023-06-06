import EventsHandler from "../../../events/TtsEventHandler";
import { ICommand } from "../../types/contracts/ICommand";
import { parsedCommand } from "../../types/parsedCommand";
import tmi from "tmi.js";
import { BaseCommand } from "./BaseCommand";
import { ProviderConfig } from "../../../configs/ProviderConfig";

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

    private async handle() {
        const synthMessage = `${this._message.username} said. ${this._message.messageContent}`
        const provider = await ProviderConfig.getProvider();
        EventsHandler.emit(`synthesize${provider}`, synthMessage);
    }
}
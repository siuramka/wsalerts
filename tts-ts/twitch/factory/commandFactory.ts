import { TtsCommand } from "./commands/TtsCommand";
import { BotCommand } from "./commands/BotCommand";
import { BaseCommand } from "./commands/BaseCommand";
import { ICommand } from "../types/contracts/ICommand";

export class CommandFactory {
    static commandMap: Map<string, ICommand>;

    static {
        this.commandMap = new Map<string, ICommand>()
        this.commandMap.set("!tts", new TtsCommand)
        this.commandMap.set("!BotCommand", new BotCommand)
    }

    public static getOperation(commandName: string): ICommand | undefined {
        return this.commandMap.get(commandName);
    }
}

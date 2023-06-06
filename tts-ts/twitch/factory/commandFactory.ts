import { parsedCommand } from "../types/parsedCommand";
import { TtsCommand } from "./commands/TtsCommand";
import { Command } from "../types/contracts/Command";
import { BotCommand } from "./commands/BotCommand";

export class CommandFactory {
    static commandMap: Map<string, Command>;

    static {
        this.commandMap = new Map<string, Command>()
        this.commandMap.set("!tts", new TtsCommand)
        this.commandMap.set("!BotCommand", new BotCommand)
    }

    public static getOperation(commandName: string): Command | undefined {
        return this.commandMap.get(commandName);
    }
}

export { parsedCommand };
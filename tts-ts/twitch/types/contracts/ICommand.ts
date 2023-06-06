import tmi from "tmi.js";

export interface ICommand {
    parse(user: tmi.ChatUserstate, message: string): void
}

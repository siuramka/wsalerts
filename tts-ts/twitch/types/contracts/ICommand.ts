import tmi from "tmi.js";

export interface ICommand {
    parse(user: tmi.ChatUserstate, message: string): Promise<void | string>
}

import tmi from "tmi.js";

export interface Command {
    parse(user: tmi.ChatUserstate, message: string): void
}
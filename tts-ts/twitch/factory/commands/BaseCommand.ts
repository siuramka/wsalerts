import { parsedCommand } from "../commandFactory"
import tmi from "tmi.js";

export abstract class BaseCommand {
    protected _message: parsedCommand
    constructor(){
        const initData = {
            username: undefined,
            messageContent: "",
            voice: undefined   
        }
        this._message = initData
    }
}
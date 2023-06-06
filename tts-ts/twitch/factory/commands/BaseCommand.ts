import tmi from "tmi.js";
import { parsedCommand } from "../../types/parsedCommand";

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
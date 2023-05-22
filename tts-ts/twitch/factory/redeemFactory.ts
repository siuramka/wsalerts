import EventsHandler from "../../events/TtsEventHandler";
import tmi from "tmi.js";

interface IRedeem {
    handle(): void
}

/**
 * 
 * https://www.baeldung.com/java-replace-if-statements logic from here, factory class
 */

export type messageTags = {
}

class Redeem5k implements IRedeem {
    private _message: any

    constructor(){
        const initData = {
            username: undefined,
            messageContent: "",
            voice: undefined   
        }
        this._message = initData
    }

    handle(): void {
        console.log("fired redemption bruh")
    }
}

export class RedeemFactory {
    static redeemMap: Map<string, IRedeem>;
    //init
    static {
        this.redeemMap = new Map<string, IRedeem>()
        ///8778cdd5-77a9-496f-b726-acf22b9adfdd highligh message bruhg
        this.redeemMap.set("5c16fe15-1d28-44f3-a792-850f9c334688", new Redeem5k)
    }

    public static getOperation(redeemId: any): IRedeem | undefined {
        return this.redeemMap.get(redeemId);
    }
}

//Channel points 
// tmi.client.on("redeem", (channel, user, rewardType, messageTags, message) => {
//   console.log(`${user} radeemed ${channel}, ${user}, ${rewardType}, ${JSON.stringify(messageTags)}, ${message}`)
//   events.eventEmitter.emit("channelPointsRedeem", message);
// });

// mariuspure radeemed #nidas, mariuspure, highlighted-message, {"badge-info":{"subscriber":"18"},"badges":{"moderator":"1","subscriber":"18"},"color":"#2E8B57","display-name":"mariuspure","emotes":null,"first-msg":false,"flags":null,"id":"38d27acb-5ad4-48d3-aa21-e781f202a5f5","mod":true,"msg-id":"highlighted-message","returning-chatter":false,"room-id":"138907338","subscriber":true,"tmi-sent-ts":"1675247657788","turbo":false,"user-id":"85157395","user-type":"mod","emotes-raw":null,"badge-info-raw":"subscriber/18","badges-raw":"moderator/1,subscriber/18","username":"mariuspure","message-type":"chat"}, gonna lose all my points
// {
//   "badge-info": {
//     "subscriber": "18"
//   },
//   "badges": {
//     "moderator": "1",
//     "subscriber": "18"
//   },
//   "color": "#2E8B57",
//   "display-name": "mariuspure",
//   "emotes": null,
//   "first-msg": false,
//   "flags": null,
//   "id": "asdasdasdasdsa",
//   "mod": true,
//   "msg-id": "highlighted-message",
//   "returning-chatter": false,
//   "room-id": "138907338",
//   "subscriber": true,
//   "tmi-sent-ts": "1675247657788",
//   "turbo": false,
//   "user-id": "85157395",
//   "user-type": "mod",
//   "emotes-raw": null,
//   "badge-info-raw": "subscriber/18",
//   "badges-raw": "moderator/1,subscriber/18",
//   "username": "mariuspure",
//   "message-type": "chat"
// }

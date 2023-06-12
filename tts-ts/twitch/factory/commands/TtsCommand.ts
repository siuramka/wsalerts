import EventsHandler from "../../../events/TtsEventHandler";
import tmi from "tmi.js";
import { ICommand } from "../../types/contracts/ICommand";
import { ProviderConfig } from "../../../configs/ProviderConfig";
import { BaseCommand } from "./BaseCommand";

export class TtsCommand extends BaseCommand implements ICommand {
  constructor() {
    super();
  }

  async parse(user: tmi.ChatUserstate, message: string): Promise<void> {
    this._message.messageContent = message.replace("!tts ", "");
    this._message.username = user.username;
    this._message.voice = undefined;
    await this.handle();
  }

  private async handle() {
    const synthMessage = `${this._message.username} said. ${this._message.messageContent}`;
    const provider = await ProviderConfig.getProvider();
    EventsHandler.emit(`synthesize${provider}`, synthMessage);
  }
}

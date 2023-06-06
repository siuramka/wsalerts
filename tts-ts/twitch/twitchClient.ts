import tmi from "tmi.js";
import { TwitchSettingRepository } from "../database/repository/TwitchSetting/TwitchSettingRepository";

interface ITwitchClient {
  getOptions: () => tmi.Options;
  connect: () => Promise<[string, number]>;
  disconnect: () => Promise<[string, number]>;
  reconnect: () => Promise<string>;
  initialize: () => void;
  getTmiClient: () => tmi.Client;
}


export class TwitchClient implements ITwitchClient {
  private client: tmi.Client;
  private options: tmi.Options;
  private twitchSettingRepository: TwitchSettingRepository;

  public async initialize() {
    this.twitchSettingRepository = new TwitchSettingRepository();
    const twitchSetting = await this.twitchSettingRepository.getFirst();

    const clientOptions: tmi.Options = {
      options: {
        debug: true,
      },
      connection: {
        reconnect: true,
      },
      identity: {
        username: twitchSetting?.botUsername,
        password: twitchSetting?.botOauth,
      },
      channels: twitchSetting?.twitchAuthorizedUsers.map((x) => x.username),
    };

    this.options = clientOptions;
    this.client = this.initClient(this.options);
  }

  private initClient(options: tmi.Options): tmi.Client {
    return new tmi.Client(options);
  }

  public async connect(): Promise<[string, number]> {
    return await this.client.connect();
  }

  public async disconnect(): Promise<[string, number]> {
    return await this.client.disconnect();
  }

  public async reconnect(): Promise<string> {
    await this.disconnect();
    await this.connect();
    return "Reconnected to twitch client!";
  }

  public getOptions(): tmi.Options {
    return this.options;
  }
  //this doesn't seem right
  public getTmiClient(): tmi.Client {
    return this.client;
  }
}
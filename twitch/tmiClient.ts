import tmi from "tmi.js";
import { config } from "../configs/config";

interface ITwitchClient {
  getOptions: () => tmi.Options
  connect: () => Promise<void> 
  disconnect: () => Promise<void> 
  reconnect: () => Promise<void> 
  updateOptions: (options: tmi.Options) => void
}

interface IConfigTwitchClient {

}

export class TwitchClient implements ITwitchClient {
  private client: tmi.Client
  private options: tmi.Options

  constructor() {
    // Could insert config into params
    this.setupOptions()
    this.client = this.initClient(this.getOptions())
  }

  private initClient(options: tmi.Options): tmi.Client {
    return new tmi.Client(options)
  }

  public async connect(): Promise<void> {
    await this.client.connect();
  }

  public async disconnect(): Promise<void>  {
    await this.client.disconnect()
  }

  public async reconnect(): Promise<void>  {
    await this.disconnect();
    await this.connect();
  }

  public updateOptions(options: tmi.Options): void {
    this.options = options
  }

  /**
   * I don't like this approach, need to implement a better way of utilizing the config class, then update where the class is used.
   */
  private setupOptions(): void {
    const OAUTH = config.OAUTH;
    const USERNAME_OAUTH = config.USERNAME_OAUTH;
    const CHANNEL = config.CHANNEL
    this.options =  {
      options: {
        debug: true
      },
      connection: {
        reconnect: true
      },
      identity: {
        username: USERNAME_OAUTH,
        password: OAUTH
      },
      channels: CHANNEL
    };
  }

  public getOptions(): tmi.Options {
    return this.options;
  };
}
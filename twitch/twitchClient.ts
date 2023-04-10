import tmi from "tmi.js";
import { config } from "../configs/configs";
import { CommandFactory, parsedCommand } from "./factory/commandFactory";
import { RedeemFactory } from "./factory/redeemFactory";

const USERNAME_OAUTH = config.USERNAME_OAUTH;
const AUTHORIZED_USERS = config.AUTHORIZED_USERS;

const EVENTS = {};

interface ITwitchClient {
  getOptions: () => tmi.Options;
  connect: () => Promise<[string,number]>;
  disconnect: () => Promise<[string,number]>;
  reconnect: () => Promise<string>;
  updateOptions: (options: tmi.Options) => void;
}

interface IConfigTwitchClient {}

export class TwitchClient implements ITwitchClient {
  private client: tmi.Client;
  private options: tmi.Options;
  private chatEventsHandler: IChatEventsHandler;

  constructor() {
    // Could insert config into params
    this.setupOptions();
    this.client = this.initClient(this.getOptions());
    //should I add this here or do it the other way arround: add GetClient, and get client in the handler class
    this.chatEventsHandler = new ChatEventsHandler(this.client);
  }

  private initClient(options: tmi.Options): tmi.Client {
    return new tmi.Client(options);
  }

  public async connect(): Promise<[string,number]> {
    return await this.client.connect();
  }

  public async disconnect(): Promise<[string,number]> {
    return await this.client.disconnect();
  }

  public async reconnect(): Promise<string> {
    await this.disconnect();
    await this.connect();
    return "Reconnected to twitch client!"
  }

  public updateOptions(options: tmi.Options): void {
    this.options = options;
  }

  /**
   * I don't like this approach, need to implement a better way of utilizing the config class, then update where the class is used.
   */
  private setupOptions(): void {
    const OAUTH = config.OAUTH;
    const USERNAME_OAUTH = config.USERNAME_OAUTH;
    const CHANNEL = config.CHANNEL;
    this.options = {
      options: {
        debug: true,
      },
      connection: {
        reconnect: true,
      },
      identity: {
        username: USERNAME_OAUTH,
        password: OAUTH,
      },
      channels: CHANNEL,
    };
  }

  public getOptions(): tmi.Options {
    return this.options;
  }
}

/*
  I could add a method to twitch client class, and do client.on event handling there, but thats not what the class is for
  thats why I'm implementing a separate class
*/

interface IChatEventsHandler {
  setupChatListener: () => void;
  setupCheerListener: () => void
  setupRadeemListener: () => void
}


class ChatEventsHandler implements IChatEventsHandler {
  private _client: tmi.Client;

  constructor(client: tmi.Client) {
    this._client = client;
    this.setupChatListener()
    this.setupRadeemListener()
  }

  setupRadeemListener() {
    //tmi.redeem is half finished
  }

  setupCheerListener(): void {
    this._client.on("cheer", () => {

    })
  }

  setupChatListener(): void {
    this._client.on("chat", (channel, user: tmi.UserNoticeState, message, self) => {

      let commandName = message.split(" ")[0];
      console.log("================= change later ====================");
      const isUserAuthorized = AUTHORIZED_USERS?.includes(user.username.toLowerCase())
      try {
        //logic for this:https://www.baeldung.com/java-replace-if-statements
        //https://refactoring.guru/design-patterns/command/typescript/example
        //command pattern
        if (user.username === USERNAME_OAUTH) {
          console.log(`${user.username}: ${message}`);
          commandName = "!tts"
        }

        if (isUserAuthorized) {
          const targetCommand = CommandFactory.getOperation(commandName);
          //should only be one method maybe
          targetCommand?.parse(user, message);
          targetCommand?.handle();
        }
      } catch (error) {
        console.log(`Error in chat parsing! => `);
        console.log(error);
      }
    });
  }
  
  // public setupChatListener(): void {
  //   this._client.on("chat", (channel, user, message, self) => {
  //     const commandName = message.split(" ")[0]
  //     console.log("================= change later ====================")
  //     const isUserAuthorized = true//AUTHORIZED_USERS?.includes(user.username.toLowerCase())
  //     try {

  //       if (user.username === USERNAME_OAUTH) {
  //         console.log(`${user.username}: ${message}`);
  //         eventEmitter.emit("synthesizeAudioUberduck", message);
  //       }

  //       if(commandName === "!tts" && isUserAuthorized) {
  //           const messageInfo = commandHandler.parseChatCommandMessageTts(user, message)
  //           commandHandler.handleCommandTts(messageInfo)
  //       }

  //       if(commandName == "!ttsv" && isUserAuthorized) {
  //         const messageInfo = commandHandler.parseChatCommandMessageTtsv(user, message)
  //         commandHandler.handleCommandTtsv(messageInfo)
  //       }
  //       if(commandName == "!tts11" && isUserAuthorized) {
  //         const messageInfo = commandHandler.parseChatCommandMessageTts(user, message)
  //         commandHandler.handleCommandTts11(messageInfo)

  //       }
  //     } catch (error) {
  //       console.log(`Error in chat parsing! => `)
  //       console.log(error)
  //     }
  //   });
  // }
}
//[{"operationName":"SendHighlightedChatMessage","variables":{"input":{"channelID":"138907338","cost":5000,"message":"nice","transactionID":"0d9f19afec7e8d3299622e4f99004f37"}},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"bb187d763156dc5c25c6457e1b32da6c5033cb7504854e6d33a8b876d10444b6"}}}]
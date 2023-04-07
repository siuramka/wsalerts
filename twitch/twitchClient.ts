import tmi from "tmi.js";
import { config } from "../configs/config";
const commandHandler = require("./commandHandler")
import { eventEmitter } from "../events/eventsHandler";

const USERNAME_OAUTH = config.USERNAME_OAUTH
const AUTHORIZED_USERS = config.AUTHORIZED_USERS

const EVENTS = {

}

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
  private chatEventsHandler: IChatEventsHandler

  constructor() {
    // Could insert config into params
    this.setupOptions()
    this.client = this.initClient(this.getOptions())
    //should I add this here or do it the other way arround: add GetClient, and get client in the handler class
    this.chatEventsHandler = new ChatEventsHandler(this.client)

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


/*
  I could add a method to twitch client class, and do client.on event handling there, but thats not what the class is for
  thats why I'm implementing a separate class
*/

interface IChatEventsHandler {
  setupListener: () => void
}

class ChatEventsHandler implements IChatEventsHandler {
  private _client: tmi.Client

  constructor(client: tmi.Client) {
    this._client = client;
    this.setupListener()
  }
  
  public setupListener(): void {
    this._client.on("chat", (channel, user, message, self) => {
      console.log("received message")
      const commandName = message.split(" ")[0]
      const isUserAuthorized = true//AUTHORIZED_USERS?.includes(user.username.toLowerCase())
      try {
    
        if (user.username === USERNAME_OAUTH) {
          console.log(`${user.username}: ${message}`);
          eventEmitter.emit("synthesizeAudioUberduck", message);
        }
    
        if(commandName === "!tts" && isUserAuthorized) {
            const messageInfo = commandHandler.parseChatCommandMessageTts(user, message)
            commandHandler.handleCommandTts(messageInfo)
        }
        
        if(commandName == "!ttsv" && isUserAuthorized) {
          const messageInfo = commandHandler.parseChatCommandMessageTtsv(user, message)
          commandHandler.handleCommandTtsv(messageInfo)
        }
        if(commandName == "!tts11" && isUserAuthorized) {
          const messageInfo = commandHandler.parseChatCommandMessageTts(user, message)
          commandHandler.handleCommandTts11(messageInfo)
    
        }
      } catch (error) {
        console.log(`Error in chat parsing! => `)
        console.log(error)
      }
    });
  }


}
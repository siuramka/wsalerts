import tmi from "tmi.js";
import { TwitchClient } from "./twitchClient";
import { TwitchSettingRepository } from "../database/repository/TwitchSetting/TwitchSettingRepository";
import { CommandFactory } from "./factory/commandFactory";

export class TwitchClientEventsHandler {
  private _client: tmi.Client;
  private twitchSettingRepository: TwitchSettingRepository;

  async initialize(client: TwitchClient) {
    this._client = client.getTmiClient();
    this.twitchSettingRepository = new TwitchSettingRepository();
    await this.setupChatListener();
  }

  private setupRadeemListener() {
    this._client.on("redeem", () => {});
  }

  private setupCheerListener() {
    this._client.on("cheer", () => {});
  }

  private setupChatListener() {
    this._client.on(
      "chat",
      async (channel, user: tmi.UserNoticeState, message, self) => {
        let commandName = message.split(" ")[0];

        const twitchSetting = await this.twitchSettingRepository.getFirst();
        const authorizedUsers = twitchSetting?.twitchAuthorizedUsers.map(
          (acc) => acc.username.toLocaleLowerCase()
        );
        const isUserAuthorized = authorizedUsers?.includes(
          user.username.toLocaleLowerCase()
        );

        //logic for this:https://www.baeldung.com/java-replace-if-statements
        //https://refactoring.guru/design-patterns/command/typescript/example
        //command pattern
        try {
          if (user.username === twitchSetting?.botUsername) {
            console.log(`${user.username}: ${message}`);
            commandName = "!BotCommand";
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
      }
    );
  }
}

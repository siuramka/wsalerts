import tmi from "tmi.js";
import { TwitchClient } from "./twitchClient";
import { TwitchSettingRepository } from "../database/repository/TwitchSetting/TwitchSettingRepository";
import { CommandFactory } from "./factory/commandFactory";
import { SettingsRepository } from "../database/repository/TwitchSetting/SettingsRepository";
import { whitelistedCommands } from "./types/whitelistedCommands";
import { TwitchAuthorizedUserRepository } from "../database/repository/TwitchSetting/TwitchAuthorizedUserRepository";

export class TwitchClientEventsHandler {
  private _client: tmi.Client;
  private twitchSettingRepository: TwitchSettingRepository;
  private settinsRepository: SettingsRepository;
  private twitchAuthorizedUserRepository: TwitchAuthorizedUserRepository

  async initialize(client: TwitchClient) {
    this._client = client.getTmiClient();
    this.twitchSettingRepository = new TwitchSettingRepository();
    this.twitchAuthorizedUserRepository = new TwitchAuthorizedUserRepository();
    this.settinsRepository = new SettingsRepository();
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
        const settings = await this.settinsRepository.getSettings();
        const isDisabledMessage = message[0] == "~";

        let commandName = message.split(" ")[0];
        if (
          (settings.muted || isDisabledMessage) &&
          !whitelistedCommands.includes(commandName)
        ) {
          console.log("return:(")
          return;
        }

        const query = await this.twitchAuthorizedUserRepository?.getAuthorizedUsers();
        const authorizedUsers = query.map(x => x.username.toLocaleLowerCase());

        console.log("aaaaaaa")

        console.log(authorizedUsers)
        const isUserAuthorized = authorizedUsers?.includes(
          user.username.toLocaleLowerCase()
        );
        console.log("isssss")

        console.log(isUserAuthorized)

        const twitchSetting = await this.twitchSettingRepository.getFirst();
        try {
          if (user.username === twitchSetting?.botUsername) {
            console.log(`${user.username}: ${message}`);
            commandName = "!BotCommand";
          }
        console.log("wwwwwwww")

          if (isUserAuthorized) {
        console.log("bbbbbbbbbb")

            const targetCommand = CommandFactory.getOperation(commandName);
            const returnMessage = await targetCommand?.parse(user, message);

            if (returnMessage) {
              await this._client.say(channel, `~${returnMessage}`);
            }
          }
        } catch (error) {
          console.log(`Error in chat parsing! => `);
          console.log(error);
        }
      }
    );
  }
}

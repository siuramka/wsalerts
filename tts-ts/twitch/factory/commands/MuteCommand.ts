import EventsHandler from "../../../events/TtsEventHandler";
import tmi from "tmi.js";
import { ICommand } from "../../types/contracts/ICommand";
import { ProviderConfig } from "../../../configs/ProviderConfig";
import { BaseCommand } from "./BaseCommand";
import { SettingsRepository } from "../../../database/repository/TwitchSetting/SettingsRepository";
import { Settings } from "@prisma/client";

export class MuteCommand extends BaseCommand implements ICommand {
  constructor() {
    super();
  }

  async parse(
    user: tmi.ChatUserstate,
    message: string
  ): Promise<string | void> {
    const newMutedSettings = await this.handle();
    if (newMutedSettings) {
      return `Status: ${newMutedSettings?.muted}`;
    }
  }

  private async handle(): Promise<Settings | undefined> {
    const settingsRepository = new SettingsRepository();
    const settings = await settingsRepository.getSettings();
    if (settings) {
      const newSettings: Settings = {
        muted: !settings.muted,
        id: settings.id,
      };
      const response = await settingsRepository.setSettings(newSettings);
      return newSettings;
    }

    return undefined;
  }
}

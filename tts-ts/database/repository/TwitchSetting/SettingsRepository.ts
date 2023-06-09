import { PrismaClient, Settings, TwitchSetting } from "@prisma/client";
import { IReadable } from "../base/interface/IReadable";
import { IWritable } from "../base/interface/IWritable";
import DatabaseConfig from "../../DatabaseConfig";

export class SettingsRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = DatabaseConfig.getInstance().getPrismaClient();
  }

  public async getSettings() {
    const query = await this.prisma.settings.findMany();

    return query[0];
  }

  public async setSettings(newSettings: Settings): Promise<void> {
    const query = await this.prisma.settings.update({
      where: {
        id: 1,
      },
      data: {
        muted: newSettings.muted,
      },
    });
  }

  public async getProvider() {
    //should probably re write to findMany, cause id I think could not be id1 every time.
    const query = await this.prisma.selectedProvider.findMany({
      include: {
        provider: true,
      },
    });
    return query[0];
  }
}

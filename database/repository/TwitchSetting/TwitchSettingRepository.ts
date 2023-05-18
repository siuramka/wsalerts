import { PrismaClient, TwitchSetting } from "@prisma/client";
import { IReadable } from "../base/interface/IReadable";
import { IWritable } from "../base/interface/IWritable";
import DatabaseConfig from "../../DatabaseConfig";

export class TwitchSettingRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = DatabaseConfig.getInstance().getPrismaClient();
  }

  public async getFirst(): Promise<TwitchSetting | null> {
    return await this.prisma.twitchSetting.findFirst();
  }
}
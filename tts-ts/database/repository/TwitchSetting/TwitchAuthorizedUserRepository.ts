import { PrismaClient, Settings, TwitchSetting } from "@prisma/client";
import { IReadable } from "../base/interface/IReadable";
import { IWritable } from "../base/interface/IWritable";
import DatabaseConfig from "../../DatabaseConfig";

export class TwitchAuthorizedUserRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = DatabaseConfig.getInstance().getPrismaClient();
  }

  public async getAuthorizedUsers() {
    const query = await this.prisma.twitchAuthorizedUser.findMany();

    return query;
  }

}

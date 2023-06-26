import { PrismaClient, TwitchSetting } from "@prisma/client";
import { IReadable } from "../base/interface/IReadable";
import { IWritable } from "../base/interface/IWritable";
import DatabaseConfig from "../../DatabaseConfig";

export class TwitchSettingRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = DatabaseConfig.getInstance().getPrismaClient();
  }

  public async getFirst() {
    //prisma findFirst where id = 1 and select included twitchAuthorizedUsers where listenToUserChannel is true
    const query = await this.prisma.twitchSetting.findFirst({
      where: {
        id: 1
      },
      include: {
        twitchAuthorizedUsers: {
          where: {
            listenToUserChannel: true
          }
        }
      }
    });
    return query;
  }
}

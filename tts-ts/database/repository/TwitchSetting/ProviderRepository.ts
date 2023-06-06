import { PrismaClient, TwitchSetting } from "@prisma/client";
import { IReadable } from "../base/interface/IReadable";
import { IWritable } from "../base/interface/IWritable";
import DatabaseConfig from "../../DatabaseConfig";

export class ProviderRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = DatabaseConfig.getInstance().getPrismaClient();
  }

  public async getProvider() {
    //should probably re write to findMany, cause id I think could not be id1 every time.
    const query = await this.prisma.selectedProvider.findMany({
      include: {
        provider: true,
      }
    });
    return query[0];
  }
}

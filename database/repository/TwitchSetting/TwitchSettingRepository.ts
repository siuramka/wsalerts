import { PrismaClient, TwitchSetting } from "@prisma/client";
import { IReadable } from "../base/interface/IReadable";
import { IWritable } from "../base/interface/IWritable";
import DatabaseConfig from "../../DatabaseConfig";

class TwitchSettingRepository implements IReadable, IWritable {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = DatabaseConfig.getInstance().getPrismaClient();
  }
  //IReadable
  public async getAll(): Promise<Array<TwitchSetting> | null> {
    return await this.prisma.twitchSetting.findMany();
  }
  public async get(id: number): Promise<TwitchSetting | null> {
    return await this.prisma.twitchSetting.findUnique({ where: { id } });
  }
  //IWritable
  public async create(entity: TwitchSetting): Promise<TwitchSetting> {
    return await this.prisma.twitchSetting.create({ data: entity });
  }
  public async update(
    id: number,
    entity: TwitchSetting
  ): Promise<TwitchSetting> {
    return await this.prisma.twitchSetting.update({
      where: { id },
      data: entity,
    });
  }
  public async delete(id: number) {
    return await this.prisma.twitchSetting.delete({ where: { id } });
  }
  public async deleteAll() {
    return await this.prisma.twitchSetting.deleteMany();
  }
}

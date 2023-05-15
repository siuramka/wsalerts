import { PrismaClient, TwitchSetting, Provider } from "@prisma/client";

interface IConfig {
  TwitchSetting: TwitchSetting;
  Provider: Provider;
}

//singleton design pattern
class DatabaseConfig {
  private static _instance: DatabaseConfig;
  private prisma: PrismaClient;
  private config: IConfig;

  private constructor() {
    this.prisma = new PrismaClient();
    this.init();
  }

  public static getInstance() {
    if (this._instance) {
      return this._instance;
    } else {

    }
  }

  public static refreshInstance() {
    this._instance = new DatabaseConfig();
    return this._instance;
  }
  
  private async init() {
    try {
      await this.prisma.$connect();
      console.log("Database connected");

      const twitchSettingWithAuthorizedUsers =
        await this.prisma.twitchSetting.findFirst({
          include: { twitchAuthorizedUsers: true },
        });
      const providerWithVoices = await this.prisma.provider.findFirst({
        include: { voices: true },
      });

      this.config = {
        TwitchSetting: twitchSettingWithAuthorizedUsers!,
        Provider: providerWithVoices!,
      };
      console.log(this.config);
    } catch (error) {
      console.error("Error in Initializing Config from Database!");
      console.error(error);
    }
  }

  public getConfig() {
    return this.config;
  }
}

export default DatabaseConfig;

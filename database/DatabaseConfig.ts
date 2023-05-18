import { PrismaClient, TwitchSetting, Provider } from "@prisma/client";
//prisma orm is different from traditiona orms, cant extend classes etc: https://github.com/prisma/prisma/discussions/3929
//so I use a non generic repository pattern instead, which is not as elegant but it works.


//singleton design pattern(not anymore since I added refreshInstance?)
// using singleton because i'll want to refresh the instance of the database and restart/reconnect twitch client (and the express server maybe)
// with updated database settings.

class DatabaseConfig {
  private static _instance: DatabaseConfig;
  private prisma: PrismaClient;

  private constructor() {
    this.prisma = new PrismaClient();
    this.init();
  }

  public static getInstance() {
    if (this._instance) {
      return this._instance;
    } else {
        return this.refreshInstance()
    }
  }

  public static refreshInstance() {
    this._instance = new DatabaseConfig();
    return this._instance;
  }

  private async init() {
    try {
      await this.prisma.$connect();
      console.log("Database connected!");
    } catch (error) {
      console.error("Error in Initializing Database instance!");
      console.error(error);
    }
  }

  public getPrismaClient(): PrismaClient {
    return this.prisma;
  }
}

export default DatabaseConfig;

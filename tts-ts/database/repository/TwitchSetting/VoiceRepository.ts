import { PrismaClient, TwitchSetting } from "@prisma/client";
import DatabaseConfig from "../../DatabaseConfig";

type provider = "uberduck" | "elevenlabs" | "streamlabs";

export class VoiceRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = DatabaseConfig.getInstance().getPrismaClient();
  }

  public async getProviderWithVoices(provider: provider) {
    const query = await this.prisma.provider.findFirst({
      where: { name: provider },
      include: {
        voices: true,
      },
    });

    return query;
  }

  public async getProviderWithVoicesAndSelected(provider: provider) {
    const query = await this.prisma.provider.findFirst({
      where: { name: provider },
      include: {
        voices: {
          where: { selected: true },
        },
      },
    });

    return query;
  }
}

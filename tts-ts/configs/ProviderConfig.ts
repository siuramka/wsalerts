import { Provider } from "@prisma/client";
import { ProviderRepository } from "../database/repository/TwitchSetting/ProviderRepository";



export class ProviderService   {
    private ProviderRepository: ProviderRepository
    constructor() {
        this.ProviderRepository = new ProviderRepository()
    
    }
    public async getTTSProvider(): Promise<Provider> {
        const data = await this.ProviderRepository.getProvider()
        return data!.provider;
    }
}
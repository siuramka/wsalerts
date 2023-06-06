import { Provider } from "@prisma/client";
import { ProviderRepository } from "../database/repository/TwitchSetting/ProviderRepository";

export abstract class ProviderConfig {
    private static providerRepository: ProviderRepository = new ProviderRepository();
    static {
        ProviderConfig.providerRepository = new ProviderRepository();
    }
    public static async getProvider() {
        const data  =  await ProviderConfig.providerRepository.getProvider();
        return data!.provider.name
    }

}

// testing static 
// class test {
//     constructor() {
//       console.log("test constructor")
//     }
//   }
  
//   class staticTest {
//     private static test: number
//     static {
//       console.log("static constructor")
//       staticTest.test = 9999
//     }
//     public static getTest() {
//       console.log(`${staticTest.test}`)
//     }
//   }
  
  
//   class wooper {
//     constructor() {
//       staticTest.getTest()
//     }
//   }
  
  
//   staticTest.getTest()
//   staticTest.getTest()
  
//   const woop = new wooper()
  
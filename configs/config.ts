import dotenv from "dotenv";
dotenv.config();

//create multiple configs for different stuff
// https://www.typescripttutorial.net/typescript-tutorial/typescript-extend-interface/
// instead of I1 | I2 | Ix... 
export interface ApiConfig extends TwitchConfig, ElevenlabsConfig, UberduckConfig {}

interface TwitchConfig {
  PORT: string | undefined;
  OAUTH: string | undefined;
  USERNAME_OAUTH: string | undefined;
  CHANNEL: string[] | undefined;
  AUTHORIZED_USERS: string[] | undefined;
}

interface ElevenlabsConfig {
  XI_API_KEY: string | undefined;
}

interface UberduckConfig {
  API_KEY: string | undefined;
  API_SECRET: string | undefined;
}

export const UberduckConfig = {
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET
}

export const ElevenlabsConfig: ElevenlabsConfig  = {
  XI_API_KEY: process.env.XI_API_KEY
}

export const TwitchConfig: TwitchConfig = {
  PORT: process.env.PORT,
  OAUTH: process.env.OAUTH,
  USERNAME_OAUTH: process.env.USERNAME_OAUTH,
  CHANNEL: process.env.CHANNEL?.split(", "),
  AUTHORIZED_USERS: process.env.AUTHORIZED_USERS?.split(", "),
};

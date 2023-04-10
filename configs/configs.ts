import dotenv from "dotenv";
dotenv.config();

//create multiple configs for different stuff
// https://www.typescripttutorial.net/typescript-tutorial/typescript-extend-interface/
// Not sure how I should handle when


export interface ITwitchConfig {
  PORT: string | undefined;
  OAUTH: string | undefined;
  USERNAME_OAUTH: string | undefined;
  CHANNEL: string[] | undefined;
  AUTHORIZED_USERS: string[] | undefined;
}

export interface IElevenlabsConfig {
  type: 'elevenlabs',
  XI_API_KEY: string | undefined;
}

export interface IUberduckConfig {
  type: 'uberduck',
  API_KEY: string | undefined;
  API_SECRET: string | undefined;
}

export const _UberduckConfig: IUberduckConfig = {
  type: 'uberduck',
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET
}

export const _ElevenlabsConfig: IElevenlabsConfig  = {
  type: 'elevenlabs',
  XI_API_KEY: process.env.XI_API_KEY
}

export const _TwitchConfig: ITwitchConfig = {
  PORT: process.env.PORT,
  OAUTH: process.env.OAUTH,
  USERNAME_OAUTH: process.env.USERNAME_OAUTH,
  CHANNEL: process.env.CHANNEL?.split(", "),
  AUTHORIZED_USERS: process.env.AUTHORIZED_USERS?.split(", "),
};

export type ApiConfigType = IUberduckConfig | IElevenlabsConfig



// fix later


interface Config {
  PORT: string | undefined;
  OAUTH: string | undefined;
  USERNAME_OAUTH: string | undefined;
  CHANNEL: string[] | undefined;
  API_KEY: string | undefined;
  API_SECRET: string | undefined;
  XI_API_KEY: string | undefined;
  AUTHORIZED_USERS: string[] | undefined;
}

export const config: Config = {
  PORT: process.env.PORT,
  OAUTH: process.env.OAUTH,
  USERNAME_OAUTH: process.env.USERNAME_OAUTH,
  CHANNEL: process.env.CHANNEL?.split(", "),
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET,
  XI_API_KEY: process.env.XI_API_KEY,
  AUTHORIZED_USERS: process.env.AUTHORIZED_USERS?.split(", "),
};
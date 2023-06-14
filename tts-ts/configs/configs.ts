import dotenv from "dotenv";
dotenv.config();

//create multiple configs for different stuff
// https://www.typescripttutorial.net/typescript-tutorial/typescript-extend-interface/
// Not sure how I should handle when


export interface ITwitchConfig {
  PORT: string | undefined;
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
};

export type ApiConfigType = IUberduckConfig | IElevenlabsConfig



// fix later


interface Config {
  PORT: string | undefined;
  SOCKET_PORT: string | undefined;
  API_KEY: string | undefined;
  API_SECRET: string | undefined;
  XI_API_KEY: string | undefined;
}

export const config: Config = {
  PORT: process.env.PORT,
  SOCKET_PORT: process.env.SOCKET_PORT,
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET,
  XI_API_KEY: process.env.XI_API_KEY
};
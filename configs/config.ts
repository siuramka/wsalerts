import dotenv from 'dotenv';
dotenv.config();

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
    CHANNEL: process.env.CHANNEL?.split(', '),
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET,
    XI_API_KEY: process.env.XI_API_KEY,
    AUTHORIZED_USERS: process.env.AUTHORIZED_USERS?.split(', ')
  };
  
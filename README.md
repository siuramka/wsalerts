# wsalerts
Text-To-Speach bot with managment/admin dashboard 

## Hosted on a VPS server as a docker compose multi containered app

## nginx
- NGINX reverse proxy

## tts-api
to handle tts-ts data
- .NET Core API 
- EF Core ORM
- Discord Auth
- JWT

## tts-frontend
Admin dashboard to crud data for tts-ts database 
- React+Vite with MUI components
- Discord auth

## tts-ts
chat bot listening for commands/events. Plays a Text-To-Speach sound in OBS from multiple TTS providers - Uberduck, Elevenlabs, Streamlabs(AWS Polly).
- WebSockets/Socket.io for communication between server and client(obs)
- Prisma ORM for database

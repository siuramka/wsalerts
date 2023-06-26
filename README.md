# wsalerts
Text-To-Speech bot with managment/admin dashboard 

## Hosted on a VPS server as a docker compose multi containered app
![chrome_7thniBQ7VX](https://github.com/siuramka/wsalerts/assets/24389041/b8a6826e-a1b6-4645-a9ba-c0b3907c4b26)

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
chat bot listening for commands/events plays a Text-To-Speech sound in OBS/browser using multiple TTS providers - Uberduck, Elevenlabs, Streamlabs(AWS Polly).
- TypeScript
- WebSockets/Socket.io for communication between server and client (OBS/browser)
- Prisma ORM

## Dashboard demo

![2023-06-26 01-08-07](https://github.com/siuramka/wsalerts/assets/24389041/c4a93a48-8f0c-474b-aa4d-a43d4fab6862)


# wsalerts - Twitch TTS Alert using Socket.IO

This repository contains a Node.js application that utilizes tmi.js to listen for Twitch chat messages or commands, and sends a request to a text-to-speech (TTS) API to generate and play audio in the browser.
The code can easily be modified to implement donations, twitch bits and other alert events. The program also plays a TTS message from the bot user, this can be disabled by removing the specific condition check.
   
Create an .env file
    Set the appropriate values for the environment variables in .env:
    
    #EXPRESS PORT=3331

    #UBERDUCK
    API_KEY=KEY
    API_SECRET=KEY

    #ELEVENLABS
    XI_API_KEY=KEY
    
Usage

    Start the server: npm run start
    Open the browser and navigate to `http://localhost:3331/tts`. This will start the WebSocket connection and begin listening for Twitch chat messages.
    To trigger a custom alert or command, send a message in the Twitch chat that matches one of the following formats:
        !tts <message>: Generates and plays TTS audio for the specified message using UBERDUCK TTS provider.
        <>
    The TTS audio can be captured and used as alerts in OBS or other broadcasting software adding the `http://localhost:3331/tts` as Browser Source Media in OBS



 

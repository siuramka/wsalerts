# wsalerts - Twitch TTS Alert using Socket.IO

This repository contains a Node.js application that utilizes tmi.js to listen for Twitch chat messages or commands, and sends a request to a text-to-speech (TTS) API to generate and play audio in the browser.
The code can easily be modified to implement donations, twitch bits and other alert events. The program also plays a TTS message from the bot user, this can be disabled by removing the specific condition check in `twitch/chatHandler.js`


Installation

    Clone the repository
    <typescript node app installation heh>
    
Create an .env file
    Set the appropriate values for the environment variables in .env:
    
    #EXPRESS PORT=3331

    #TWITCH
    OAUTH=TWITCHBOT_OAUTH
    USERNAME_OAUTH=TWITCHBOT_NAME
    CHANNEL=TWITCH_CHANNEL

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
        !ttsv <voice>: <message>: Generates and plays TTS audio for the specified message using UBERDUCK TTS provider with provided voice name.
        !tts11 <message>: Generates and plays TTS audio for the specified message using ELEVANLABS TTS provider.
    The TTS audio can be captured and used as alerts in OBS or other broadcasting software adding the `http://localhost:3331/tts` as Browser Source Media in OBS


Ideas

    Implement filtering to remove bad words from speech message

    Play TTS with points redeem
        Config 

    Better config
        - SQLlite or MongoDB for saving settings
        - Ability to update settings/db with a discord bot or dashboard
        - Check if config is available

    Donations

    More providers

    Multiple users support with individual settings

    Make own voice provider



 

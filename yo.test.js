const tmi = require("tmi.js");
const cmd = require("./twitch/commandHandler")
const config = require("./configs/config");

const OAUTH = config.OAUTH;
const USERNAME_OAUTH = config.USERNAME_OAUTH;
const CHANNEL = config.CHANNEL;
const options = {
    options: {
        debug: true
    },
    connection: {
        reconnect: true
    },
    identity: {
        username: USERNAME_OAUTH,
        password: OAUTH
    },
    channels: [CHANNEL]
};


test('testparseChatCommandMessageTtsv', () => {
    const data = cmd.parseChatCommandMessageTtsv("", "!ttsv 21-savage I just did what?? JUST RAPPED YO")
    expect(data.voice).toBe("21-savage")
    expect(data.messageContent).toBe("I just did what?? JUST RAPPED YO")
});


describe('tmi.js send and read message in chat', () => {
    let client;
    beforeAll(() => {
        client = new tmi.Client(options);
    });

    test('send and read message in chat', done => {
        client.connect().then(() => {
            const message = "this is awesome"
            client.say("nidas", message);

            client.on('message', (channel, tags, messagee, self) => {
                expect(messagee).toBe(message);
                done();
            });

        });
    });

    afterAll(() => {
        client.disconnect();
    });
});

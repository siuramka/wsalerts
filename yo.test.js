const tmi = require("tmi.js");

const config = require("./configs/config");

const OAUTH = config.OAUTH;
const USERNAME_OAUTH = config.USERNAME_OAUTH;
const CHANNEL = config.CHANNEL;
console.log(OAUTH)
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
    channels: ["nidas"]
};


describe('tmi.js send and read message in chat', () => {
    let client;
    beforeAll(() => {
        client = new tmi.Client(options);
    });

    test('send and read message in chat', done => {
        client.connect().then(() => {
            const message = "this is awesome"
            client.say(CHANNEL, message);

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

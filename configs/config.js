require('dotenv').config();
module.exports = {
    PORT: process.env.PORT,
    OAUTH: process.env.OAUTH,
    USERNAME_OAUTH: process.env.USERNAME_OAUTH,
    CHANNEL: process.env.CHANNEL,
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET,
    //Users authorised for commands
    AUTHORIZED_USERS : ["mariuspure", "nidas", "senlash"]
}
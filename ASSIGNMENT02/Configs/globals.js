// Import dotenv
require("dotenv").config();
// Create configuration object
const configuration = {
    ConnectionString:{
        MongoDB: process.env.CONNECTION_STRING_MONGODB
    },
    Authentication:{
        Github:{
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL
        },
        Google:{
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL
        }
    }
}
//Export configuration object
module.exports = configuration;
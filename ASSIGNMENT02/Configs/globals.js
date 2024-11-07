// Import dotenv
require("dotenv").config();
// Create configuration object
const configuration = {
    ConnectionString:{
        MongoDB: process.env.CONNECTION_STRING_MONGODB
    },
}
//Export configuration object
module.exports = configuration;
// THis is mongoose model which represenets users in my DB
const mongoose = require("mongoose");
// We'll use the out-of-thebox functionality in plum to extend the model
const plm = require("passport-local-mongoose");

const schemaObj ={
    username: {type: String},
    password: {type: String},// never store passwords in plain text
    // add feilds to handle oauth users
    oauthID: {type: String}, // identify user from oauth provider
    oauthProvider:{ type: Date, deafult:Date.now }, // identify the oauth provide, eg Github, google...
    created: {type:Date, default: Date.now },
};

const mongooseSchema = new mongoose.Schema(schemaObj);
//Things we need : encrypt password, serialize/deserialize user, configure local strategy
// Inject these features using a plugins
mongooseSchema.plugin(plm);
module.exports = mongoose.model("user", mongooseSchema);
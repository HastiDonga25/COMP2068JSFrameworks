// THis is mongoose model which represenets users in my DB
const mongoose = require("mongoose");
// We'll use the out-of-thebox functionality in plum to extend the model
const plm = require("passport-local-mongoose");

const schemaObj ={
    username: {type: String},
    password: {type: String},// never store passwords in plain text
};

const mongooseSchema = new mongoose.Schema(schemaObj);
//Things we need : encrypt password, serialize/deserialize user, configure local strategy
// Inject these features using a plugins
mongooseSchema.plugin(plm);
module.exports = mongoose.model("user", mongooseSchema);
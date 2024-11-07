// Model names are in the singular from as they repeat an entity in the DB
// This is a moongose model, and gives you access to out-of -the -box functions
// Import Moongose
const mongoose = require("mongoose");
// Create schema object> define your data
// this serves as the contact between app and db
const schemaObj = {
    bookName:{ type: String, required: true},
    startDate:{ type: Date},
    endDate:{ type: Date},
    author: { type: String, required: true},
    statusOfReading:{ type: String, default: "COMPLETED"},
}
// Use schema object to create moongsose schema
const mongooseSchema = new mongoose.Schema(schemaObj);
// Use moongose schema to create moongose model
module.exports = mongoose.model("bookRecord", mongooseSchema);



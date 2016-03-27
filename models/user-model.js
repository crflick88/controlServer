// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var UserSchema = new Schema({
    username: String,
    password: String,
    privileges: [String],
    admin:Boolean
});

// pass Schema using module.exports
module.exports = mongoose.model('User',UserSchema);
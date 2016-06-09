// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var UserSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    privileges: [{type: String, enum:['canSell','isAdmin','canReport'], default:'canSell'}],
    admin:{type: Boolean, default:false}
});

// pass Schema using module.exports
module.exports = mongoose.model('User',UserSchema);
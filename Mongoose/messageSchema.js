const mongoose = require('mongoose');

const databaseSchema = new mongoose.Schema({
  'message_content': {type: String},
  'message_author': {type: String},
  'message_channel': {type: String},
}, { timestamps: true });

const MSGES = mongoose.model('logged messages', databaseSchema);

module.exports = MSGES;  
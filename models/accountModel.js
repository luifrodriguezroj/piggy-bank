const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const accountSchema = new Schema({
  owner: { type: String, required: true },
  balance: { type: Number, required: true },
}, {
  versionKey: false,
  timestamps: true,
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
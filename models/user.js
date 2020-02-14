const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: String,
  firstName: String,
  lastName: String,
  age: Number,
  size: Number,
  weight: Number
});

module.exports = mongoose.model("User", userSchema);

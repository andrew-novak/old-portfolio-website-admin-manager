const { Schema, model } = require("mongoose");

const adminSchema = new Schema({
  adminName: {
    type: String,
    unique: true,
    require: true
  },
  passwordHash: {
    type: String,
    required: true
  }
});

const Admin = model("Admin", adminSchema);

module.exports = Admin;

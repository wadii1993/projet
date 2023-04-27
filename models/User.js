const mongoose = require("mongoose");
const schema = mongoose.Schema;
const userSchema = new schema({
  fullName: String,
  email: String,
  password: String,
  adresse: String,
  telephone: String,
  blocking: {
    type: Boolean,
    default: "false",
  },
  userRole: {
    type: String,
    roles: ["user", "admin"],
    default: "user",
  },
});

module.exports = mongoose.model("User", userSchema);

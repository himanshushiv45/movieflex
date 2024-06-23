const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    contact: {
      type: String,
      require: true,
      minLength: 10,
      maxLength: 10,
    },
    city: {
      type: String,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);
// variable name = mongoose.model(collectionName, Schema)

module.exports = userModel;

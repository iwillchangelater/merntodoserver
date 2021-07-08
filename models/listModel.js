const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  describe: String,
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
  userID: String,
});

module.exports = mongoose.model("list", listSchema);

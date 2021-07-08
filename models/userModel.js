const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Имэйл оруулаагүй байна"],
    unique: true,
  },
  password: {
    type: String,
    minlength: 4,
    required: [true, "Нууц үг алга байна"],
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createAt: {
    type: Date,
    default: Date.now,
  },
});
//token awah
userSchema.methods.getJsonWebToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return token;
};
//password shalgah
userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
// hadgalhiin omno n password encript hiih
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("user", userSchema);

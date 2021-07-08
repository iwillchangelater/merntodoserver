const User = require("../models/userModel");
const asyncHandler = require("../utility/asyncHandler");
const MyError = require("../utility/myError");

//newtreh huselt
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new MyError("Email password ийг дамжуулна уу", 200);
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new MyError("Хэрэгэлэгч олдсонгүй", 200);
  }
  if (!user.checkPassword(password)) {
    throw new MyError("Email Password Буруу байна", 200);
  }
  const token = user.getJsonWebToken();
  res.json({ success: true, token, data: user });
});

// burteguuleh
exports.signup = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new MyError("Email password ийг дамжуулна уу", 200);
  }
  const user = await User.create(req.body);
  const token = user.getJsonWebToken();
  res.json({ success: true, token, data: user });
});
// acc ustagah
exports.deleteAcc = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new MyError("Хэрэглэгч олдсонгүй ", 500);
  }
  user.remove();
  res.json({ success: true, data: user });
});

// martasan password iig oorchloh huselt
exports.forgetPassword = asyncHandler(async (req, res, next) => {});

// logout hiih postman token null
exports.signout = asyncHandler(async (req, res, next) => {
  res.json({ success: true, token: "" });
});

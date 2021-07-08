const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const MyError = require("./myError");

// токен байгаа эсэхийг шалгаж байвал.
exports.protect = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization) {
    throw new MyError(
      "Энэ үйлдэл хийхийн тулд Нэвтэрсэн байх шаардлагатай",
      200
    );
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    throw new MyError("Алдаатай Token Байна", 200);
  }
  const obj = jwt.verify(token, process.env.JWT_SECRET);
  req.body.userId = obj.id;
  next();
});

//хэрэглэгчдийн үүрэгээр нь ялгах хэрэг байхгүй учир орхив

// exports.authorize = (...roles) => {
//   return (req, res, next) => {
//     console.log("roles", roles);
//     console.log("role ", req.role);
//     if (!roles.includes(req.role)) {
//       throw new MyError("Уг үйлдэлийг хийх эрхгүй байна. ", 403);
//     }
//     next();
//   };
// };

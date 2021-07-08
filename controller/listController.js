const List = require("../models/listModel");
const asyncHandler = require("../utility/asyncHandler");
const MyError = require("../utility/myError");
// buh jigsaaltiig awana
exports.getLists = asyncHandler(async (req, res, next) => {
  const list = await List.find({ userId: req.body.userId });
  res.send({
    success: true,
    data: list,
  });
});

// nemelt medeele oruulah
exports.createList = asyncHandler(async (req, res, next) => {
  const list = await List.create(req.body);
  res.send({
    success: true,
    data: list,
  });
});

//medeelel ustagah
exports.deleteList = asyncHandler(async (req, res, next) => {
  const list = await List.findOne({ _id: req.params.id });
  if (!list) {
    throw new MyError("Тэмдэглэл олдсонгүй", 200);
  }
  console.log(`id : ${req.params.id} userid:${req.body.userId}`);
  if (list.userId == req.body.userId) {
    list.remove();
  } else {
    throw new MyError("Танд энийг устагах эрх байхгүй байна", 200);
  }
  res.send({
    success: true,
    data: list,
  });
});

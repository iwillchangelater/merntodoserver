const express = require("express");
const router = express.Router();

const {
  getLists,
  createList,
  deleteList,
} = require("../controller/listController");
const { protect } = require("../utility/protect");

router.route("/").get(protect, getLists).post(protect, createList);
router.route("/:id").delete(protect, deleteList);
module.exports = router;

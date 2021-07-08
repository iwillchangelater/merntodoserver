const express = require("express");
const {
  login,
  signup,
  forgetPassword,
  deleteAcc,
  signout,
} = require("../controller/userController");
const { protect } = require("../utility/protect");
const router = express.Router();

router.route("/").post(signup).delete(protect, deleteAcc);
router.route("/login").post(login);
router.route("/reset-password").get(forgetPassword);
router.route("/logout").get(signout);
module.exports = router;

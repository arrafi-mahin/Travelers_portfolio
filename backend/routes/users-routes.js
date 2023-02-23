const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const userController = require("../controller/users-controller");
router.post(
  "/signup",
  [
    check("email").isEmail(),
    check("name").notEmpty(),
    check("password").isLength({ min: 5, max: 20 }),
  ],
  userController.userSignUp
);
router.post("/login", userController.userLogin);
router.get("/:uid", userController.getUserById);
router.get("/", userController.getUserList);
module.exports = router;

const express = require("express");
const { check } = require("express-validator");
const placesController = require("../controller/places-controller");
const fileUpload = require("../Middleware/file-upload");
const checkAuth = require("../Middleware/check-auth");
const router = express.Router();

router.get("/:pid", placesController.getPlaceById);
router.get("/user/:uid", placesController.getPlaceByUserId);

router.use(checkAuth);

router.post(
  "/",
  fileUpload.single("image"),
  [
    check("title").notEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").notEmpty(),
  ],
  placesController.createPlace
);
router.patch(
  "/:pid",
  [check("title").notEmpty(), check("description").isLength({ min: 5 })],
  placesController.updatePlaceById
);
router.delete("/:pid", placesController.deletePlaceById);
module.exports = router;

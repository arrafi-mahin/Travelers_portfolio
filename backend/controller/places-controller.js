const fs = require("fs");
const HttpError = require("../Models/http-error");
const { validationResult } = require("express-validator");
const Place = require("../Models/place");
const User = require("../Models/User");
const mongoose = require("mongoose");
const placeCoords = require('../Util/location')
const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError("Something went wrong", 500);
    return;
  }
  if (!place) {
    const error = new HttpError(
      "Could not find a place for the provided id.",
      404
    );
    return next(error);
  }
  res.json({ place: place.toObject({ getters: true }) });
};
const getPlaceByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  // let place;
  let userWithPlaces;
  try {
    // place = await Place.find({ creator: userId }).exec();
    userWithPlaces = await User.findById(userId).populate("places");
  } catch (err) {
    const error = new HttpError(
      "Fetching places failed for the provided user id",
      500
    );

    return next(error);
  }
  if (!userWithPlaces || userWithPlaces.length === 0) {
    return next(
      new HttpError("Could not find any place for the provided id.", 404)
    );
  }
  res.json({
    places: userWithPlaces.places.map((p) => p.toObject({ getters: true })),
  });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid Input. Please input valid information", 422)
    );
  }
  const { title, description, address } = req.body;
  const coords = await placeCoords(address).then(res => {return res});

  const createdPlace = new Place({
    title,
    description,
    location: {
      lat: coords.lat,
      lng: coords.lng
    },
    address,
    image: req.file.path,
    creator: req.userData.userId,
  });
  let user;

  try {
    user = await User.findById(req.userData.userId);
  } catch (errors) {
    const error = new HttpError("Creating place failed, please try again", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("we could not find user for provided id", 500);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();

    await createdPlace.save({ session: sess });
    user.places.push(createdPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (errors) {
   
    const error = new HttpError("Creating Faild", 500);
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};

const updatePlaceById = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid Input. Please input valid information", 422)
    );
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError("Updating Faild", 500);
    return next(error);
  }
  if (place.creator.toString() !== req.userData.userId) {
    const error = new HttpError(
      "You are not allowed to update this place",
      401
    );
    return next(error);
  }
  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (errors) {
    const error = new HttpError("something went wrong", 500);
    return next(error);
  }
  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlaceById = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId).populate("creator");
  } catch (err) {
    const errors = new HttpError("Something went wrong here", 500);

    return next(errors);
  }
  if (place.creator.id !== req.userData.userId) {
    const error = new HttpError(
      "You are not allowed to delete this place",
      401
    );
    return next(error);
  }
  const imagePath = place.image;
  if (!place) {
    const error = new HttpError("Place not found", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.remove({ session: sess });
    place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    sess.commitTransaction();
  } catch (err) {
    const errors = new HttpError("Deleting failed 2", 500);
  }
  fs.unlink(imagePath, (err) => console.log(err));
  res.status(200).json({ message: "Place deleted." });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.deletePlaceById = deletePlaceById;
exports.updatePlaceById = updatePlaceById;

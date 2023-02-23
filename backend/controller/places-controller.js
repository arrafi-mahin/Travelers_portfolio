const HttpError = require("../Models/http-error");
const { uuid } = require("uuidv4");
const { validationResult } = require("express-validator");
const Place = require("../Models/Place");
const User = require("../Models/User");
const mongoose = require("mongoose");
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
  let place;
  try {
    place = await Place.find({ creator: userId }).exec();
    console.log(place);
  } catch (err) {
    const error = new HttpError(
      "Fetching places faild for the provided user id",
      500
    );

    return next(error);
  }
  if (!place || place.length === 0) {
    return next(
      new HttpError("Could not find any place for the provided id.", 404)
    );
  }
  res.json({
    places: place.map((p) => p.toObject({ getters: true })),
  });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  // console.log(errors);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid Input. Please input valid information", 422)
    );
  }
  const { title, description, coordinates, address, creator } = req.body;

  const createdPlace = new Place({
    title,
    description,
    location: coordinates,
    address,
    image: "https://source.unsplash.com/random/300×300",
    creator,
  });
  let user;

  try {
    user = await User.findById(creator);
  } catch (errors) {
    const error = new HttpError("Creating place failed, please try again", 500);
    return next(error);
  }

  console.log(user);
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

    return res.json();
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
    place = await Place.findById(placeId).exec();
    console.log(place);
  } catch (err) {
    const errors = new HttpError("Deleting failed", 500);

    return next(errors);
  }

  try {
    await place.remove();
  } catch (err) {
    const errors = new HttpError("Deleting failed 2", 500);
  }
  res.status(200).json({ message: "Place deleted." });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.deletePlaceById = deletePlaceById;
exports.updatePlaceById = updatePlaceById;

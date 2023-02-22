const HttpError = require("../Models/http-error");
const { uuid } = require("uuidv4");
const { validationResult } = require("express-validator");
const Place = require("../Models/place");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "empire State Building",
    description: "one of the most famous sky scrapers in the world",
    imageUrl: "https://source.unsplash.com/random/652×450/?city",
    address:
      "Empire State Building, Empire State Building, West 34th Street, New York, NY, USA",
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "empire State Building",
    description: "one of the most famous sky scrapers in the world",
    imageUrl: "https://source.unsplash.com/random/651×450/?city",
    address:
      "Empire State Building, Empire State Building, West 34th Street, New York, NY, USA",
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    creator: "u2",
  },
  {
    id: "p3",
    title: "empire State Building",
    description: "one of the most famous sky scrapers in the world",
    imageUrl: "https://source.unsplash.com/random/650×450/?city",
    address:
      "Empire State Building, Empire State Building, West 34th Street, New York, NY, USA",
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    creator: "u2",
  },
  {
    id: "p4",
    title: "empire State Building",
    description: "one of the most famous sky scrapers in the world",
    imageUrl: "https://source.unsplash.com/random/650×451/?city",
    address:
      "Empire State Building, Empire State Building, West 34th Street, New York, NY, USA",
    location: {
      lat: 23.877401,
      lng: 90.4119781,
    },
    creator: "u4",
  },
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  if (!place) {
    throw new HttpError("Could not find a place for the provided id.", 404);
  }
  res.json({ place });
};
const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.filter((p) => {
    return p.creator === userId;
  });
  if (place.length === 0) {
    return next(
      new HttpError("Could not find any place for the provided id.", 404)
    );
  }
  res.json({ place });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid Input. Please input valid information", 422);
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

  try {
    const result = await createdPlace.save();
    res.json(result);
  } catch (errors) {
    const error = new HttpError("Creating Faild", 500);
    return next(error);
  }
  // res.send("responsed");
  res.status(201).json({ place: createdPlace });
};

const updatePlaceById = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid Input. Please input valid information", 422);
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;
  const updatePlace = DUMMY_PLACES.find((p) => {
    if (p.id == placeId) {
      p.title = title;
      p.description = description;
      return p;
    }
  });
  if (!updatePlace) {
    throw new HttpError("Place id Could not find.", 404);
  }
  res.status(201).json({ place: updatePlace });
};

const deletePlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);

  res.status(200).json({ message: "Place deleted." });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.deletePlaceById = deletePlaceById;
exports.updatePlaceById = updatePlaceById;

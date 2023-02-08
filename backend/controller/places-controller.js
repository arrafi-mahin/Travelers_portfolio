const HttpError = require("../Models/http-error");
const { uuid } = require("uuidv4");
const DUMMY_PLACES = [
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
    creator: "u1",
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
  if (!place) {
    return next(
      new HttpError("Could not find a place for the provided id.", 404)
    );
  }
  res.json({ place });
};

const createPlace = (req, res, next) => {
  console.log(req.body);
  const { title, description, coordinates, address, creator } = req.body;
  console.log(req.body);
  const createdPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);
  // res.send("responsed");
  res.status(201).json({ place: createdPlace });
};

const updatePlaceById = (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;
  const updatePlace = DUMMY_PLACES.find((p) => {
    console.log(p + "id: " + placeId);
    if (p.id == placeId) {
      p.title = title;
      p.description = description;
      return p;
    }
    // if (!updatePlace) {
    //   throw new HttpError("Place id Could not find.", 404);
    // }
  });
  res.status(201).json({ place: updatePlace });
};

const deletePlaceById = (req, res, next) => {
  const userId = req.params.pid;
  console.log(DUMMY_PLACES.indexOf(userId));
  res.send("request accepted");
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.deletePlaceById = deletePlaceById;
exports.updatePlaceById = updatePlaceById;

// const express = require("express");

// const router = express.Router();

// const DUMMY_PLACES = [
//   {
//     id: "p1",
//     title: "empire State Building",
//     description: "one of the most famous sky scrapers in the world",
//     imageUrl: "https://source.unsplash.com/random/652×450/?city",
//     address:
//       "Empire State Building, Empire State Building, West 34th Street, New York, NY, USA",
//     location: {
//       lat: 40.7484405,
//       lng: -73.9856644,
//     },
//     creator: "u1",
//   },
//   {
//     id: "p2",
//     title: "empire State Building",
//     description: "one of the most famous sky scrapers in the world",
//     imageUrl: "https://source.unsplash.com/random/651×450/?city",
//     address:
//       "Empire State Building, Empire State Building, West 34th Street, New York, NY, USA",
//     location: {
//       lat: 40.7484405,
//       lng: -73.9856644,
//     },
//     creator: "u1",
//   },
//   {
//     id: "p3",
//     title: "empire State Building",
//     description: "one of the most famous sky scrapers in the world",
//     imageUrl: "https://source.unsplash.com/random/650×450/?city",
//     address:
//       "Empire State Building, Empire State Building, West 34th Street, New York, NY, USA",
//     location: {
//       lat: 40.7484405,
//       lng: -73.9856644,
//     },
//     creator: "u2",
//   },
//   {
//     id: "p4",
//     title: "empire State Building",
//     description: "one of the most famous sky scrapers in the world",
//     imageUrl: "https://source.unsplash.com/random/650×451/?city",
//     address:
//       "Empire State Building, Empire State Building, West 34th Street, New York, NY, USA",
//     location: {
//       lat: 23.877401,
//       lng: 90.4119781,
//     },
//     creator: "u4",
//   },
// ];

// router.get("/:uid", (req, res, next) => {
//   const userId = req.params.uid;
//   const user = DUMMY_PLACES.filter((p) => {
//     return p.creator === userId;
//   });
//   res.json({ user });
// });

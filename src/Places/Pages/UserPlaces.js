import React from "react";
import PlaceList from "../Components/PlaceList";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "empire State Building",
    description: "one of the most famous sky scrapers in the world",
    imageUrl:
      "https://media.cnn.com/api/v1/images/stellar/prod/130802164459-skyscrapers-gallery-empire-state-building.jpg?q=x_3,y_135,h_1684,w_2994,c_crop/h_720,w_1280",
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
    imageUrl:
      "https://www.history.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_686/MTU3ODc4NjA0ODYzOTA3NTUx/image-placeholder-title.webp",
    address:
      "Empire State Building, Empire State Building, West 34th Street, New York, NY, USA",
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    creator: "u2",
  },
];
function UserPlaces(props) {
  return <PlaceList items={DUMMY_PLACES} />;
}

export default UserPlaces;

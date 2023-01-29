import React from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../Components/PlaceList";

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
    creator: "u3",
  },
  {
    id: "p4",
    title: "empire State Building",
    description: "one of the most famous sky scrapers in the world",
    imageUrl: "https://source.unsplash.com/random/650×451/?city",
    address:
      "Empire State Building, Empire State Building, West 34th Street, New York, NY, USA",
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    creator: "u4",
  },
];
function UserPlaces(props) {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
}

export default UserPlaces;

import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "./Map.css";

const MapLayer = (props) => {
  return (
    <MapContainer
      center={props.center}
      zoom={16}
      scrollWheelZoom={true}
      style={{ height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={props.center}>
        <Popup>{props.name}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapLayer;

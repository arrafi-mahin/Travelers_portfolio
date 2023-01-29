// import React from "react";
// import "./Map.css";
// function Map(props) {
//   return <div className={`map ${props.className}`} style={props.style}></div>;
// }

// export default Map;
import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";

import "./Map.css";

const Map = (props) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [API_KEY] = useState("a5wpZOSMqDjVVWcFXrYv");

  useEffect(() => {
    if (map.current) return; //stops map from intializing more than once
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [props.center.lng, props.center.lat],
      zoom: props.zoom,
    });

    map.current.addControl(new maplibregl.NavigationControl(), "top-right");
    new maplibregl.Marker({ color: "#FF0000" })
      .setLngLat([props.center.lng, props.center.lat])
      .addTo(map.current);
  });
  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
};

export default Map;

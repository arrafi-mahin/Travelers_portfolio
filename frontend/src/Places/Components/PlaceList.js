import React from "react";
import "./PlaceList.css";
import Card from "../../Shared/Components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import Button from "../../Shared/Components/FormElements/Button";
function PlaceList(props) {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card className="empty-list">
          <h3>No Places fount. Maybe create one?</h3>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  }
  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
          onDelete={props.onDeletePlace}
        />
      ))}
    </ul>
  );
}

export default PlaceList;

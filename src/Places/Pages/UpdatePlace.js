import React from "react";
import { useParams } from "react-router-dom";
import Button from "../../Shared/Components/FormElements/Button";
import Input from "../../Shared/Components/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../Shared/Util/Validators";
import { useForm } from "../../Shared/hooks/form-hook";
import "./placeForm.css";
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
      lat: 23.877401,
      lng: 90.4119781,
    },
    creator: "u4",
  },
];

function UpdatePlace(props) {
  const placeId = useParams().placeId;

  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: identifiedPlace.title,
        isValid: true,
      },
      description: {
        value: identifiedPlace.description,
        isValid: true,
      },
    },
    true
  );
  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };
  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find Place!</h2>
      </div>
    );
  }
  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        label="Title"
        element="input"
        type="text"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please input a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        label="Description"
        element="textarea"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please input a valid description."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
}

export default UpdatePlace;

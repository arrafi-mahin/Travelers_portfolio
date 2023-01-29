import React from "react";
import Input from "../../Shared/Components/FormElements/Input";
import "./NewPlace.css";
function NewPlace(props) {
  return (
    <form className="place-form">
      <Input
        element="input"
        type="text"
        label="title"
        validators={[]}
        errorText="Please Enter a valid Title."
      />
    </form>
  );
}

export default NewPlace;

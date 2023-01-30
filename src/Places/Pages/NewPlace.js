import React from "react";
import Input from "../../Shared/Components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../Shared/Util/Validators";
import "./NewPlace.css";
function NewPlace(props) {
  return (
    <form className="place-form">
      <Input
        element="input"
        type="text"
        label="title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please Enter a valid Title."
      />
    </form>
  );
}

export default NewPlace;

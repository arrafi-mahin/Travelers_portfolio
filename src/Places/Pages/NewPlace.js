import React, { useCallback, useReducer } from "react";
import Input from "../../Shared/Components/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../Shared/Util/Validators";
import "./NewPlace.css";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in action.inputId) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return;
    default:
      return state;
  }
};
function NewPlace(props) {
  useReducer(formReducer, {
    inputs: {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },

    isValid: false,
  });
  const titleChangeHandler = useCallback((id, value, isValid) => {}, []);
  const descriptionChangeHandler = useCallback((id, value, isValid) => {}, []);
  return (
    <form className="place-form">
      <Input
        id="title"
        element="input"
        type="text"
        label="title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please Enter a valid Title."
        onInput={titleChangeHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please Enter a valid description (Minimum 5 charecter)."
        onInput={descriptionChangeHandler}
      />
    </form>
  );
}

export default NewPlace;

import React, { Fragment, useContext } from "react";
import Input from "../../Shared/Components/FormElements/Input";
import Button from "../../Shared/Components/FormElements/Button";
import ImageUpload from "../../Shared/Components/FormElements/ImageUpload";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../Shared/Util/Validators";
import { AuthContext } from "../../Shared/Context/Auth-context";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";
import { useForm } from "../../Shared/hooks/form-hook";
import { useHttpClient } from "../../Shared/hooks/http-hook";
import "./placeForm.css";

function NewPlace(props) {
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );
  const navigate = useNavigate();
  const placeSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("image", formState.inputs.image.value);
      // formData.append("location", location);
      await sendRequest("http://localhost:5000/api/places/", "POST", formData, {
        authorization: "Bearer " + auth.token,
      });
      //Redirect user to different page
      navigate("/");
    } catch (err) {}
  };
  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please Enter a valid Title."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please Enter a valid description (Minimum 5 charecter)."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please Enter a valid Address."
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please Provide an image."
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </Fragment>
  );
}

export default NewPlace;

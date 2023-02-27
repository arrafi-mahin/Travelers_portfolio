import React, { useState, useContext, Fragment } from "react";
import Input from "../../Shared/Components/FormElements/Input";
import Button from "../../Shared/Components/FormElements/Button";
import ImageUpload from "../../Shared/Components/FormElements/ImageUpload";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../Shared/Util/Validators";
import { useForm } from "../../Shared/hooks/form-hook";
import { AuthContext } from "../../Shared/Context/Auth-context";
import { useHttpClient } from "../../Shared/hooks/http-hook";
import Card from "../../Shared/Components/UIElements/Card";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import Loading from "../../Shared/Components/UIElements/LoadingSpinner";
import "./Auth.css";

function Auth(props) {
  const [isLogin, setIsLogin] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLogin) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("email", formState.inputs.email.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          formData
        );

        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    }
  };
  const switchModelHandler = () => {
    if (!isLogin) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid,
        formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
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
    }
    setIsLogin(!isLogin);
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <Loading asOverlay />}
        {}
        <h2>{isLogin ? "Login" : "Sign Up"} Required.</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLogin && (
            <Input
              id="name"
              element="input"
              placeHolder="Name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Input a valid Name."
              onInput={inputHandler}
            />
          )}
          <Input
            id="email"
            element="input"
            placeHolder="Email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please Input a valid email address."
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            placeHolder="Password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please Input a valid Password at least 6 charecter."
            onInput={inputHandler}
          />
          {!isLogin && (
            <ImageUpload
              center
              id="image"
              onInput={inputHandler}
              errorText="Please Provide an image."
            />
          )}
          <Button type="submit" disabled={!formState.isValid}>
            {isLogin ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse onClick={switchModelHandler}>
          SWITCH TO {isLogin ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
    </Fragment>
  );
}

export default Auth;

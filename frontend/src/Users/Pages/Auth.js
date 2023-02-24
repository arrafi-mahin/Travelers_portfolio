import React, { useState, useContext } from "react";
import Input from "../../Shared/Components/FormElements/Input";
import Button from "../../Shared/Components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../Shared/Util/Validators";
import { useForm } from "../../Shared/hooks/form-hook";
import { AuthContext } from "../../Shared/Context/Auth-context";
import Card from "../../Shared/Components/UIElements/Card";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import Loading from "../../Shared/Components/UIElements/LoadingSpinner";
import "./Auth.css";

function Auth(props) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
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
    } else {
      try {
        setIsLoading(true);

        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });
        const responseData = await response.json();
        console.log(response.ok);
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        console.log(responseData);
        setIsLoading(false);
        auth.login();
      } catch (err) {
        console.log(err);
        setError(err.message || "Somthing went wrong. please try again.");
        setIsLoading(false);
      }
    }
  };
  const switchModelHandler = () => {
    if (!isLogin) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
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
        },
        false
      );
    }
    setIsLogin(!isLogin);
  };
  return (
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
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please Input a valid Password at least 5 charecter."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLogin ? "LOGIN" : "SIGNUP"}
        </Button>
      </form>
      <Button inverse onClick={switchModelHandler}>
        SWITCH TO {isLogin ? "SIGNUP" : "LOGIN"}
      </Button>
    </Card>
  );

  //   if (!isLogin) {
  //     return (
  //       <Card className="authentication">
  //         <h2>Signup</h2>
  //         <hr />
  //         <Input
  //           id="name"
  //           element="input"
  //           placeHolder="Name"
  //           type="text"
  //           label="Name"
  //           validators={[VALIDATOR_REQUIRE]}
  //           errorText="Please Input a valid name."
  //           onInput={inputHandler}
  //         />
  //         <Input
  //           id="email"
  //           element="input"
  //           placeHolder="Email"
  //           type="email"
  //           label="E-Mail"
  //           validators={[VALIDATOR_EMAIL()]}
  //           errorText="Please Input a valid email address."
  //           onInput={inputHandler}
  //         />
  //         <Input
  //           id="password"
  //           element="input"
  //           placeHolder="Password"
  //           type="password"
  //           label="Password"
  //           validators={[VALIDATOR_MINLENGTH(5)]}
  //           errorText="Please Input a valid Password at least 5 charecter."
  //           onInput={inputHandler}
  //         />
  //         <Button type="submit" disabled={!formState.isValid}>
  //           SIGNUP
  //         </Button>
  //         <Button
  //           inverse
  //           onClick={() => {
  //             setIsLogin(!isLogin);
  //           }}
  //         >
  //           SWITCH
  //         </Button>
  //       </Card>
  //     );
  //   }
}

export default Auth;

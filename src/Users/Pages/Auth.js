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
import "./Auth.css";

function Auth(props) {
  const [isLogin, setIsLogin] = useState(true);
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

  const authSubmitHandler = (event) => {
    event.preventDefault();

    auth.login();
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

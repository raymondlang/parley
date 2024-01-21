import React, { useState } from "react";

import * as sessionActions from "../../store/session";

import { useDispatch, useSelector } from "react-redux";

import { Redirect } from "react-router-dom";

import "./SignupPage.css";

import SessionHeader from "../SessionHeader";

import SessionForm from "../SessionForm";

const SignupPage = () => {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();

    return dispatch(sessionActions.signup({ email, password })).catch(
      async (res) => {
        let data;

        try {
          // .clone() essentially allows you to read the response body twice

          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }

        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      }
    );
  };

  const handleSetEmail = (e) => setEmail(e.target.value);

  const handleSetPassword = (e) => setPassword(e.target.value);

  return (
    <div className="signup-page">
      <SessionHeader type="signup" />

      <SessionForm
        handleSubmit={handleSubmit}
        email={email}
        handleSetEmail={handleSetEmail}
        password={password}
        handleSetPassword={handleSetPassword}
        buttonText="Continue"
      />

      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </div>
  );
};

export default SignupPage;

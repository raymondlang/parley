import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./SignPage.css";
import SessionHeader from "../SessionHeader";
import SessionForm from "../SessionForm";
import SessionSplitter from "../SessionSplitter";
import DemoButton from "../DemoButton";

const SignupPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    document.body.classList.remove("purple");
    document.body.classList.add("white");
  }, []);

  useEffect(() => {
    document.body.classList.remove("purple");
    document.body.classList.add("white");
  }, []);

  if (sessionUser)
    return <Redirect to={`/client/${sessionUser.id}/get-started/landing`} />;

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
    <div className="sign-page">
      <SessionHeader type="signup" />

      <SessionForm
        handleSubmit={handleSubmit}
        email={email}
        errors={errors}
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
      <SessionSplitter />
      <DemoButton classNm={"demo-button-session"} />
      <div className="signin-redirect">
        <p className="signin-redirect-text">Already using Parley?</p>
        <Link to="/signin" className="signin-redirect-link">
          Sign in to an existing workspace
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;

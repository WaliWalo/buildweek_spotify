import React, { useState } from "react";
import "../styles/login.css";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from "react-router-dom";
import { Alert, Button } from "react-bootstrap";
import { login } from "../apis/auth";

const Login = () => {
  // window.fbAsyncInit = function () {
  //   FB.init({
  //     appId: "{your-app-id}",
  //     cookie: true,
  //     xfbml: true,
  //     version: "{api-version}",
  //   });

  //   FB.AppEvents.logPageView();
  // };

  // (function (d, s, id) {
  //   var js,
  //     fjs = d.getElementsByTagName(s)[0];
  //   if (d.getElementById(id)) {
  //     return;
  //   }
  //   js = d.createElement(s);
  //   js.id = id;
  //   js.src = "https://connect.facebook.net/en_US/sdk.js";
  //   fjs.parentNode.insertBefore(js, fjs);
  // })(document, "script", "facebook-jssdk");

  // FB.getLoginStatus(function(response) {
  //   statusChangeCallback(response);
  // });
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState({ message: "", color: "" });
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    let name = e.currentTarget.id;
    let value = e.currentTarget.value;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    handleLogin(credentials);
  };

  const history = useHistory();

  const handleLogin = async (credentials) => {
    try {
      let res = await login(credentials);
      if (res.ok) {
        // let { token } = await res.json();
        // console.log(token);
        // localStorage.setItem("bearer_token", token);
        setShow(true);
        setAlert({ message: "Login successful", color: "success" });
        history.push("/");
      } else {
        // console.log(await res.json());
        let { error } = await res.json();
        setShow(true);
        setAlert({ message: error, color: "danger" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {show && (
        <Alert variant={alert.color} onClose={() => setShow(false)} dismissible>
          {alert.message}
        </Alert>
      )}
      <section className="container-fluid login">
        <div className="login-logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="login-container">
          <span> To continue, log in to Spotify.</span>
          <div className="login-button login-facebook">
            <span>CONTINUE WITH FACEBOOK</span>
          </div>
          <div className="login-button login-apple">
            <span>CONTINUE WITH APPLE</span>
          </div>
          <div className="login-button login-google">
            <span>CONTINUE WITH GOOGLE</span>
          </div>
          <div className="d-flex flex-row">
            <hr />
            OR
            <hr />
          </div>
          <div className="input-group">
            <span>Email address or Username</span>
            <input
              id="email"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Email address or username"
            />
            <span>Password</span>
            <input
              id="password"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Password"
              type="password"
            />
          </div>
          <p>
            <a className="forgot-password">
              Forget your password?
            </a>
          </p>
          <div className="login-btn">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" for="customCheck1">
                Remember Me
              </label>
            </div>
            <Link as={Button} onClick={handleSubmit}>
              <div href="#" className="login-button login-spotify">
                LOG IN
              </div>
            </Link>
          </div>
          <hr />
          <div className="login-footer">
            <span>Don't have an account?</span>
            <Button href="/signup" className="login-button login-signup" >
              <span >SIGN UP ON SPOTIFY</span>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;

import React from "react";
import "../styles/login.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

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
  return (
    <>
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
            <input placeholder="Email address or username" />
            <span>Password</span>
            <input placeholder="Password" type="password" />
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

            <Link to="/">
              <div className="login-button login-spotify">
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

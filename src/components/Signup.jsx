import React, { PureComponent } from "react";
import { Container, Image, Row, Col, Button, Form } from "react-bootstrap";
import logo from "../assets/logo.png";
import "../styles/signup.css";

class Signup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
  }

  onChangeHanlder = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = async (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:4000/users/register", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

  render() {
    const { firstName, lastName, email, password } = this.state;
    return (
      <Container className="signup-container">
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Image className="signup-logo-image " src={logo} alt="logo" />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <h2>Sign up for free to start listening.</h2>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Button
              className="signup-spotify-button"
              href="http://127.0.0.1:4000/users/spotifyRedirect"
            >
              SIGN UP WITH SPOTIFY (lol)
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Button
              className="signup-google-button"
              href="http://127.0.0.1:4000/users/googleLogin"
            >
              SIGN UP WITH GOOGLE
            </Button>
          </Col>
        </Row>
        <hr className="signup-hr" data-content="depresiòn" />
        <Row className="justify-content-md-center">
          <Col md="auto">
            <h6>Sign up with your email address</h6>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Form className="signup-form">
              <Form.Group controlId="formBasicSurname">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="Name"
                  value={firstName}
                  name="firstName"
                  placeholder="Enter your first name"
                  required
                  onChange={(e) => {
                    this.onChangeHanlder(e);
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formBasicName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="Name"
                  value={lastName}
                  name="lastName"
                  placeholder="Enter your last name"
                  required
                  onChange={(e) => {
                    this.onChangeHanlder(e);
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="Name"
                  value={email}
                  name="email"
                  placeholder="Enter your email"
                  required
                  onChange={(e) => {
                    this.onChangeHanlder(e);
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  name="password"
                  placeholder="Password"
                  required
                  onChange={(e) => {
                    this.onChangeHanlder(e);
                  }}
                />
                <Form.Text className="text-muted">
                  We'll never share your password with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="You agree TOS of spotify"
                  required
                />
              </Form.Group>
              <Button
                className="signup-normal-button"
                type="submit"
                href="/login"
                onClick={(e) => {
                  this.onSubmitHandler(e);
                }}
              >
                Sign up
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Signup;

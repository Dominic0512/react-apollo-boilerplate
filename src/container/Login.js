import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { useMutation } from "@apollo/react-hooks";
import idx from "idx";

import { LOGIN } from "./schema.gql";

const Login = () => {
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, loginResp] = useMutation(LOGIN, {
    onCompleted: (resp) => {
      const token = idx(resp, (_) => _.login.user.token);
      console.log(token);
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
    },
  });

  if (isAuthenticated) {
    history.replace("/logged-in");
  }

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        login({
          variables: {
            email,
            password,
          },
        });
      }}
    >
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Login;

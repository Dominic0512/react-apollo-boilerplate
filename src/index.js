import React from "react";
import ReactDOM from "react-dom";

import client from "./config/apollo";
import { ApolloProvider } from "@apollo/react-hooks";

import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./page/Login";

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>My first Apollo app 🚀</h2>
      <Login></Login>
    </div>
  </ApolloProvider>
);

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : false;

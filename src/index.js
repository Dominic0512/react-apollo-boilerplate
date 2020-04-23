import React from "react";
import ReactDOM from "react-dom";

import client from "./config/apollo";
import { ApolloProvider } from "@apollo/react-hooks";

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>My first Apollo app 🚀</h2>
    </div>
  </ApolloProvider>
);

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : false;

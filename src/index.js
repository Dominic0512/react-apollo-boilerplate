import React from "react";
import ReactDOM from "react-dom";
import Button from "./components/button";

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<Button />, wrapper) : false;

import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { ME } from "./schema.gql";

const LoggedIn = () => {
  const getMe = useQuery(ME);
  const getMeLoading = getMe.loading;
  const getMeData = getMe.data;
  const getMeError = getMe.error;

  if (getMeLoading) return "Loading...";
  if (getMeError) return `Error! ${getMeError.message}`;

  return (
    <div>
      <h1>Logged In!!!!!</h1>
      <pre>{JSON.stringify(getMeData)}</pre>
    </div>
  );
};

export default LoggedIn;

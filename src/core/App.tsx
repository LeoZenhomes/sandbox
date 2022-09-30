import { Box, Button } from "@material-ui/core";
import React from "react";
import { Form, Header } from "./components";
import { ErrorMonitor } from "./lib";

import "./App.css";
import ImageDogeUrl from "./assets/doge.jpg"; // includes domain and port
import { useGetUser } from "./repositories";
import(/* webpackPreload: true */ "lodash");

export const App = () => {
  const { data: user } = useGetUser();

  const onClick = async () => {
    const { default: _ } = await import(
      /* webpackChunkName: "lodash" */ "lodash"
    );

    alert(_.join(["this", "actually", "worked"], " "));
  };

  return (
    <div className="root">
      <Header />
      <img style={{ height: "400px", width: "400px" }} src={ImageDogeUrl} />
      <Form />
      <Button variant="outlined" color="primary" onClick={() => onClick()}>
        Clicky
      </Button>

      <div>{JSON.stringify(user)}</div>

      <Box mt={1}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            ErrorMonitor.logException(new Error("some bug " + Math.random()));
          }}
        >
          Throw error
        </Button>
      </Box>
    </div>
  );
};

import { Form, Header } from "@app/components";
import { Box, Button } from "@material-ui/core";
import { ErrorMonitorApp } from "./lib/error-monitor";
import React from "react";
import ReactDOM from "react-dom";
import ImageDogeUrl from "./assets/doge.jpg"; // includes domain and port
import "./index.css";

import(/* webpackPreload: true */ "lodash");

export const App = () => {
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

      <Box mt={1}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            ErrorMonitorApp.logException(new Error("some bug"));
          }}
        >
          Throw error
        </Button>
      </Box>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

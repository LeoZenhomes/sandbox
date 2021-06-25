import { Button } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import ImageDogeUrl from "./assets/doge.jpg"; // includes domain and port
import { Form, Header } from "@app/components";
import "./index.css";

import(/* webpackPreload: true */ "lodash");

const App = () => {
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

            <Button variant="outlined" color="primary" onClick={() => onClick()}>Clicky</Button>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));

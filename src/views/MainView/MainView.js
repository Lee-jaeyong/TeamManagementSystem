import React from "react";
import { Fade } from "@material-ui/core";

export default function MainView() {
  return (
    <React.Fragment>
      <Fade in timeout={1500}>
        <iframe
          src="../docs.html"
          style={{ width: 1580, height: 1000 }}
          frameBorder="0"
        ></iframe>
      </Fade>
    </React.Fragment>
  );
}

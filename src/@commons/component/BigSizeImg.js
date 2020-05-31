import React from "react";
import Dialog from "@material-ui/core/Dialog";

export default function BigSizeImg({ open, handleClose, imgByte }) {
  return (
    <div>
      <Dialog maxWidth={"md"} fullWidth open={open} onClose={handleClose}>
        <img src={imgByte} style={{ width: "100%", height: "100%" }} />
      </Dialog>
    </div>
  );
}

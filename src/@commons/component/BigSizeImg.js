import React from "react";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

export default function BigSizeImg({ open, handleClose, imgByte }) {
  return (
    <div>
      <Dialog maxWidth={"xl"} fullWidth open={open} onClose={handleClose}>
        <div style={{ position: "absolute" }}>
          <IconButton onClick={() => handleClose()}>
            <ExitToAppIcon style={{ color: "white" }} />
          </IconButton>
        </div>
        <img
          src={imgByte}
          style={{ width: "100%", height: 900, cursor: "pointer" }}
          onClick={() => handleClose()}
        />
      </Dialog>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function ConfirmDialog(props) {
  const [open, setOpen] = useState(props["open"]);

  const yseClick = () => {
    props.yseClick();
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    if (props["handleClose"]) props["handleClose"]();
  };

  useEffect(() => {
    setOpen(props["open"]);
  }, [props["open"]]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props["title"]}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props["content"]}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={yseClick} color="primary">
            예
          </Button>
          <Button onClick={handleClose} color="primary">
            아니오
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

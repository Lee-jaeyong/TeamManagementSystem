import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { showConfirmHandle } from "@store/actions/ConfirmAction";

const ConfirmDialog = () => {
  const dispatch = useDispatch();
  const confirmDialogState = useSelector(({ Confirm }) => Confirm);
  const handleClose = useCallback(() => {
    dispatch(
      showConfirmHandle({
        open: false,
        yseClick: () => {},
      })
    );
  }, []);

  const yseClick = () => {
    confirmDialogState['yseClick']();
    handleClose();
  }

  return (
    <div>
      <Dialog open={confirmDialogState["open"]} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {confirmDialogState["title"]}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {confirmDialogState["content"]}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={yseClick}>예</Button>
          <Button onClick={handleClose} color="primary">
            아니오
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;

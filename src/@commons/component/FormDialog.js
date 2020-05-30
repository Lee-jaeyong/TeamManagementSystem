import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { showForm } from "@store/actions/FormAction";
import { showMessageHandle } from "@store/actions/MessageAction";

export default function FormDialog() {
  const inputValue = useRef();
  const dispatch = useDispatch();
  const formDialogState = useSelector((state) => state["Form"]);

  const handleClose = () => {
    dispatch(showForm({ open: false, yesClick: () => {} }));
  };

  const yseClick = () => {
    if (inputValue.current.value.trim() === "") {
      dispatch(
        showMessageHandle({
          open: true,
          content: "빈값은 저장할 수 없습니다.",
          level: "warning",
        })
      );
      inputValue.current.focus();
    }else{
        formDialogState["yseClick"](inputValue.current.value);
        handleClose();
    }
  };

  return (
    <Dialog open={formDialogState["open"]} onClose={handleClose}>
      <DialogTitle>{formDialogState["title"]}</DialogTitle>
      <DialogContent>
        <DialogContentText>{formDialogState["content"]}</DialogContentText>
        <TextField autoFocus margin="dense" fullWidth inputRef={inputValue} />
      </DialogContent>
      <DialogActions>
        <Button onClick={yseClick} color="primary">
          확 인
        </Button>
        <Button onClick={handleClose} color="primary">
          취 소
        </Button>
      </DialogActions>
    </Dialog>
  );
}

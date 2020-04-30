import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Badge from "@material-ui/core/Badge";
import { Divider, colors } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import CreateIcon from "@material-ui/icons/Create";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

import Typography from "@material-ui/core/Typography";

export default function ImgUpdateDlg(props) {
  const [open, setOpen] = useState(props["open"]);

  const handleClose = () => {
    props.ImgUpdateDlgClose();
    setOpen(false);
  };

  useEffect(() => {
    setOpen(props["open"]);
  }, [props["open"]]);

  return (
    <Dialog
      fullWidth
      //   scroll="body"
      //   PaperComponent="div"
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle style={{ background: "#3f51b5", color: "white" }}>
        변경할 이미지를 등록해주세요
      </DialogTitle>
      <DialogContent>ㅇㄴㄹㄴ</DialogContent>
    </Dialog>
  );
}

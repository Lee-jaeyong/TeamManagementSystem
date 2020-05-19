import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import { Divider } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";

export default function UpdateProfileDlg(props) {
  const [open, setOpen] = useState(props["open"]);
  const [email, setEmail] = useState(props.email);

  const handleClose = () => {
    props.updateDlgClose();
    setOpen(false);
  };

  useEffect(() => {
    setOpen(props["open"]);
  }, [props["open"]]);

  return (
    <Dialog
      fullWidth
      scroll="body"
      PaperComponent="div"
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <div style={{ position: "relative", top: 60 }}>
          <Avatar
            style={{
              width: 120,
              height: 120,
              boxShadow: "2px 2px 7px 2px #939393",
            }}
            alt="Remy Sharp"
            src="/images/yunjiwon.png"
          />
        </div>
      </Grid>
      <Paper style={{ height: 400, paddingTop: 120 }}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Typography variant="h5" component="h5">
            {props.name}
            <Divider />
          </Typography>
        </Grid>

        <Grid container style={{ padding: 30 }}>
          <Grid item xs={12} style={{ marginBottom: 20 }}>
            <TextField
              style={{ width: "100% " }}
              id="myId"
              label="ID"
              value={props.id}
              readOnly
            />
          </Grid>
          <Grid item xs={12} style={{ marginBottom: 20 }}>
            <TextField
              style={{ width: "100% " }}
              id="myId"
              label="E-mail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          alignItems="flex-start"
          justify="flex-end"
          direction="row"
          style={{ paddingRight: 10, paddingBottom: 10 }}
        >
          <Button variant="contained" color="primary">
            변경
          </Button>
        </Grid>
      </Paper>
    </Dialog>
  );
}

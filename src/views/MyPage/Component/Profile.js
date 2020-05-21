import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import { Divider } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import Avatar from "@material-ui/core/Avatar";
import CreateIcon from "@material-ui/icons/Create";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

import Typography from "@material-ui/core/Typography";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";
import ImgUpdateDlg from "./ImgUpdateDlg.js";
import UpdateProfileDlg from "./UpdateProfileDlg.js";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#EAEAEA",
    color: "#4C4C4C",
    width: 30,
    height: 30,
    borderRadius: "50%",
    "&:hover": {
      backgroundColor: "white",
    },
  },
}))(Badge);

export default function Profile(props) {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [imgUpdateOpen, setImgUpdateOpen] = useState(false);
  return (
    <Paper
      id="profileSection"
      style={{
        position: "relative",
        top: 50,
        marginBottom: 30,
        borderRadius: 7,
      }}
    >
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <div style={{ position: "relative", top: -60 }}>
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent={
              <CreateIcon
                onClick={() => {
                  setImgUpdateOpen(true);
                }}
              />
            }
          >
            <Avatar
              style={{
                width: 120,
                height: 120,
                boxShadow: "2px 2px 7px 2px #939393",
              }}
              alt="Remy Sharp"
              src={"data:image/png;base64," + props["userImgSrc"]}
            />
          </StyledBadge>
        </div>
        <Typography variant="h5" component="h5">
          {props.userName}
          <Divider />
        </Typography>
      </Grid>
      <Grid container style={{ padding: 30 }}>
        <Grid item xs={12} style={{ marginBottom: 20 }}>
          <TextField
            style={{ width: "100% " }}
            id="myId"
            label="ID"
            value={props["userId"]}
            readOnly
          />
        </Grid>
        <Grid item xs={12} style={{ marginBottom: 20 }}>
          <TextField
            style={{ width: "100% " }}
            id="myId"
            label="E-mail"
            value={props["userEmail"]}
            readOnly
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
        <IconButton
          aria-label="setting"
          onClick={() => {
            setUpdateOpen(true);
          }}
        >
          <SettingsIcon />
        </IconButton>
      </Grid>
      <UpdateProfileDlg
        name={props.userName}
        email={props.userEmail}
        id={props.userId}
        open={updateOpen}
        updateDlgClose={() => {
          setUpdateOpen(false);
        }}
      />
      <ImgUpdateDlg
        open={imgUpdateOpen}
        ImgUpdateDlgClose={() => {
          setImgUpdateOpen(false);
        }}
      />
    </Paper>
  );
}

import React from "react";
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
import Typography from "@material-ui/core/Typography";

const StyledBadge = withStyles((theme) => ({
  badge: {
    // border: `3px solid ${theme.palette.background.paper}`,
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
  return (
    <Paper
      style={{
        position: "relative",
        top: 60,
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
            onClick={() => {
              alert("사진 변경하기");
            }}
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent={<CreateIcon />}
          >
            <Avatar
              style={{
                width: 120,
                height: 120,
                boxShadow: "2px 2px 7px 2px #939393",
              }}
              alt="Remy Sharp"
              src="/images/yunjiwon.png"
            />
          </StyledBadge>
        </div>
        <Typography variant="h5" component="h5">
          윤지원
          <Divider />
        </Typography>
      </Grid>
      <Grid container style={{ padding: 30 }}>
        <Grid item xs={12} style={{ marginBottom: 20 }}>
          <TextField
            style={{ width: "100% " }}
            id="myId"
            label="ID"
            value="jiwon_3261"
            readOnly
          />
        </Grid>
        <Grid item xs={12} style={{ marginBottom: 20 }}>
          <TextField
            style={{ width: "100% " }}
            id="myId"
            label="E-mail"
            value="jiwon_3261@naver.com"
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
        <IconButton aria-label="setting">
          <SettingsIcon />
        </IconButton>
      </Grid>
    </Paper>
  );
}

import React, { useEffect, useState, memo } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import { Divider } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import Avatar from "@material-ui/core/Avatar";
import CreateIcon from "@material-ui/icons/Create";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

import Typography from "@material-ui/core/Typography";

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

const styles = {
  profileSection: {
    position: "relative",
    top: 50,
    marginBottom: 30,
    borderRadius: 7,
  },
  avatarCss: {
    width: 120,
    height: 120,
    boxShadow: "2px 2px 7px 2px #939393",
  },
};

const useStyles = makeStyles(styles);

const UserCard = memo(({ userInfo }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.profileSection}>
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
                  alert("이미지수정");
                }}
              />
            }
          >
            <Avatar
              className={classes.avatarCss}
              src={userInfo ? userInfo["myImg"] : null}
            />
          </StyledBadge>
        </div>
        <Typography variant="h5" component="h5">
          {userInfo ? userInfo["name"] : null}
          <Divider />
        </Typography>
      </Grid>
      <Grid container style={{ padding: 30 }}>
        <Grid item xs={12} style={{ marginBottom: 20 }}>
          ID
          <TextField
            style={{ width: "100% " }}
            value={userInfo ? userInfo["id"] : null}
            readOnly
          />
        </Grid>
        <Grid item xs={12} style={{ marginBottom: 20 }}>
          E-mail
          <TextField
            style={{ width: "100% " }}
            value={userInfo ? userInfo["email"] : null}
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
            alert("sdfsdf");
          }}
        >
          <SettingsIcon />
        </IconButton>
      </Grid>
    </Paper>
  );
});

export default UserCard;

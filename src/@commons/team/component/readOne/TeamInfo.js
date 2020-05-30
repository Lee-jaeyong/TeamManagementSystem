import React, { useState, memo, useCallback } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import { useDispatch } from "react-redux";
import { showMessageHandle } from "@store/actions/MessageAction";

// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Grid from "@material-ui/core/Grid";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import IconButton from "@material-ui/core/IconButton";
import Slider from "@material-ui/core/Slider";
import CreateIcon from "@material-ui/icons/Create";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import UpdateTeamDialog from "../update/UpdateTeamDialog";
import { purple } from "@material-ui/core/colors";

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: "#6F30C9",
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}))(Button);

const useStyles = makeStyles(styles);

const TeamInfo = memo(({ teamInfo, joinListImg }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [updateTeam, setUpdateTeam] = useState(false);

  const copyCode = useCallback(() => {
    let dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = document.getElementById("teamCode").innerText;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    messageBoxHandle(true, "팀 코드가 복사되었습니다.", "success");
  }, []);

  const messageBoxHandle = useCallback((open, content, level) => {
    dispatch(showMessageHandle({ open: open, content: content, level: level }));
  }, []);

  const updateTeamHandle = useCallback(() => {
    setUpdateTeam(true);
  }, []);

  return (
    <div>
      <Card className={classes.cardSize}>
        <CardHeader color="primary">
          <Grid container>
            <Grid item>
              <Typography variant="h6" component="h6">
                {teamInfo ? teamInfo["name"] : null}
              </Typography>
            </Grid>
            <Grid item>
              {teamInfo ? (
                teamInfo["teamLeader"]["id"] === localStorage.getItem("ID") ? (
                  <Typography
                    variant="subtitle1"
                    component="subtitle1"
                    style={{ top: 6, position: "relative", marginLeft: 10 }}
                  >
                    [팀 코드 : {teamInfo["code"]}]
                  </Typography>
                ) : null
              ) : null}

              {teamInfo ? (
                teamInfo["teamLeader"]["id"] === localStorage.getItem("ID") ? (
                  <div id="teamCode" style={{ display: "none" }}>
                    {teamInfo["code"]}
                  </div>
                ) : (
                  ""
                )
              ) : null}
            </Grid>
            <Grid item>
              {teamInfo ? (
                teamInfo["teamLeader"]["id"] === localStorage.getItem("ID") ? (
                  <ColorButton
                    variant="contained"
                    color="primary"
                    className={classes.margin}
                    style={{ marginLeft: 10 }}
                    onClick={copyCode}
                  >
                    복사하기
                  </ColorButton>
                ) : (
                  ""
                )
              ) : null}
            </Grid>
          </Grid>
        </CardHeader>
        <CardBody>
          <Grid container direction="row" justify="space-between">
            <Grid item>
              <span style={{ fontSize: 20 }}>
                <span style={{ fontSize: 15 }}>Since...</span>{" "}
                {teamInfo ? teamInfo["startDate"] : null} ~{" "}
                {teamInfo ? teamInfo["endDate"] : null}
              </span>
              {teamInfo ? (
                teamInfo["teamLeader"]["id"] === localStorage.getItem("ID") ? (
                  <Tooltip
                    title="수정"
                    style={{ position: "relative", top: -5 }}
                  >
                    <IconButton aria-label="update" onClick={updateTeamHandle}>
                      <CreateIcon />
                    </IconButton>
                  </Tooltip>
                ) : null
              ) : null}
            </Grid>
            <Grid item>
              <div className={classes.cardCategory}>
                {teamInfo ? (
                  teamInfo["joinPerson"] ? (
                    <AvatarGroup
                      style={{ marginTop: -10, float: "right" }}
                      max={
                        teamInfo
                          ? teamInfo["joinPerson"]
                            ? teamInfo["joinPerson"].length + 1
                            : 1
                          : 1
                      }
                    >
                      {teamInfo
                        ? joinListImg
                          ? joinListImg.map((person, idx) => {
                              return (
                                <Avatar
                                  key={idx}
                                  src={"data:image/png;base64," + person}
                                />
                              );
                            })
                          : null
                        : null}
                    </AvatarGroup>
                  ) : (
                    <Avatar
                      alt=""
                      style={{ marginTop: 20 }}
                      src="/static/images/avatar/1.jpg"
                    />
                  )
                ) : (
                  ""
                )}
              </div>
            </Grid>
          </Grid>
          <Divider />
        </CardBody>
        <CardFooter>
          <span
            style={{
              fontSize: 22,
              top: -10,
              position: "relative",
              marginLeft: 10,
            }}
          >
            {teamInfo ? teamInfo["description"] : null}
          </span>
        </CardFooter>
        <UpdateTeamDialog
          messageBoxHandle={messageBoxHandle}
          team={teamInfo}
          open={updateTeam}
          handleClose={() => setUpdateTeam(false)}
        />
      </Card>
    </div>
  );
});
export default TeamInfo;

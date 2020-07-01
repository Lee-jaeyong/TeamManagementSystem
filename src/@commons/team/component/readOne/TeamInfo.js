import React, { useState, memo, useCallback } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import { useDispatch } from "react-redux";
import { showMessageHandle } from "@store/actions/MessageAction";

// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Grid from "@material-ui/core/Grid";
import CardFooter from "components/Card/CardFooter.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import UpdateTeamDialog from "../update/UpdateTeamDialog";
import UserListDialog from "@commons/users/component/readList/UserListDialog";

import { purple } from "@material-ui/core/colors";

import { finishTeam,unFinishTeam } from '@commons/team/methods/TeamAccess';

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

const totalJoinPerson = (leader, data) => {
  let result = [];
  const _data = {
    ...leader,
    myImg: leader["myImg"],
  };
  result.push(_data);
  if (data)
    data.map((dataInfo, idx) => {
      if (dataInfo["state"] !== "NO") {
        const _data = {
          ...dataInfo["user"],
          myImg: dataInfo["user"]["myImg"],
        };
        result.push(_data);
      }
    });
  return result;
};

const TeamInfo = memo(({ teamInfo }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [updateTeam, setUpdateTeam] = useState(false);
  const [userListDialogState, setUserListDialogState] = useState(false);

  const copyCode = useCallback(() => {
    let dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = document.getElementById("teamCode").innerText;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    messageBoxHandle(true, "팀 코드가 복사되었습니다.", "success");
  }, []);

  async function finishedTeam(){
    let res = await finishTeam(teamInfo['code']);
    window.location.href = '../admin/main';
  };

  async function restartTeam(){
    let res = await unFinishTeam(teamInfo['code']);
    window.location.href = '../admin/main';
  }

  const messageBoxHandle = useCallback((open, content, level) => {
    dispatch(showMessageHandle({ open: open, content: content, level: level }));
  }, []);

  const updateTeamHandle = useCallback(() => {
    setUpdateTeam(true);
  }, []);

  return (
    <div>
      <Card className={classes.cardSize}>
        <CardHeader
          color={
            teamInfo["teamLeader"]["id"] === localStorage.getItem("ID")
              ? "primary"
              : "success"
          }
        >
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
                  <React.Fragment>
                    <ColorButton
                      variant="contained"
                      color="primary"
                      className={classes.margin}
                      style={{ marginLeft: 10 }}
                      onClick={copyCode}
                    >
                      복사하기
                    </ColorButton>
                    {teamInfo['flag'] === 'FINISHED' ? (
                      <Button
                        variant="contained"
                        color="default"
                        className={classes.margin}
                        style={{ marginLeft: 10 }}
                        onClick={restartTeam}
                      >
                        팀 되돌리기
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.margin}
                        style={{ marginLeft: 10 }}
                        onClick={finishedTeam}
                      >
                        팀 마감 하기
                      </Button>
                    )}
                  </React.Fragment>
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
                <React.Fragment>
                  <AvatarGroup
                    style={{ marginTop: -10, float: "right" }}
                    max={
                      totalJoinPerson(
                        teamInfo["teamLeader"],
                        teamInfo["joinPerson"]
                      ).length + 1
                    }
                  >
                    {totalJoinPerson(
                      teamInfo["teamLeader"],
                      teamInfo["joinPerson"]
                    ).map((person, idx) => (
                      <Tooltip key={idx} title={person["name"]}>
                        <Avatar
                          src={"data:image/png;base64," + person["myImg"]}
                        />
                      </Tooltip>
                    ))}
                  </AvatarGroup>
                  <Button
                    style={{ marginRight: 30, marginTop: -8 }}
                    variant="outlined"
                    color="primary"
                    onClick={() => setUserListDialogState(true)}
                  >
                    팀원 목록
                  </Button>
                </React.Fragment>
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
      <UserListDialog
        open={userListDialogState}
        handleClose={() => setUserListDialogState(false)}
        userList={totalJoinPerson(
          teamInfo["teamLeader"],
          teamInfo["joinPerson"]
        )}
      />
    </div>
  );
});
export default TeamInfo;

import React, { useState, useEffect, memo } from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Divider } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CardBody from "components/Card/CardBody.js";
import ProjectList from "@commons/team/component/readList/ProjectList";
import CheckSharpIcon from "@material-ui/icons/CheckSharp";
import FinishedProjectList from "./FinishedProjectList";
import MySignUpList from "./MySignUpList";
import CloseIcon from "@material-ui/icons/Close";
// import MySignUpListDialog from "./component_MyPageProject/MySignUpList";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

const MyTeamListCard = memo(
  ({ teamList, mySignUpList, finishedTeamList, history }) => {
    const classes = useStyles();
    const [projectTabValue, setProjectTabValue] = useState(0);

    const [isSetting, setIsSetting] = useState(false);

    const progressTabHandle = (event, newValue) => {
      setProjectTabValue(newValue);
    };

    const redirect = (code) => {
      history.push("/admin/dashboard/" + code);
    };

    const settingHandle = () => {
      setIsSetting(!isSetting);
    };

    return (
      <Card className={classes.cardSize}>
        <CardHeader color="warning">
          <Typography variant="h6" component="h6">
            프로젝트 현황
          </Typography>
        </CardHeader>
        <CardBody>
          <Grid container style={{ paddingTop: 17 }} spacing={2}>
            <Grid item xs={12}>
              <Tabs
                value={projectTabValue}
                indicatorColor="primary"
                textColor="primary"
                onChange={progressTabHandle}
              >
                <Tab label="진행중인 프로젝트" />
                <Tab label="마감된 프로젝트" />
                <Tab label="프로젝트 신청 현황" />
              </Tabs>
              <Divider />
            </Grid>
            <Grid item xs={12} style={{ paddingLeft: 10, paddingRight: 10 }}>
              {projectTabValue === 0 && (
                <ProjectList {...{ teamList, redirect, isSetting }} />
              )}
              {projectTabValue === 1 && (
                <FinishedProjectList {...{ finishedTeamList }} />
              )}
              {projectTabValue === 2 && <MySignUpList {...{ mySignUpList }} />}
            </Grid>
          </Grid>
          {projectTabValue === 0 && (
            <Grid container justify="flex-end">
              <Grid item>
                <IconButton onClick={settingHandle}>
                  {isSetting ? <CloseIcon /> : < SettingsIcon/>}
                </IconButton>
              </Grid>
            </Grid>
          )}
        </CardBody>
      </Card>
    );
  }
);

export default MyTeamListCard;

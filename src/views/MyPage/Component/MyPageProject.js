import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItem from "@material-ui/core/ListItem";
import Chip from "@material-ui/core/Chip";
import { Divider } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Card from "components/Card/Card.js";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CardBody from "components/Card/CardBody.js";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import ListItemText from "@material-ui/core/ListItemText";

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

export default function MyPageProject(props) {
  const classes = useStyles();
  const [progressProjectTabValue, setProgressProjectTabValue] = useState(0);
  const [pastProjectTabValue, setPastProjectTabValue] = useState(0);

  const progressTabHandle = (event, newValue) => {
    setProgressProjectTabValue(newValue);
  };

  const pastTabHandle = (event, newValue) => {
    setPastProjectTabValue(newValue);
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
          <Grid item md={6} sm={12} xs={12}>
            <Paper>
              <Chip
                style={{ margin: 20 }}
                label="진행중인 프로젝트"
                color="primary"
              />
              <Tabs
                value={progressProjectTabValue}
                indicatorColor="primary"
                textColor="primary"
                onChange={progressTabHandle}
                aria-label="disabled tabs example"
              >
                <Tooltip title="구성원으로 참여중인 프로젝트" placement="left">
                  <Tab label="참여중인 프로젝트" />
                </Tooltip>
                <Tooltip title="팀장으로 진행중인 프로젝트" placement="right">
                  <Tab label="진행중인 프로젝트" />
                </Tooltip>
              </Tabs>
              <Divider />
              {props.joinProject
                ? // console.log(props.joinProject[0]["project"])
                  props.joinProject.map((data, idx) => {
                    return (
                      <div key={idx}>
                        <ListItem button>
                          <Grid container>
                            <ListItemText
                              style={{ marginRight: 15, marginTop: 10 }}
                              id="projectName"
                              primary={data["project"]}
                            />
                            <ListItemAvatar style={{ float: "right" }}>
                              <AvatarGroup max={3}>
                                {data["userImgs"]
                                  ? data["userImgs"].map((img, idx) => {
                                      return <Avatar key={idx} src={img} />;
                                    })
                                  : null}
                              </AvatarGroup>
                            </ListItemAvatar>
                          </Grid>
                        </ListItem>
                        <Divider />
                      </div>
                    );
                  })
                : null}
            </Paper>
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <Paper>
              <Chip
                style={{ margin: 20 }}
                label="지난 프로젝트"
                color="secondary"
              />
              <Tabs
                value={pastProjectTabValue}
                indicatorColor="secondary"
                textColor="secondary"
                onChange={pastTabHandle}
                aria-label="disabled tabs example"
              >
                <Tab label="만료된 프로젝트" />
                <Tab label="탈퇴한 프로젝트" />
              </Tabs>
              <Divider />
              <ListItem button>
                <Grid container>
                  <ListItemText
                    style={{ marginRight: 15, marginTop: 10 }}
                    id="projectName"
                    primary="C언어 프로젝트"
                  />
                  <ListItemAvatar style={{ float: "right" }}>
                    <AvatarGroup max={3}>
                      <Avatar alt="이" src="/images/dlwodyd.png" />
                      <Avatar alt="Travis Howard" src="/images/dlwodyd.png" />
                      <Avatar alt="Cindy Baker" src="/images/dlwodyd.png" />
                      <Avatar alt="Cindy Baker" src="/images/dlwodyd.png" />
                    </AvatarGroup>
                  </ListItemAvatar>
                </Grid>
              </ListItem>
              <Divider />
              <ListItem button>
                <Grid container>
                  <ListItemText
                    style={{ marginRight: 15, marginTop: 10 }}
                    id="projectName"
                    primary="C언어 프로젝트"
                  />
                  <ListItemAvatar style={{ float: "right" }}>
                    <AvatarGroup max={3}>
                      <Avatar alt="이" src="/images/dlwodyd.png" />
                      <Avatar alt="Travis Howard" src="/images/dlwodyd.png" />
                      <Avatar alt="Cindy Baker" src="/images/dlwodyd.png" />
                      <Avatar alt="Cindy Baker" src="/images/dlwodyd.png" />
                    </AvatarGroup>
                  </ListItemAvatar>
                </Grid>
              </ListItem>
            </Paper>
          </Grid>
        </Grid>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
}

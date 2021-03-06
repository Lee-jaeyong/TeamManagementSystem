import React, { useState, useEffect } from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItem from "@material-ui/core/ListItem";
import { Divider } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import Card from "components/Card/Card.js";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CardBody from "components/Card/CardBody.js";
import ListItemText from "@material-ui/core/ListItemText";
import ConfirmDialog from "components/ConfirmDialog/ConfirmDialog.js";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import * as axiosDelete from "@axios/delete";
import MySignUpListDialog from "./component_MyPageProject/MySignUpList";

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

const SettingListItem = ({ data, sendToPject, setting, comfirmDlg }) => {
  return (
    <Grid container>
      <ListItemIcon>
        <ArrowRightIcon style={{ marginTop: 8 }} />
      </ListItemIcon>
      <ListItemText
        style={{ marginLeft: 10, marginTop: 10 }}
        id="projectName"
        primary={data["name"]}
      />
      {!setting ? (
        <React.Fragment />
      ) : (
        <div style={{ float: "right" }}>
          {data["teamLeader"]["id"] !== localStorage.getItem("ID") ? (
            <IconButton
              color="secondary"
              aria-label="delete"
              onClick={() => comfirmDlg(data["code"])}
            >
              <DeleteForeverOutlinedIcon />
            </IconButton>
          ) : (
            "팀 리더는 자신의 팀을 삭제할 수 없습니다."
          )}
        </div>
      )}
    </Grid>
  );
};

const ProjectInfo = ({ data, sendToPject, setting, comfirmDlg }) => (
  <React.Fragment>
    {!setting ? (
      <ListItem button onClick={() => sendToPject(data["code"])}>
        <SettingListItem {...{ data, sendToPject, setting }} />
      </ListItem>
    ) : (
      <ListItem>
        <SettingListItem
          {...{ data, sendToPject, setting }}
          comfirmDlg={comfirmDlg}
        />
      </ListItem>
    )}
    <Divider />
  </React.Fragment>
);

const ProjectList = ({
  unfinishedProjectTapData,
  sendToPject,
  setting,
  comfirmDlg,
}) =>
  unfinishedProjectTapData
    ? unfinishedProjectTapData.map((data, idx) => {
        return (
          <ProjectInfo
            key={idx}
            data={data}
            sendToPject={sendToPject}
            setting={setting}
            comfirmDlg={comfirmDlg}
          />
        );
      })
    : null;

export default function MyPageProject(props) {
  const classes = useStyles();
  const [projectTabValue, setProjectTabValue] = useState(-1);
  const [settingValue, setSettingValue] = useState(false);
  const [comfirmState, setComfirmState] = useState(false);
  const [deleteTeamCode, setDeleteTeamCode] = useState("");
  const [unfinishedProjectTapData, setUnfinishedProjectTapData] = useState();
  const [mySignUpDialogState, setMySignUpDialogState] = useState(false);
  const [notSuccessPjtDialogState, setNotSuccessPjtDialogState] = useState(
    false
  );

  const progressTabHandle = (event, newValue) => {
    if (newValue === 3) {
      if(props['mySignUpList'].length === 0){
        props['messageBoxHandle'](true,"신청 현황이 존재하지 않습니다.",2000,'error');
      }else{
        handleMySignUpDialogState(true);
      }
    } else if (newValue === 4) {
      if(props['notSuccessPjt'].length === 0){
        props['messageBoxHandle'](true,"반려 현황이 존재하지 않습니다.",2000,'error');
      }else{
        handleNotSuccessDialogState(true);
      }
    } else {
      setProjectTabValue(newValue);
    }
  };

  const settingProject = () => {
    setSettingValue(!settingValue);
  };

  const ConfirmDialogOpen = (code) => {
    setDeleteTeamCode(code);
    setComfirmState(true);
  };

  const deleteYesClick = () => {
    axiosDelete.deleteNotContainsData(
      "http://192.168.43.179:8090/api/teamManage/" + deleteTeamCode + "/out",
      deleteSuccess
    );
  };

  const handleMySignUpDialogState = (type) => {
    setMySignUpDialogState(type);
  };

  const handleNotSuccessDialogState = (type) => {
    setNotSuccessPjtDialogState(type);
  };

  const deleteSuccess = (res) => {
    props.outTeam(res["code"]);
  };

  const redirect = (code) => {
    props["history"].push("./dashboard/" + code);
  };

  useEffect(() => {
    if (projectTabValue === 0) {
      setUnfinishedProjectTapData(props["joinProject"]);
    } else if (projectTabValue === 1) {
      setUnfinishedProjectTapData(props["unfinishedProject"].filter(value=>value['flag'] !== 'FINISHED'));
    } else if(projectTabValue === 2){
      setUnfinishedProjectTapData(props["unfinishedProject"].filter(value=>value['flag'] === 'FINISHED'));
    }
  },[projectTabValue]);

  return (
    <Card style={{height:600}}>
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
              <Tab label="일정이 지난 프로젝트" />
              <Tab label="마감된 프로젝트" />
              <Tab label="프로젝트 신청 현황" />
              <Tab label="반려 현황" />
            </Tabs>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <ProjectList
              unfinishedProjectTapData={unfinishedProjectTapData}
              sendToPject={redirect}
              setting={settingValue}
              comfirmDlg={ConfirmDialogOpen}
            />
          </Grid>
        </Grid>
      </CardBody>
      <CardFooter>
        <Grid
          container
          alignItems="flex-start"
          justify="flex-end"
          direction="row"
        >
          <IconButton onClick={settingProject}>
            {!settingValue ? <SettingsIcon /> : <CloseIcon />}
          </IconButton>
        </Grid>
      </CardFooter>
      <ConfirmDialog
        title={"프로젝트 탈퇴 및 삭제"}
        content={"정말 해당 프로젝트를 삭제하시겠습니까?"}
        yseClick={deleteYesClick}
        open={comfirmState}
        handleClose={() => setComfirmState(false)}
      />
      <MySignUpListDialog
        type={true}
        mySignUpList={props["mySignUpList"]}
        open={mySignUpDialogState}
        handleClose={() => handleMySignUpDialogState(false)}
        />
      <MySignUpListDialog
        type={false}
        mySignUpList={props["notSuccessPjt"]}
        open={notSuccessPjtDialogState}
        handleClose={() => handleNotSuccessDialogState(false)}
      />
    </Card>
  );
}
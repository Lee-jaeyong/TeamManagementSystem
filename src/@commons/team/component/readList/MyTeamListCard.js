import React, { useState, useEffect, memo } from "react";

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
import ConfirmDialog from "components/ConfirmDialog/ConfirmDialog.js";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import * as axiosDelete from "@axios/delete";
import LinkIcon from "@material-ui/icons/Link";
import List from "@material-ui/core/List";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import ProjectList from "@commons/team/component/readList/ProjectList";
import CheckSharpIcon from '@material-ui/icons/CheckSharp';
import FinishedProjectList from './FinishedProjectList';
import MySignUpList from './MySignUpList';
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

// const ProjectList = memo(({ teamList }) => {
//   return (
//     <List>
//       {teamList
//         ? teamList.map((data, idx) => (
//             <ListItem button key={idx}>
//               <ListItemIcon>
//                 <LinkIcon />
//               </ListItemIcon>
//               <ListItemText primary={data["name"]} />
//             </ListItem>
//           ))
//         : null}
//       <ListItem button>
//         <ListItemIcon>
//           <LinkIcon />
//         </ListItemIcon>
//         <ListItemText primary="d아니야이거" />
//       </ListItem>
//     </List>
//   );
// });

const MyTeamListCard = memo(({ teamList, mySignUpList, finishedTeamList }) => {
  const classes = useStyles();
  const [projectTabValue, setProjectTabValue] = useState(0);
  const [settingValue, setSettingValue] = useState(false);
  const [comfirmState, setComfirmState] = useState(false);
  const [deleteTeamCode, setDeleteTeamCode] = useState("");
  const [unfinishedProjectTapData, setUnfinishedProjectTapData] = useState();
  const [mySignUpDialogState, setMySignUpDialogState] = useState(false);
  const [notSuccessPjtDialogState, setNotSuccessPjtDialogState] = useState(
    false
  );

  const [isSetting, setIsSetting] = useState(false);

  //   const progressTabHandle = (event, newValue) => {
  //     if (newValue === 2) {
  //       if (props["mySignUpList"].length === 0) {
  //         props["messageBoxHandle"](
  //           true,
  //           "신청 현황이 존재하지 않습니다.",
  //           2000,
  //           "error"
  //         );
  //       } else {
  //         handleMySignUpDialogState(true);
  //       }
  //     } else if (newValue === 3) {
  //       if (props["notSuccessPjt"].length === 0) {
  //         props["messageBoxHandle"](
  //           true,
  //           "반려 현황이 존재하지 않습니다.",
  //           2000,
  //           "error"
  //         );
  //       } else {
  //         handleNotSuccessDialogState(true);
  //       }
  //     } else {
  //       setProjectTabValue(newValue);
  //     }
  //   };

  const progressTabHandle = (event, newValue) => {
    setIsSetting(false)
    setProjectTabValue(newValue);
  };

  const settingProject = () => {
    setSettingValue(!settingValue);
  };

  const ConfirmDialogOpen = (code) => {
    setDeleteTeamCode(code);
    setComfirmState(true);
  };

  //   const deleteYesClick = () => {
  //     axiosDelete.deleteNotContainsData(
  //       "http://localhost:8090/api/teamManage/" + deleteTeamCode + "/out",
  //       deleteSuccess
  //     );
  //   };

  const handleMySignUpDialogState = (type) => {
    setMySignUpDialogState(type);
  };

  const handleNotSuccessDialogState = (type) => {
    setNotSuccessPjtDialogState(type);
  };

  //   const deleteSuccess = (res) => {
  //     props.outTeam(res["code"]);
  //   };

  const redirect = (code) => {
    // props["history"].push("./dashboard/" + code);
  };

  //   useEffect(() => {
  //     if (projectTabValue === 0) {
  //       setUnfinishedProjectTapData(props["joinProject"]);
  //     } else if (projectTabValue === 1) {
  //       setUnfinishedProjectTapData(props["unfinishedProject"]);
  //     }
  //   });

  return (
    <Card className={classes.cardSize}>
      <CardHeader color="warning">
        <Grid container justify="space-between">
          <Grid item>
            <Typography variant="h6" component="h6">
              프로젝트 현황
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              size={"small"}
              onClick={() => {
                setIsSetting(!isSetting);
              }}
            >
              {isSetting ? (
                <CheckSharpIcon
                  style={{
                    color: "white",
                  }}
                />
              ) : (
                <SettingsIcon
                  style={{
                    color: "white",
                  }}
                />
              )}
            </IconButton>
          </Grid>
        </Grid>
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
            {console.log(mySignUpList)}
            {projectTabValue===0 && <ProjectList {...{ teamList, isSetting }} /> }
            {projectTabValue===1 && <FinishedProjectList {...{ finishedTeamList, isSetting }}/> }
            {projectTabValue===2 && <MySignUpList {...{mySignUpList}}/> }
          </Grid>
        </Grid>
      </CardBody>
      <ConfirmDialog
        title={"프로젝트 탈퇴 및 삭제"}
        content={"정말 해당 프로젝트를 삭제하시겠습니까?"}
        // yseClick={deleteYesClick}
        open={comfirmState}
        handleClose={() => setComfirmState(false)}
      />
      {/* <MySignUpListDialog
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
      /> */}
    </Card>
  );
});

export default MyTeamListCard;

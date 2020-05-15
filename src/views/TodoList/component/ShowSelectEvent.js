import React, { useEffect, useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Chip from "@material-ui/core/Chip";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import UpdatePlan from "./UpdatePlan";
import ConfirmDialog from "components/ConfirmDialog/ConfirmDialog";
import * as axiosDelete from "@axios/delete";
import * as axiosPatch from "@axios/patch";
import * as axiosPut from "@axios/put";
import MessageBox from "components/MessageBox/MessageBox";
import CardHeader from "components/Card/CardHeader.js";
import DialogContent from "@material-ui/core/DialogContent";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ShowSelectEvent(props) {
  const classes = useStyles();
  const progress = useRef();
  const [updatePlanState, setUpdatePlanState] = React.useState(false);
  const [confirmState, setConfirmState] = useState(false);

  const [open, setOpen] = React.useState(props["open"]);
  const [checkDate, setCheckDate] = React.useState(0);
  const { event } = props;
  const [confirmDialogState, setConfirmDialogState] = useState(false);
  const [confirmDialogInfo, setConfirmDialogInfo] = useState({
    title: "",
    content: "",
  });
  const [showMessageState, setShowMessageState] = useState(false);
  const [MessageBoxState, setMessageBoxState] = useState({
    content: "",
    level: "success",
    time: 2000,
  });

  const _messageBoxHandle = (show, content, time, level) => {
    setShowMessageState(show);
    setMessageBoxState({
      content: content,
      time: time,
      level: level,
    });
  };

  const messageBoxHandle = (show, content, time, level) => {
    props.messageBoxHandle(show, content, time, level);
  };

  const handleClose = () => {
    setOpen(false);
    props["handleClose"]();
  };

  const notYet_d_dayCalculate = (targetDate) => {
    let _target = new Date(targetDate).getTime();
    let _now = new Date().getTime();
    if (_now < _target) {
      return parseInt((_target - _now) / 86400000);
    }
  };

  const remain_d_dayCalcultate = (targetDate) => {
    let _target = new Date(targetDate).getTime();
    let _now = new Date().getTime();
    if (_now < _target) {
      return parseInt((_now - _target) / 86400000);
    }
  };

  const updatePlanList = () => {
    props.updatePlanList();
    handleClose();
  };

  const yseClickHandle = () => {
    if (confirmState)
      axiosDelete.deleteNotContainsData(
        "http://localhost:8090/api/teamManage/plan/" +
          props["event"]["groupId"],
        deletePlanSuccess
      );
    else {
      if (!progress.current.value) {
        messageBoxHandle(
          true,
          "진척도가 전 진척도와 동일합니다.",
          2000,
          "warning"
        );
        return;
      }
      axiosPut.putNotContainsData(
        "http://localhost:8090/api/teamManage/plan/" +
          props["event"]["groupId"] +
          "/progress?progress=" +
          progress.current.value,
        updateProgressSuccess
      );
    }
  };

  const updateProgressSuccess = (res) => {
    messageBoxHandle(true, "진척도 변경 완료", 2000, "success");
    updatePlanList();
  };

  const updateProgressError = () => {
    _messageBoxHandle(
      true,
      "진척도 변경 중 오류가 발생했습니다.",
      2000,
      "error"
    );
  };

  const deletePlanSuccess = () => {
    props.messageBoxHandle(true, "일정 삭제 완료", 2000, "success");
    updatePlanList();
  };

  const deleteHandle = () => {
    setConfirmDialogState(true);
    setConfirmDialogInfo({
      title: "삭제",
      content: "위 일정을 정말 삭제하시겠습니까?",
    });
    setConfirmState(true);
  };

  const updateProgress = () => {
    setConfirmDialogState(true);
    setConfirmDialogInfo({
      title: "진척도 변경",
      content: "정말 진척도를 변경하시겠습니까?",
    });
    setConfirmState(false);
  };

  const updateProgressState = (num) => {
    progress.current.value = num;
  };

  useEffect(() => {
    let notYetDate = notYet_d_dayCalculate(event ? event["start"] : null);
    if (notYetDate) {
      setCheckDate("일정 시작 " + notYetDate + "일 전");
    } else {
      let checkData = remain_d_dayCalcultate(event ? event["end"] : null);
      checkData || checkData === 0
        ? setCheckDate("일정 종료까지 " + checkData + "일 남음")
        : setCheckDate("마감된 일정");
    }
    setOpen(props["open"]);
  }, [props["open"]]);

  useEffect(() => {
    setCheckDate(0);
  }, [props["event"]]);

  return (
    <div>
      <Dialog
        open={open}
        PaperComponent="div"
        onClose={handleClose}
        maxWidth={"sm"}
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Card className={classes.root}>
          <br />
          <CardHeader color="rose">
            <Typography variant="h6" component="h6">
              일정 정보
            </Typography>
          </CardHeader>
          <CardContent>
            <DialogContent>
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                className={classes.root}
              >
                <ListItem component="div" alignItems="flex-start" >
                  <ListItemAvatar>
                    <Avatar alt="" src="/static/images/avatar/3.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<strong>{event ? event['tag'] : null}</strong>}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                          style={{borderBottom:'1px solid gray'}}
                        >
                          <br/>
                          {event ? event['start'] : null} ~ {event ? event['end'] : null}
                          <br/>
                        </Typography>
                        <br />
                        <span>
                          {event ? event["content"] : null}
                        </span>
                        <br />
                        <br />
                        {event ? 100 - event["progress"] === 0 ? (
                        <Chip
                          component="span"
                          label={"완 료"}
                          style={{
                            color: "white",
                            background: "linear-gradient(45deg, #d81b60 30%, #ad1457 90%)",
                          }}
                        />
                        ) : (
                          <Chip
                            component="span"
                            label={100 - event["progress"] + "% 남음"}
                            style={{
                              color: "white",
                              background: "linear-gradient(45deg, #1e88e5 30%, #1565c0 90%)",
                            }}
                          />
                        ) : null}
                        <Chip
                          component="span"
                          label={event ? event["user"]["name"] : null}
                          style={{
                            marginLeft:10,
                            color: "white",
                            background: "linear-gradient(45deg, #ff8f00 30%, #ffd54f 90%)",
                          }}
                        />
                      </React.Fragment>
                    }
                    />
                </ListItem>
              </List>
            </DialogContent>
          </CardContent>
          {props["event"] &&
          props["event"]["user"]["id"] === localStorage.getItem("ID") && new Date(props['event']['end']).getTime() < new Date().getTime() ? (
            <CardActions>
              <Button
                style={{
                  width: "100%",
                  color: "white",
                  background:
                    "linear-gradient(45deg, #e91e63 30%, #c2185b 90%)",
                }}
                fullWidth
                variant="contained"
                onClick={() => setUpdatePlanState(true)}
              >
                수정
              </Button>
              <Button
                style={{
                  width: "100%",
                  color: "white",
                  background:
                    "linear-gradient(45deg, #e91e63 30%, #c2185b 90%)",
                }}
                fullWidth
                variant="contained"
                onClick={deleteHandle}
              >
                삭제
              </Button>
            </CardActions>
          ) : null}
        </Card>
      </Dialog>
      <UpdatePlan
        updatePlanList={updatePlanList}
        messageBoxHandle={messageBoxHandle}
        plan={props["event"]}
        open={updatePlanState}
        handleClose={setUpdatePlanState}
      />
      <ConfirmDialog
        yseClick={yseClickHandle}
        title={confirmDialogInfo["title"]}
        content={confirmDialogInfo["content"]}
        open={confirmDialogState}
        handleClose={() => setConfirmDialogState(false)}
      />
      <MessageBox
        open={showMessageState}
        content={MessageBoxState["content"]}
        level={MessageBoxState["level"]}
        time={MessageBoxState["time"]}
        handleClose={() => setShowMessageState(false)}
      />
    </div>
  );
}

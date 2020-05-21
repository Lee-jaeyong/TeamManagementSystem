import React, { useEffect, useState, useCallback } from "react";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import UpdatePlan from "./UpdatePlan";
import ConfirmDialog from "components/ConfirmDialog/ConfirmDialog";
import * as axiosDelete from "@axios/delete";
import * as axiosPatch from "@axios/patch";
import * as axiosPut from "@axios/put";
import MessageBox from "components/MessageBox/MessageBox";
import CardHeader from "components/Card/CardHeader.js";
import DialogContent from "@material-ui/core/DialogContent";

import ActionArea from './component_ShowSelectEvent/ActionArea';
import EventInfo from './component_ShowSelectEvent/EventInfo';
import TodoListArea from './component_ShowSelectEvent/TodoListArea';

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
  todoListArea : {
    marginLeft:40
  }
});

export default function ShowSelectEvent(props) {
  const classes = useStyles();
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

  const deleteHandle = useCallback(() => {
    setConfirmDialogState(true);
    setConfirmDialogInfo({
      title: "삭제",
      content: "위 일정을 정말 삭제하시겠습니까?",
    });
    setConfirmState(true);
  },[]);

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
              <EventInfo
                {...{event}}
              />
              <TodoListArea messageBoxHandle={_messageBoxHandle} isMy={props["event"] && props["event"]["user"]["id"] === localStorage.getItem("ID")} todoList={props['event'] ? props['event']['todoList'] ? props['event']['todoList'] : [] : []} classes={classes.todoListArea}/>
            </DialogContent>
          </CardContent>
          {props["event"] &&
          props["event"]["user"]["id"] === localStorage.getItem("ID") ? (
            <ActionArea
              {...{setUpdatePlanState,deleteHandle}}
            />
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

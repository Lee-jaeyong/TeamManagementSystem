import React, { useEffect, useState, useCallback } from "react";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import UpdatePlan from "./UpdatePlan";
import ConfirmDialog from "components/ConfirmDialog/ConfirmDialog";
import * as axiosDelete from "@axios/delete";
import MessageBox from "components/MessageBox/MessageBox";
import CardHeader from "components/Card/CardHeader.js";
import DialogContent from "@material-ui/core/DialogContent";

import ActionArea from "./component_ShowSelectEvent/ActionArea";
import EventInfo from "./component_ShowSelectEvent/EventInfo";
import TodoListArea from "./component_ShowSelectEvent/TodoListArea";

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
  todoListArea: {
    marginLeft: 40,
  },
});

export default function ShowSelectEvent(props) {
  const classes = useStyles();
  const [updatePlanState, setUpdatePlanState] = React.useState(false);
  const [confirmState, setConfirmState] = useState(false);

  const [open, setOpen] = React.useState(props["open"]);
  const { event } = props;
  const [todoList, setTodoList] = useState([]);

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

  const updatePlanList = (value) => {
    props.updatePlanList(value);
    handleClose();
  };

  const updateTodo = (todo,type) => {
    let _todoList = todoList;
    for(let i =0;i<_todoList.length;i++){
      if(todo['seq'] === _todoList[i]['seq']){
        _todoList[i] = todo;
        break;
      }
    }
    setTodoList(_todoList);
    if(type === 'changeIng'){
      if(props.changeIng)
        props.changeIng(todo);
    }
  };

  const yseClickHandle = () => {
    if (confirmState)
      axiosDelete.deleteNotContainsData(
        "http://localhost:8090/api/teamManage/plan/" +
          props["event"]["groupId"],
        deletePlanSuccess
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
  }, []);

  useEffect(() => {
    setOpen(props["open"]);
  }, [props["open"]]);

  useEffect(() => {
    setTodoList(props["event"] && props["event"]["todoList"] ? props["event"]["todoList"] : []);
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
              <EventInfo {...{ event }} />
              <TodoListArea
                updateTodo={updateTodo}
                messageBoxHandle={_messageBoxHandle}
                isMy={
                  props["event"] &&
                  props["event"]["user"]["id"] === localStorage.getItem("ID")
                }
                todoList={todoList}
                classes={classes.todoListArea}
              />
            </DialogContent>
          </CardContent>
          {props["event"] &&
          props["event"]["user"]["id"] === localStorage.getItem("ID") ? (
            <ActionArea {...{ setUpdatePlanState, deleteHandle }} />
          ) : null}
        </Card>
      </Dialog>
      <UpdatePlan
        {...{ updatePlanList, messageBoxHandle }}
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

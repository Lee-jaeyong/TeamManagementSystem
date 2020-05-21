import React, {
  useEffect,
  useState,
  useMemo,
  useContext,
  createContext,
  useRef,
} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import ConfirmDialog from "components/ConfirmDialog/ConfirmDialog";
import CardHeader from "components/Card/CardHeader.js";
import DialogContent from "@material-ui/core/DialogContent";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import UpdateIcon from "@material-ui/icons/Update";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import CreateIcon from "@material-ui/icons/Create";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import MessageBox from "components/MessageBox/MessageBox";

import * as axiosDelete from "@axios/delete";
import * as axiosPut from "@axios/put";

import UpdatePlan from "./UpdatePlan";

const ConfirmDialogContext = createContext();

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    marginBottom: 20,
  },
  avatar: {
    backgroundColor: red[500],
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const Todo = ({
  todo,
  updateTodoInfo,
  isMy,
  confirmDialogHandle,
  updateCount,
  messageBoxHandle,
}) => {
  const originTag = useMemo(() => todo["title"], [todo["title"]]);
  const [updateTag, setUpdateTag] = useState(todo["title"]);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [todoIng, setTodoIng] = useState(todo["ing"]);

  const updateTodo = () => {
    setUpdateFlag(!updateFlag);
  };

  const updateTodoSuccess = () => {
    if (updateTag.trim() === "") {
      messageBoxHandle(true, "단건 일정을 입력해주세요", 2000, "error");
      return;
    }
    setUpdateFlag(false);
    if (originTag === updateTag) {
      return;
    }
    const updateTodo = {
      title: updateTag,
    };
    axiosPut.putContainsData(
      "http://localhost:8090/api/teamManage/todoList/" + todo["seq"],
      successUpdate,
      errorUpdate,
      updateTodo
    );
  };

  const successUpdate = (res) => {
    updateTodoInfo(todo["seq"], updateTag);
  };

  const errorUpdate = (res) => {};

  const changeTodoIng = (type) => {
    if (type === "YES") {
      axiosPut.putNotContainsData(
        "http://localhost:8090/api/teamManage/todoList/" +
          todo["seq"] +
          "/faild",
        successHandle
      );
      updateCount("decrement");
    } else {
      axiosPut.putNotContainsData(
        "http://localhost:8090/api/teamManage/todoList/" +
          todo["seq"] +
          "/success",
        successHandle
      );
      updateCount("increment");
    }
    setTodoIng(type === "YES" ? "NO" : "YES");
  };

  const successHandle = (res) => {};

  return (
    <div style={{ marginTop: 10 }}>
      {!updateFlag ? (
        isMy ? (
          <Tooltip title="수정">
            <IconButton aria-label="수정" size="small" onClick={updateTodo}>
              <CreateIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        ) : null
      ) : (
        <Tooltip title="적용">
          <IconButton
            aria-label="적용"
            size="small"
            onClick={() =>
              confirmDialogHandle(
                true,
                "수정",
                "정말 수정하시겠습니까?",
                updateTodoSuccess
              )
            }
          >
            <UpdateIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      )}
      {!updateFlag ? (
        isMy ? (
          <Checkbox
            onChange={(e) =>
              confirmDialogHandle(
                true,
                "상태 변경",
                "정말 상태를 변경하시겠습니까?",
                () => changeTodoIng(todoIng)
              )
            }
            checked={todoIng !== "NO" ? true : false}
          />
        ) : todoIng !== "NO" ? (
          <CheckBoxIcon
            style={{ position: "relative", top: 7, marginRight: 10 }}
          />
        ) : (
          <CheckBoxOutlineBlankIcon
            style={{ position: "relative", top: 7, marginRight: 10 }}
          />
        )
      ) : (
        <IconButton
          onClick={() =>
            confirmDialogHandle(
              true,
              "변경 취소",
              "정말 변경을 취소하시겠습니까?",
              () => setUpdateFlag(false)
            )
          }
        >
          <HighlightOffIcon />
        </IconButton>
      )}
      {!updateFlag ? (
        todoIng !== "NO" ? (
          <mark>
            <span style={{ textDecorationLine: "line-through" }}>
              {todo["title"]}
            </span>
          </mark>
        ) : (
          <span>{todo["title"]}</span>
        )
      ) : (
        <TextField
          variant="outlined"
          style={{
            position: "relative",
            top: 10,
            minWidth: 300,
            marginBottom: 30,
          }}
          value={updateTag}
          onChange={({ target }) => setUpdateTag(target.value)}
          id="standard-required"
        />
      )}
    </div>
  );
};

const TodoListPanel = ({ todoList, updateTodoInfo, isMy }) => {
  const classes = useStyles();
  const finishTodoList = todoList.filter((value) => value["ing"] === "YES");
  const [finishCount, setFinishCount] = useState(finishTodoList.length);
  const confirmDialogContext = useContext(ConfirmDialogContext);
  const messageBoxContext = useContext(MessageBoxContext);

  const updateCount = (type) => {
    if (type === "increment") {
      setFinishCount(finishCount + 1);
    } else {
      setFinishCount(finishCount - 1);
    }
  };

  return todoList.length !== 0 ? (
    <ExpansionPanel style={{ width: 700 }}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>
          일정 목록 -- ({todoList.length}개중 {finishCount}개 완료)
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          {todoList.map((todo, idx) => (
            <Todo
              key={idx}
              todo={todo}
              updateTodoInfo={updateTodoInfo}
              messageBoxHandle={messageBoxContext}
              confirmDialogHandle={confirmDialogContext}
              isMy={isMy}
              updateCount={updateCount}
            />
          ))}
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  ) : (
    <ExpansionPanel style={{ width: 700 }}>
      <ExpansionPanelSummary>
        <Typography className={classes.heading}>일정 없음</Typography>
      </ExpansionPanelSummary>
    </ExpansionPanel>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

const MessageBoxContext = createContext();

export default function SelectDateDialog(props) {
  const classes = useStyles();
  const [updatePlanState, setUpdatePlanState] = React.useState(false);
  const [selectPlan, setSelectPlan] = React.useState();
  const [open, setOpen] = React.useState(props["open"]);
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

  const [confirmDialogState, setConfirmDialogState] = useState({
    open: false,
    title: "",
    content: "",
    handleYesClick: () => {},
    handleClose: () => {},
  });

  const messageBoxHandle = (show, content, time, level) => {
    props.messageBoxHandle(show, content, time, level);
  };
  const handleClose = () => {
    setOpen(false);
    props["handleClose"]();
  };

  const selectUpdatePlan = (seq) => {
    filterEvent(seq);
    setUpdatePlanState(true);
  };

  const filterEvent = (seq) => {
    for (let i = 0; i < props["eventList"].length; i++) {
      if (props["eventList"][i]["groupId"] === seq) {
        setSelectPlan(props["eventList"][i]);
        return;
      }
    }
  };

  const deletePlanClickHandle = (idx) => {
    setSelectPlan(idx);
    confirmDialogHandle(
      true,
      "일정 삭제",
      "정말 일정을 삭제하시겠습니까?",
      deletePlan
    );
  };

  const deletePlan = () => {
    axiosDelete.deleteNotContainsData(
      "http://localhost:8090/api/teamManage/plan/" + selectPlan,
      deletePlanSuccess
    );
  };

  const deletePlanSuccess = () => {
    props.messageBoxHandle(true, "일정 삭제 완료", 2000, "success");
    updatePlanList();
  };

  const updatePlanList = () => {
    props.updatePlanList();
    handleClose();
  };

  const updateTodo = (seq, tag) => {
    props.messageBoxHandle(true, "TodoList 변경 완료", 2000, "success");
    updatePlanList();
    handleClose();
  };

  const confirmDialogHandle = (open, title, content, handleYesClick) => {
    setConfirmDialogState({
      open: open,
      title: title,
      content: content,
      handleYesClick: handleYesClick,
      handleClose: () => {
        setConfirmDialogState({
          open: false,
          title: title,
          content: content,
        });
      },
    });
  };

  useEffect(() => {
    setOpen(props["open"]);
    if (!props["open"]) {
      updatePlanList();
    }
  }, [props["open"]]);

  useEffect(() => {}, [props["eventList"]]);

  return (
    <div>
      <Dialog
        PaperComponent="div"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth={"md"}
        fullWidth
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
      >
        <Card style={{ overflowY: "scroll" }}>
          <br />
          <CardHeader color="warning">
            <Typography variant="h6" component="h6">
              일정 리스트
            </Typography>
          </CardHeader>
          <DialogContent>
            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  <h4>{props["selectDate"]}</h4>
                </ListSubheader>
              }
              className={classes.root}
            >
              {props["eventList"].map((event, idx) => (
                <ListItem
                  component="div"
                  alignItems="flex-start"
                  key={idx}
                  style={{ width: "180%", marginBottom: 100 }}
                >
                  <ListItemAvatar>
                    <Avatar alt="" src="/static/images/avatar/3.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <strong>
                        {"## " + event["title"]}
                        {event["user"]["id"] === localStorage.getItem("ID") ? (
                          <Tooltip title="자신의 일정입니다." placement="right">
                            <CalendarTodayIcon
                              style={{
                                position: "relative",
                                top: 5,
                                marginLeft: 20,
                              }}
                            />
                          </Tooltip>
                        ) : null}
                      </strong>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                          style={{ borderBottom: "1px solid gray" }}
                        >
                          {event["user"]["id"] ===
                          localStorage.getItem("ID") ? (
                            <span style={{ float: "right", marginTop: 0 }}>
                              <Tooltip title="수정" aria-label="add">
                                <IconButton
                                  onClick={() =>
                                    selectUpdatePlan(event["groupId"])
                                  }
                                  component="span"
                                >
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="삭제" aria-label="add">
                                <IconButton
                                  onClick={() =>
                                    deletePlanClickHandle(event["groupId"])
                                  }
                                  component="span"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </span>
                          ) : null}
                          <br />
                          <span style={{ fontSize: 18 }}>
                            {event["start"]} ~ {event["end"]}{" "}
                            <span style={{ fontSize: 14 }}>까지</span>
                          </span>
                          <br />
                        </Typography>
                        <br />
                        <ConfirmDialogContext.Provider
                          value={confirmDialogHandle}
                        >
                          <MessageBoxContext.Provider value={_messageBoxHandle}>
                            <TodoListPanel
                              isMy={
                                event["user"]["id"] ===
                                localStorage.getItem("ID")
                              }
                              todoList={event["todoList"]}
                              updateTodoInfo={updateTodo}
                            />
                          </MessageBoxContext.Provider>
                        </ConfirmDialogContext.Provider>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </DialogContent>
        </Card>
        <MessageBox
          open={showMessageState}
          content={MessageBoxState["content"]}
          level={MessageBoxState["level"]}
          time={MessageBoxState["time"]}
          handleClose={() => setShowMessageState(false)}
        />
      </Dialog>
      <UpdatePlan
        updatePlanList={updatePlanList}
        messageBoxHandle={messageBoxHandle}
        plan={selectPlan}
        open={updatePlanState}
        handleClose={() => setUpdatePlanState(false)}
      />
      <ConfirmDialog
        open={confirmDialogState["open"]}
        title={confirmDialogState["title"]}
        content={confirmDialogState["content"]}
        yseClick={confirmDialogState["handleYesClick"]}
        handleClose={confirmDialogState["handleClose"]}
      />
    </div>
  );
}

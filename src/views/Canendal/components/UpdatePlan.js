import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  createContext,
} from "react";
import { makeStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import Card from "components/Card/Card.js";
import Divider from "@material-ui/core/Divider";

import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Grid from "@material-ui/core/Grid";
import CardHeader from "components/Card/CardHeader.js";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import MessageBox from "components/MessageBox/MessageBox";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import InputBase from "@material-ui/core/InputBase";
import DeleteIcon from "@material-ui/icons/Delete";

import ConfirmDialog from "components/ConfirmDialog/ConfirmDialog";

import * as axiosPut from "@axios/put";
import * as axiosDelete from "@axios/delete";
import * as axiosPost from "@axios/post";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  cardSize: {
    width: "100%",
    height: "100%",
  },
  root: {
    float: "left",
    padding: "2px 4px",
    marginTop: 10,
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const TodoListArea = ({
  todoList,
  insertTodoList,
  addTodoList,
  deleteTodoList,
  changeTodoList,
}) => {
  const messageBoxContext = useContext(MessageBoxContext);
  const confirmDialogContext = useContext(ConfirmDialogContext);
  return (
    <div>
      {todoList.map((todo, idx) =>
        todoList.length - 1 === idx && insertTodoList.length === 0 ? (
          <Todo
            todo={todo}
            key={idx}
            addTodoList={addTodoList}
            deleteTodoList={deleteTodoList}
            confirmDialogHandle={confirmDialogContext}
            messageBoxHandle={messageBoxContext}
            isFinal={true}
          />
        ) : (
          <Todo
            todo={todo}
            key={idx}
            deleteTodoList={deleteTodoList}
            confirmDialogHandle={confirmDialogContext}
            messageBoxHandle={messageBoxContext}
            isFinal={false}
          />
        )
      )}
      {insertTodoList.map((todo, idx) =>
        insertTodoList.length - 1 === idx ? (
          <Todo
            todo={todo}
            key={idx}
            addTodoList={addTodoList}
            deleteTodoList={deleteTodoList}
            changeTodoList={changeTodoList}
            confirmDialogHandle={confirmDialogContext}
            messageBoxHandle={messageBoxContext}
            isFinal={true}
          />
        ) : (
          <Todo
            todo={todo}
            key={idx}
            deleteTodoList={deleteTodoList}
            changeTodoList={changeTodoList}
            confirmDialogHandle={confirmDialogContext}
            messageBoxHandle={messageBoxContext}
            isFinal={false}
          />
        )
      )}
    </div>
  );
};

const TodoListAddArea = ({ addTodoList }) => (
  <div style={{ float: "right", position: "relative", top: 10, left: -15 }}>
    <IconButton
      color="primary"
      aria-label="add to shopping cart"
      onClick={addTodoList}
    >
      <AddCircleIcon />
    </IconButton>
  </div>
);

const Todo = ({
  todo,
  isFinal,
  deleteTodoList,
  addTodoList,
  changeTodoList,
  messageBoxHandle,
  confirmDialogHandle,
}) => {
  const classes = useStyles();

  const deleteTodoListHandle = () => {
    confirmDialogHandle(true, "삭제", "정말 삭제하시겠습니까?", () => {
      if (todo["ing"]) {
        axiosDelete.deleteNotContainsData(
          "http://192.168.43.179:8090/api/teamManage/todoList/" + todo["seq"],
          deleteSuccess
        );
        deleteSuccess("origin");
        return;
      }
      deleteSuccess("insert");
    });
  };

  const deleteSuccess = (type) => {
    deleteTodoList(todo["seq"], type);
    messageBoxHandle(true, "삭제 완료", 2000, "error");
  };

  return (
    <div style={{ marginLeft: 25 }}>
      <Paper component="div" className={classes.root}>
        {todo["ing"] ? (
          <InputBase
            value={todo["tag"] ? todo["tag"] : todo["title"]}
            className={classes.input}
            placeholder="일정을 기재해주세요"
            onChange={(event) => changeTodoList(event, todo["seq"])}
            disabled
          />
        ) : (
          <InputBase
            value={todo["tag"] ? todo["tag"] : todo["title"]}
            className={classes.input}
            placeholder="일정을 기재해주세요"
            onChange={(event) => changeTodoList(event, todo["seq"])}
          />
        )}
        <IconButton
          color="default"
          className={classes.iconButton}
          aria-label="directions"
        >
          <DeleteIcon fontSize="small" onClick={deleteTodoListHandle} />
        </IconButton>
      </Paper>
      {isFinal ? <TodoListAddArea addTodoList={addTodoList} /> : null}
    </div>
  );
};

const MessageBoxContext = createContext();
const ConfirmDialogContext = createContext();

export default function UpdatePlan(props) {
  const tag = useRef();
  const classes = useStyles();
  const [confirmDialogState, setConfirmDialogState] = useState({
    open: false,
    title: "",
    content: "",
    handleYesClick: () => {},
    handleClose: () => {},
  });

  const [insertTodoList, setInsertTodoList] = useState([]);
  const [todoListUpdate, setTodoListUpdate] = useState(false);
  const [todoList, setTodoList] = useState(
    props["plan"]
      ? props["plan"]["todoList"]
        ? props["plan"]["todoList"]
        : []
      : []
  );
  const [open, setOpen] = useState(props["open"]);
  const [startDate, setStartDate] = useState(
    props["plan"] ? props["plan"]["start"] : new Date()
  );
  const [endDate, setEndDate] = useState(
    props["plan"] ? props["plan"]["end"] : new Date()
  );
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");
  const [updateList, setUpdateList] = useState(false);

  const [showMessageState, setShowMessageState] = useState(false);
  const [MessageBoxState, setMessageBoxState] = useState({
    content: "",
    level: "success",
    time: 2000,
  });

  const messageBoxHandle = (show, content, time, level) => {
    setShowMessageState(show);
    setMessageBoxState({
      content: content,
      time: time,
      level: level,
    });
  };

  const handleStartDateChange = (date) => {
    if (date.toString() === "Invalid Date") {
      setStartDateError("일정을 다시 입력해주세요");
      setStartDate(null);
      return;
    }
    if (!endDate) {
      setEndDateError(null);
      setStartDateError(null);
      setStartDate(date);
    } else {
      let _endDate = new Date(endDate).getTime();
      if (_endDate < new Date(date).getTime()) {
        setStartDateError("일정 시작일은 종료일보다 작아야합니다.");
        setStartDate(date);
      } else {
        setEndDateError(null);
        setStartDateError(null);
        setStartDate(date);
      }
    }
  };

  const handleEndDateChange = (date) => {
    if (date.toString() === "Invalid Date") {
      setEndDateError("일정을 다시 입력해주세요");
      setEndDate(null);
      return;
    }
    if (!startDate) {
      setStartDateError(null);
      setEndDateError(null);
      setEndDate(date);
    } else {
      let _startDate = new Date(startDate).getTime();
      if (_startDate > new Date(date).getTime()) {
        setEndDateError("일정 종료일은 시작일보다 커야합니다.");
        setEndDate(date);
      } else {
        setStartDateError(null);
        setEndDateError(null);
        setEndDate(date);
      }
    }
  };

  const handleClose = () => {
    props.handleClose();
    setOpen(false);
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

  const updatePlanHandle = () => {
    if (insertTodoList.length !== 0) {
      for (let i = 0; i < insertTodoList.length; i++) {
        if (insertTodoList[i]["title"].trim() === "") {
          messageBoxHandle(
            true,
            "모든 TodoList를 입력해주세요.",
            2000,
            "error"
          );
          return;
        }
      }
    }
    if (tag.current.value.trim() === "") {
      messageBoxHandle(true, "일정 태그를 입력해주세요.", 2000, "error");
      tag.current.focus();
    } else if (!startDate) {
      messageBoxHandle(true, "일정 시작일을 입력해주세요.", 2000, "error");
    } else if (!endDate) {
      messageBoxHandle(true, "일정 마감일을 입력해주세요.", 2000, "error");
    } else if (startDateError) {
      messageBoxHandle(
        true,
        "일정 시작일은 마감일보다 작아야합니다.",
        2000,
        "error"
      );
    } else if (endDateError) {
      messageBoxHandle(
        true,
        "일정 마감일은 시작일보다 커야합니다.",
        2000,
        "error"
      );
    } else {
      const updatePlan = {
        tag: tag.current.value,
        start: dateFormat(startDate),
        end: dateFormat(endDate),
      };
      const seq = props["plan"]["groupId"]
        ? props["plan"]["groupId"]
        : props["plan"]["seq"];
      axiosPut.putContainsData(
        "http://192.168.43.179:8090/api/teamManage/plan/" + seq,
        updatePlanSuccess,
        updatePlanError,
        updatePlan
      );
    }
  };

  async function updatePlanSuccess(res){
    let saveTodo = [];
    for (let i = 0; i < insertTodoList.length; i++) {
      let _todoList = {
        title: insertTodoList[i]["title"],
      };
      const saveData = await axiosPost.awitPostContainsData("http://192.168.43.179:8090/api/teamManage/todoList/" + res["seq"],_todoList).then(res => res);
      saveTodo.push(saveData);
    }
    props.messageBoxHandle(true, "일정 수정 완료.", 2000, "success");
    const updatePlan = {
      ...props["plan"],
      seq: res["seq"],
      tag: tag.current.value,
      start: dateFormat(startDate),
      end: dateFormat(endDate),
      todoList: todoList.concat(saveTodo),
    };
    props.updatePlanList(updatePlan);
    handleClose();
  };

  const updatePlanError = (res) => {
    messageBoxHandle(true, "일정 수정 중 오류가 발생했습니다.", 2000, "error");
  };

  const dateFormat = (beforeDate) => {
    let date = new Date(beforeDate);
    let year = date.getFullYear();
    let month = dateMonthCheck(date.getMonth() + 1);
    let day = dateMonthCheck(date.getDate());
    return year + "-" + month + "-" + day;
  };

  const dateMonthCheck = (value) => {
    const check = value + "";
    if (check.length === 1) return "0" + check;
    return check;
  };

  const addTodoList = () => {
    let _todoList = insertTodoList.concat({
      seq: insertTodoList[insertTodoList.length - 1]
        ? insertTodoList[insertTodoList.length - 1]["seq"] + 1
        : 0,
      title: "",
    });
    setInsertTodoList(_todoList);
  };

  const deleteTodoList = (seq, type) => {
    if (type === "origin") {
      let _todoList = todoList.filter((value) => value["seq"] !== seq);
      setTodoList(_todoList);
      const updatePlan = {
        ...props["plan"],
        todoList: _todoList,
      };
      props.updatePlanList(updatePlan);
    } else {
      let _todoList = insertTodoList.filter((value) => value["seq"] !== seq);
      setInsertTodoList(_todoList);
    }
  };

  const changeTodoList = ({ target }, seq) => {
    let _todoList = insertTodoList;
    for (let i = 0; i < _todoList.length; i++) {
      if (_todoList[i]["seq"] === seq) {
        _todoList[i]["title"] = target.value;
        setInsertTodoList(_todoList);
        setTodoListUpdate(!todoListUpdate);
        return;
      }
    }
  };

  useEffect(() => {
    if (props["open"]) {
      setInsertTodoList([]);
      setTodoList(
        props["plan"]
          ? props["plan"]["todoList"]
            ? props["plan"]["todoList"]
            : []
          : []
      );
      setStartDate(props["plan"] ? props["plan"]["start"] : new Date());
      setEndDate(props["plan"] ? props["plan"]["end"] : new Date());
      setEndDateError("");
      setStartDateError("");
    }
    setOpen(props["open"]);
  }, [props["open"]]);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      PaperComponent="div"
    >
      <Card className={classes.cardSize}>
        <CardHeader color={props['headerColor']}>
          <Typography variant="h6" component="h6">
            일정수정
          </Typography>
        </CardHeader>
        <CardBody>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container>
              <Grid item xs={5}>
                <KeyboardDatePicker
                  autoOk
                  disableToolbar
                  variant="inline"
                  format="yyyy-MM-dd"
                  margin="normal"
                  id="startDate"
                  label="시작날짜"
                  error={startDateError ? true : false}
                  helperText={startDateError}
                  value={startDate}
                  onChange={handleStartDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
              <Grid style={{ textAlign: "center" }} item xs={2}>
                <Typography
                  variant="h4"
                  component="h4"
                  style={{ position: "relative", top: 20 }}
                >
                  ~
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <KeyboardDatePicker
                  autoOk
                  disableToolbar
                  variant="inline"
                  format="yyyy-MM-dd"
                  margin="normal"
                  id="endDate"
                  label="종료날짜"
                  error={endDateError ? true : false}
                  helperText={endDateError}
                  value={endDate}
                  onChange={handleEndDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
          <TextField
            inputRef={tag}
            id="standard-basic"
            label="태그"
            defaultValue={
              props["plan"]
                ? props["plan"]["tag"]
                  ? props["plan"]["tag"]
                  : props["plan"]["title"]
                  ? props["plan"]["title"].substring(
                      0,
                      props["plan"]["title"].indexOf("<") - 1
                    )
                  : null
                : null
            }
            variant="outlined"
            style={{ width: "100%", marginTop: 15 }}
          />
          <MessageBoxContext.Provider value={messageBoxHandle}>
            <ConfirmDialogContext.Provider value={confirmDialogHandle}>
              {insertTodoList || todoList ? (
                insertTodoList.length !== 0 || todoList.length !== 0 ? (
                  <TodoListArea
                    todoList={todoList}
                    insertTodoList={insertTodoList}
                    addTodoList={addTodoList}
                    deleteTodoList={deleteTodoList}
                    changeTodoList={changeTodoList}
                  />
                ) : (
                  <TodoListAddArea addTodoList={addTodoList} />
                )
              ) : null}
            </ConfirmDialogContext.Provider>
          </MessageBoxContext.Provider>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button
            style={{
              width: "100%",
              color: "white",
              background: props['btnColor'],
            }}
            variant="contained"
            onClick={() =>
              confirmDialogHandle(
                true,
                "일정 수정",
                "정말 일정을 수정하시겠습니까?",
                updatePlanHandle
              )
            }
          >
            일정 수정하기
          </Button>
        </CardFooter>
      </Card>
      <MessageBox
        open={showMessageState}
        content={MessageBoxState["content"]}
        level={MessageBoxState["level"]}
        time={MessageBoxState["time"]}
        handleClose={() => setShowMessageState(false)}
      />
      <ConfirmDialog
        open={confirmDialogState["open"]}
        title={confirmDialogState["title"]}
        content={confirmDialogState["content"]}
        yseClick={confirmDialogState["handleYesClick"]}
        handleClose={confirmDialogState["handleClose"]}
      />
    </Dialog>
  );
}

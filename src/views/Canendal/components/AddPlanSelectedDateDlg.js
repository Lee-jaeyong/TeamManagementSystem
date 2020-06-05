import React, { useEffect, useState, useRef, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import Card from "components/Card/Card.js";
import Divider from "@material-ui/core/Divider";

import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardHeader from "components/Card/CardHeader.js";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MessageBox from "components/MessageBox/MessageBox";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import * as axiosPost from "@axios/post";
import Paper from "@material-ui/core/Paper";

import PlanInfo from './component_AddPlanSelectDate/PlanInfo';

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

const Todo = ({ todo, isFinal, deleteTodoList, addTodoList,changeTodoList }) => {
  const classes = useStyles();
  return (
    <div style={{marginLeft:25}}>
      <Paper component="div" className={classes.root}>
        <InputBase
          value={todo['title']}
          className={classes.input}
          placeholder="일정을 기재해주세요"
          onChange={(event)=>changeTodoList(event,todo['seq'])}
        />
        <IconButton
          color="default"
          className={classes.iconButton}
          aria-label="directions"
        >
          <DeleteIcon fontSize="small" onClick={()=>deleteTodoList(todo['seq'])}/>
        </IconButton>
      </Paper>
      {isFinal ? <TodoListAddArea addTodoList={addTodoList} /> : null}
    </div>
  );
};

const TodoListArea = ({ todoList, addTodoList,deleteTodoList,changeTodoList }) => {
  return (
  <div>
    {todoList.map((todo, idx) =>
      todoList.length - 1 === idx ? (
        <Todo todo={todo} key={idx} addTodoList={addTodoList} deleteTodoList={deleteTodoList} changeTodoList={changeTodoList} isFinal={true} />
      ) : (
        <Todo todo={todo} key={idx} addTodoList={addTodoList} deleteTodoList={deleteTodoList} changeTodoList={changeTodoList} isFinal={false} />
      )
    )}
  </div>
)};

const TodoListAddArea = ({ addTodoList }) => (
  <div style={{ float: "right", position: "relative", top: 10, left : -15 }}>
    <IconButton
      color="primary"
      aria-label="add to shopping cart"
      onClick={addTodoList}
    >
      <AddCircleIcon />
    </IconButton>
  </div>
);

export default function AddPlanSelectedDateDlg(props) {
  const [socket,setSocket] = useState();
  const tag = useRef();
  const classes = useStyles();
  const [open, setOpen] = useState(props["open"]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");

  const [todoList, setTodoList] = useState([{ seq: 0, title: "" }]);
  const [todoListUpdate,setTodoListUpdate] = useState(false);

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

  const handleStartDateChange = useCallback((date) => {
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
  },[]);

  const handleEndDateChange = useCallback((date) => {
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
  },[]);

  const handleClose = () => {
    props.handleClose();
    setOpen(false);
  };

  const createPlanHandle = () => {
    if(todoList.length > 0){
      for(let i =0;i<todoList.length;i++){
        if(todoList[i]['title'].trim() === ''){
          messageBoxHandle(true, "일정 내용을 모두 입력해주세요.", 2000, "error");
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
      const plan = {
        tag: tag.current.value,
        start: dateFormat(startDate + ""),
        end: dateFormat(endDate + ""),
      };
      axiosPost.postContainsData(
        "http://172.30.1.37:8090/api/teamManage/plan/" + props["idx"],
        createPlanSuccess,
        createPlanError,
        plan
      );
    }
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

  const createPlanSuccess = (res) => {
    const plan = res;
    for(let i =0;i<todoList.length;i++) {
      const _todoList = {
        title : todoList[i]['title']
      };
      axiosPost.postContainsData(
        "http://172.30.1.37:8090/api/teamManage/todoList/" + plan["seq"],
        createTodoListSuccess,
        createTodoListError,
        _todoList
      );
    }
    socket.sendMessage('/topics/'+props["idx"],JSON.stringify({code:props['idx']}));
    props.messageBoxHandle(true, "일정 등록 완료", 2000, "success");
    props.updatePlanList();
    handleClose();
  };

  const createTodoListSuccess = (res) => {
  }
  
  const createTodoListError = (res) => {
    messageBoxHandle(true, "일정 등록 중 문제가 발생했습니다.", 2000, "error");
  }

  const createPlanError = (res) => {
    messageBoxHandle(true, "일정 등록 중 문제가 발생했습니다.", 2000, "error");
  };

  const addTodoList = () => {
    if(todoList.length === 0){
      setTodoList(todoList.concat({
        seq: 0,
        title: "",
      }));
      return;
    }
    setTodoList(todoList.concat({
      seq: todoList[todoList.length - 1]['seq'] + 1,
      title: "",
    }));
  };

  const deleteTodoList = (seq) => {
    let _todoList = todoList.filter(value=>value['seq'] !== seq);
    setTodoList(_todoList);
  }
  
  const changeTodoList = ({target},seq) => {
    let _todoList = todoList;
    for(let i = 0;i<_todoList.length;i++){
      if(_todoList[i]['seq'] === seq){
        _todoList[i]['title'] = target.value;
        setTodoList(_todoList);
        setTodoListUpdate(!todoListUpdate);
        return;
      }
    }
  }

  useEffect(() => {
    if(props['open']){
      setTodoList([{ seq: 0, title: "" }]);
    }
    setOpen(props["open"]);
    setStartDate(new Date());
    setEndDate(new Date());
    setStartDateError("");
    setEndDateError("");
  }, [props["open"]]);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      PaperComponent="div"
    >
      <Card className={classes.cardSize}>
        <CardHeader color="info">
          <Typography variant="h6" component="h6">
            일정등록
          </Typography>
        </CardHeader>
        <CardBody>
          <PlanInfo
            startDateError={startDateError}
            endDateError={endDateError}
            startDate={startDate}
            endDate={endDate}
            handleStartDateChange={handleStartDateChange}
            handleEndDateChange={handleEndDateChange}
            tag={tag}
          />
          {todoList.length !== 0 ? (
            <TodoListArea
              todoList={todoList}
              addTodoList={addTodoList}
              deleteTodoList={deleteTodoList}
              changeTodoList={changeTodoList}
            />
          ):
          (
            <TodoListAddArea addTodoList={addTodoList}/>
          )}
        </CardBody>
        <Divider />
        <CardFooter>
          <Button
            style={{
              width: "100%",
              color: "white",
              background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            }}
            variant="contained"
            onClick={createPlanHandle}
          >
            일정등록하기
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
    </Dialog>
  );
}

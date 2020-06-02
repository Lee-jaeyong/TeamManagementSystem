import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Card from "components/Card/Card.js";
import Divider from "@material-ui/core/Divider";
import { showMessageHandle } from "@store/actions/MessageAction";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardHeader from "components/Card/CardHeader.js";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CreateTodoList from "../insert/CreateTodoList";
import KeyBoardDatePickerSection from "@commons/component/KeyBoardDatePickerSection";
import CloseIcon from "@material-ui/icons/Close";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import Chip from "@material-ui/core/Chip";

import {
  insertTodo,
  updatePlan as _updatePlan,
  deleteTodo as _deleteTodo,
  getPlan,
} from "@commons/plan/methods/PlanAccess";
import { showConfirmHandle } from "@store/actions/ConfirmAction";
import { updatePlan } from "@store/actions/Plan/PlanAction";

const useStyles = makeStyles((theme) => ({
  okButton: {
    width: "100%",
    color: "white",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
}));

const OriginTodoList = ({ todoList, deleteTodoHandle }) => {
  const dispatch = useDispatch();
  async function yseClick(seq) {
    let res = _deleteTodo(seq);
    deleteTodoHandle(todoList.filter((todo) => todo["seq"] !== seq));
  }

  const deleteTodo = (seq) => {
    dispatch(
      showConfirmHandle({
        open: true,
        title: "단건 일정 삭제",
        content: "정말 삭제하시겠습니까?",
        yseClick: () => yseClick(seq),
      })
    );
  };
  return (
    <List style={{ padding: 10 }}>
      {todoList.map((todo, idx) => (
        <ListItem key={idx}>
          <Chip color={"secondary"} label={todo["title"]} />
          <ListItemSecondaryAction>
            <IconButton onClick={() => deleteTodo(todo["seq"])}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default function UpdatePlanDialog({ open, handleClose, plan }) {
  const classes = useStyles();
  const [startDate, setStartDate] = useState(plan ? plan["start"] : null);
  const [endDate, setEndDate] = useState(plan ? plan["end"] : null);
  const [checkDate, setCheckDate] = useState(true);
  const tag = useRef();
  const dispatch = useDispatch();

  const [todoList, setTodoList] = useState([{ seq: 0, title: "" }]);

  const messageBoxHandle = (open, content, level) => {
    dispatch(showMessageHandle({ open: open, content: content, level: level }));
  };

  async function yseClick(_plan) {
    let res = await _updatePlan(plan["seq"], _plan);
    for (let i = 0; i < todoList.length; i++) {
      const todo = {
        title: todoList[i]["title"],
      };
      const _todo = await insertTodo(res["seq"], todo);
    }
    res = await getPlan(plan["seq"]);
    dispatch(updatePlan(res));
    messageBoxHandle(true, "일정 수정 완료", "success");
    handleClose();
  }

  function parseDate(day) {
    let date = new Date(day);
    return (
      date.getFullYear() +
      "-" +
      plusZeroDate(date.getMonth() + 1) +
      "-" +
      plusZeroDate(date.getDate())
    );
  }

  function plusZeroDate(day) {
    return day < 10 ? "0" + day : day;
  }

  async function createPlanHandle() {
    let todoChk = true;
    let todoSeq = 0;
    todoList.map((todo) => {
      if (todo["title"].trim() === "") {
        todoSeq = todo["seq"];
        todoChk = false;
        return;
      }
    });
    if (!todoChk) {
      document.getElementById("todoList" + todoSeq).focus();
      messageBoxHandle(true, "TodoList를 모두 입력해주세요.", "error");
      return;
    }
    if (tag.current.value.trim() === "") {
      messageBoxHandle(true, "일정을 입력해주세요", "error");
      tag.current.focus();
    } else if (!startDate) {
      messageBoxHandle(true, "일정 시작일을 입력해주세요.", "error");
    } else if (!endDate) {
      messageBoxHandle(true, "일정 마감일을 입력해주세요.", "error");
    } else if (!checkDate) {
      messageBoxHandle(true, "기간을 다시 입력해주세요", "error");
    } else {
      const createPlan = {
        tag: tag.current.value,
        start: parseDate(startDate),
        end: parseDate(endDate),
      };
      dispatch(
        showConfirmHandle({
          open: true,
          title: "일정 수정",
          content: "정말 수정하시겠습니까?",
          yseClick: () => yseClick(createPlan),
        })
      );
    }
  }

  const deleteTodoHandle = (todoList) => {
    const deleteTodoPlan = {
      ...plan,
      todoList: todoList,
    };
    dispatch(updatePlan(deleteTodoPlan));
    messageBoxHandle(true, "단건 일정 삭제 완료", "success");
  };

  const init = useCallback(() => {
    setStartDate(plan ? plan["start"] : null);
    setEndDate(plan ? plan["end"] : null);
    setCheckDate(true);
  }, [plan]);

  useEffect(() => {
    if (open) {
      setTodoList([{ seq: 0, title: "" }]);
    }
    init();
  }, [open]);

  return (
    <Dialog
      onClose={handleClose}
      maxWidth={"sm"}
      fullWidth
      open={open}
      PaperComponent="div"
    >
      <Card>
        <CardHeader color="info">
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="h6" component="h6">
                일정 수정
              </Typography>
            </Grid>
            <Grid item>
              <IconButton
                size={"small"}
                aria-label="close"
                onClick={handleClose}
              >
                <CloseIcon
                  style={{
                    color: "white",
                  }}
                />
              </IconButton>
            </Grid>
          </Grid>
        </CardHeader>
        <CardBody>
          <KeyBoardDatePickerSection
            {...{
              startDate,
              endDate,
              setStartDate,
              setEndDate,
              setCheckDate,
            }}
            error={{
              start: "일정 시작일을 다시 입력해주세요",
              end: "일정 마감일을 다시 입력해주세요",
            }}
          />
          <TextField
            fullWidth
            label="태그"
            id="tag"
            defaultValue={plan ? plan["tag"] : ""}
            inputRef={tag}
            style={{ marginTop: 15, marginBottom: 15 }}
            variant="outlined"
          />
          <OriginTodoList
            todoList={plan ? plan["todoList"] : []}
            {...{ deleteTodoHandle }}
          />
          <CreateTodoList {...{ todoList, setTodoList }} />
        </CardBody>
        <Divider />
        <CardFooter>
          <Button
            className={classes.okButton}
            variant="contained"
            onClick={createPlanHandle}
          >
            일정등록하기
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
}

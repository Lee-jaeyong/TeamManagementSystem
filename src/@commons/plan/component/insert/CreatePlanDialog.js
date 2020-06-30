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
import CreateTodoList from "./CreateTodoList";
import KeyBoardDatePickerSection from "@commons/component/KeyBoardDatePickerSection";
import CloseIcon from "@material-ui/icons/Close";
import DragableComponent from "@commons/component/DragableComponent";

import { insertPlan, insertTodo } from "@commons/plan/methods/PlanAccess";
import { showConfirmHandle } from "@store/actions/ConfirmAction";
import {insertPlanList} from '@store/actions/Plan/PlanAction';

const useStyles = makeStyles((theme) => ({
  okButton: {
    width: "100%",
    color: "white",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
}));

export default function CreatePlanDialog({ open, handleClose, teamCode }) {
  const classes = useStyles();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [checkDate, setCheckDate] = useState(true);
  const tag = useRef();
  const dispatch = useDispatch();

  const [todoList, setTodoList] = useState([{ seq: 0, title: "" }]);

  const messageBoxHandle = (open, content, level) => {
    dispatch(showMessageHandle({ open: open, content: content, level: level }));
  };

  async function yseClick(plan) {
    let _todoList = [];
    try{
      let res = await insertPlan(teamCode, plan);
      for (let i = 0; i < todoList.length; i++) {
        const todo = {
          title: todoList[i]["title"],
        };
        const _todo = await insertTodo(res["seq"], todo);
        _todoList.push(_todo);
      }
      res = {
        ...res,
        todoList : _todoList
      }
      dispatch(insertPlanList(res));
      messageBoxHandle(true, "일정 등록 완료", "success");
      handleClose();
    }catch({response}){
      dispatch(
        showMessageHandle({
          open: true,
          content: response["data"]["errors"][0]['reason'],
          level: "error",
        })
      );
    }
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
          title: "일정 등록",
          content: "정말 등록하시겠습니까?",
          yseClick: () => yseClick(createPlan),
        })
      );
    }
  }

  const init = useCallback(() => {
    setStartDate(new Date());
    setEndDate(new Date());
    setCheckDate(true);
  }, []);

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
      PaperComponent={DragableComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <Card>
        <CardHeader color="info"
          id="draggable-dialog-title"
          style={{ cursor: "move" }}>
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="h6" component="h6">
                일정 등록
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
            inputRef={tag}
            style={{ marginTop: 15, marginBottom: 15 }}
            variant="outlined"
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

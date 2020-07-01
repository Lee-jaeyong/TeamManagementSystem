import React, { useState, useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import UpdateIcon from "@material-ui/icons/Update";
import TextField from "@material-ui/core/TextField";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import Tooltip from "@material-ui/core/Tooltip";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import {
  updateTodoIng,
  updateTodoTitle as _updateTodoTitle,
} from "@commons/plan/methods/PlanAccess";
import { showConfirmHandle } from "@store/actions/ConfirmAction";
import { showMessageHandle } from "@store/actions/MessageAction";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflowY: "auto",
  },
}));

const Todo = memo(({ todo, isMy, changeTodo }) => {
  const dispatch = useDispatch();
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(todo["title"]);
  const [updateIng, setUpdateIng] = useState(
    todo["ing"] === "YES" ? true : false
  );

  async function updateIngHandle() {
    dispatch(
      showConfirmHandle({
        open: true,
        title: "상태 변경",
        content: "정말 상태를 변경하시겠습니까?",
        yseClick: () => {
          if (updateIng) {
            updateTodo("faild");
          } else {
            updateTodo("success");
          }
        },
      })
    );
  }

  async function updateTodo(type) {
    updateTodoIng(todo["seq"], type);
    changeTodo({
      ...todo,
      title: updateTitle,
      ing: !updateIng === false ? "NO" : "YES",
    });
    setUpdateIng(!updateIng);
    dispatch(
      showMessageHandle({
        open: true,
        content: "상태 변경 완료",
        level: "success",
      })
    );
  }

  async function updateTodoTitle() {
    const _todo = {
      title: updateTitle,
    };
    let res = await _updateTodoTitle(todo["seq"], _todo);
    changeTodo({
      ...todo,
      title: updateTitle,
    });
    setIsUpdate(false);
    dispatch(
      showMessageHandle({
        open: true,
        content: "단건 일정 수정 완료",
        level: "success",
      })
    );
  }

  const updateTitleHandle = () => {
    if(updateTitle.trim() === ''){
      dispatch(
        showMessageHandle({
          open: true,
          content: "단건 일정을 입력해주세요",
          level: "error",
        })
      );
      return;
    }
    dispatch(
      showConfirmHandle({
        open: true,
        title: "단건 일정 변경",
        content: "정말 단건 일정을 변경하시겠습니까?",
        yseClick: updateTodoTitle,
      })
    );
  };

  const cencelHandle = () => {
    setIsUpdate(false);
    setUpdateTitle(todo["title"]);
  };

  const init = () => {
    setUpdateTitle(todo["title"]);
    setIsUpdate(false);
    setUpdateIng(todo["ing"] === "YES" ? true : false);
  };

  useEffect(() => {
    init();
  }, [todo]);

  return (
    <ListItem dense>
      {isMy ? (
        <ListItemIcon style={{marginTop:20}}>
          {isUpdate ? (
            <React.Fragment>
              <IconButton onClick={updateTitleHandle}>
                <UpdateIcon />
              </IconButton>
              <IconButton style={{ marginLeft: -15 }} onClick={cencelHandle}>
                <HighlightOffIcon />
              </IconButton>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <IconButton onClick={() => setIsUpdate(true)}>
                <CreateIcon />
              </IconButton>
              <Checkbox
                style={{ marginLeft: -15 }}
                checked={updateIng}
                onChange={updateIngHandle}
              />
            </React.Fragment>
          )}
        </ListItemIcon>
      ) : (
        <ListItemIcon style={{marginTop:20}}>
          <React.Fragment>
            <CheckBoxOutlineBlankIcon />
          </React.Fragment>
        </ListItemIcon>
      )}
      {isUpdate ? (
        <TextField
          fullWidth
          value={updateTitle}
          variant="outlined"
          onChange={(event) => setUpdateTitle(event.target.value)}
        />
      ) : (
        <ListItemText {...(!isMy ? {style:{marginTop:20}} : {style:{marginTop:20}})}  primary={todo["title"]} />
      )}
    </ListItem>
  );
});

const TodoList = memo(({ todoList, isMy, _updateTodoList, plan }) => {
  const classes = useStyles();
  const [showMore, setShowMore] = useState(true);

  const changeTodoList = (_todo) => {
    let result = [];
    todoList.map((todo) => {
      if (todo["seq"] === _todo["seq"]) result.push(_todo);
      else result.push(todo);
    });
    return result;
  };

  const changeTodo = (todo) => {
    const _plan = {
      ...plan,
      todoList: changeTodoList(todo),
    };
    _updateTodoList(_plan);
  };

  const beforeTodoList = () => {
    let result = [];
    let count = todoList.length;
    if (todoList.length >= 3) {
      count = 3;
    }
    for (let i = 0; i < count; i++) {
      result.push(todoList[i]);
    }
    return result;
  };

  const afterTodoList = () => {
    let result = [];
    for (let i = 3; i < todoList.length; i++) {
      result.push(todoList[i]);
    }
    return result;
  };

  return (
    <List className={classes.root} subheader={<li/>}>
      {todoList.length !== 0 ? (
        <React.Fragment>
          {beforeTodoList(todoList).map((todo, idx) => (
            <Fade key={idx} in={true} timeout={(idx + 1) * 300}>
              <div>
                <Todo {...{ todo, isMy, changeTodo }} />
              </div>
            </Fade>
          ))}
          {!showMore ? (
            <Fade in={true} timeout={1000}>
              <div>
                {afterTodoList(todoList).map((todo, idx) => (
                  <Fade key={idx} in={true} timeout={(idx + 1) * 50}>
                    <div>
                      <Todo {...{ todo, isMy, changeTodo }} />
                    </div>
                  </Fade>
                ))}
              </div>
            </Fade>
          ) : null}
          {todoList.length > 3 ? (
            showMore ? (
              <div style={{ textAlign: "center" }}>
                <Tooltip title={"더보기"}>
                  <IconButton onClick={() => setShowMore(false)}>
                    <ArrowDropDownIcon />
                  </IconButton>
                </Tooltip>
              </div>
            ) : (
              <div style={{ textAlign: "center" }}>
                <Tooltip title={"접기"}>
                  <IconButton onClick={() => setShowMore(true)}>
                    <ArrowDropUpIcon />
                  </IconButton>
                </Tooltip>
              </div>
            )
          ) : null}
        </React.Fragment>
      ) : (
        <h6>TODO리스트가 존재하지 않습니다.</h6>
      )}
    </List>
  );
});

export default TodoList;

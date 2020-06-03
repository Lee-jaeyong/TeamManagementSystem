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
    overflow: "auto",
    maxHeight: 150,
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
        <ListItemIcon>
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
        <ListItemIcon>
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
        <ListItemText primary={todo["title"]} />
      )}
    </ListItem>
  );
});

const TodoList = memo(({ todoList, isMy, _updateTodoList, plan }) => {
  const classes = useStyles();

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

  return (
    <List className={classes.root} subheader={<li/>}>
      {todoList.length !== 0 ? (
        todoList.map((todo, idx) => (
          <Fade key={idx} in={true} timeout={(idx + 1) * 300}>
            <div>
              <Todo {...{ todo, isMy, changeTodo }} />
            </div>
          </Fade>
        ))
      ) : (
        <h6>TODO리스트가 존재하지 않습니다.</h6>
      )}
    </List>
  );
});

export default TodoList;

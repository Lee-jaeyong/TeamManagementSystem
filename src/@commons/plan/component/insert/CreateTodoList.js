import React, { useEffect, useState, useRef, useCallback, memo } from "react";
import { makeStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    float: "left",
    padding: "2px 4px",
    marginTop: 5,
    display: "flex",
    alignItems: "center",
    width: 450,
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

const Todo = ({
  todo,
  isFinal,
  deleteTodoList,
  addTodoList,
  changeTodoList,
}) => {
  const classes = useStyles();
  return (
    <div style={{ marginLeft: 25 }}>
      <Paper component="div" className={classes.root}>
        <InputBase
          id={"todoList"+todo['seq']}
          value={todo["title"]}
          className={classes.input}
          placeholder="일정을 기재해주세요"
          onChange={(event) => changeTodoList(event, todo["seq"])}
        />
        <IconButton
          color="default"
          className={classes.iconButton}
          aria-label="directions"
        >
          <DeleteIcon
            fontSize="small"
            onClick={() => deleteTodoList(todo["seq"])}
          />
        </IconButton>
      </Paper>
      {isFinal ? <TodoListAddArea addTodoList={addTodoList} /> : null}
    </div>
  );
};

const TodoListAddArea = ({ addTodoList }) => (
  <div style={{ float: "right", position: "relative", top: 3, left: -15 }}>
    <IconButton
      color="primary"
      aria-label="add to shopping cart"
      onClick={addTodoList}
    >
      <AddCircleIcon />
    </IconButton>
  </div>
);

const TodoListArea = ({
  todoList,
  addTodoList,
  deleteTodoList,
  changeTodoList,
}) => {
  return (
    <div>
      {todoList.map((todo, idx) => (
        <Todo
          key={idx}
          {...{ todo, addTodoList, deleteTodoList, changeTodoList }}
          {...(todoList.length - 1 === idx
            ? { isFinal: true }
            : { isFinal: false })}
        />
      ))}
    </div>
  );
};

const CreateTodoList = memo(({ todoList, setTodoList }) => {
  const changeTodoList = useCallback(
    (event, value) => {
      let result = [];
      for (let i = 0; i < todoList.length; i++) {
        if (todoList[i]["seq"] === value) {
          result.push({ seq: value, title: event.target.value });
        } else {
          result.push(todoList[i]);
        }
      }
      setTodoList(result);
    },
    [todoList]
  );

  const addTodoList = useCallback(() => {
    let max = 0;
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i]["seq"] > max) {
        max = todoList[i]["seq"];
      }
    }
    setTodoList(todoList.concat({ seq: max + 1, title: "" }));
  }, [todoList]);

  const deleteTodoList = useCallback(
    (value) => {
      setTodoList(todoList.filter((todo) => todo["seq"] !== value));
    },
    [todoList]
  );

  return todoList.length !== 0 ? (
    <TodoListArea
      todoList={todoList}
      addTodoList={addTodoList}
      deleteTodoList={deleteTodoList}
      changeTodoList={changeTodoList}
    />
  ) : (
    <TodoListAddArea addTodoList={addTodoList} />
  );
});

export default CreateTodoList;

import React, { memo, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import CreateIcon from "@material-ui/icons/Create";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import UpdateIcon from "@material-ui/icons/Update";
import TextField from "@material-ui/core/TextField";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
});

const TodoInfo = memo(({ todo, confirmDialogHandle, updateTodoList }) => {
  const [originTitle, setOriginTitle] = useState(todo["title"]);
  const [updateTitle, setUpdateTitle] = useState(todo["title"]);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [updateIng, setUpdateIng] = useState(todo["ing"]);
  useEffect(()=>{
    setOriginTitle(todo['title']);
    setUpdateTitle(todo['title']);
    setUpdateFlag(false);
    setUpdateIng(todo['ing']);
  });
  const changeIngHandle = (type) => {
    confirmDialogHandle(
      true,
      type ? "상태 변경" : "태그 변경",
      type ? "정말 상태를 변경하시겠습니까?" : "정말 태그를 변경하시겠습니까?",
      () => {
        let ing = updateIng;
        if (type === "ing") {
          ing = updateIng === "YES" ? "NO" : "YES";
        }
        updateTodoList({ ...todo, title: updateTitle, ing: ing });
        setUpdateIng(ing);
        if (!type) {
          setUpdateFlag(false);
        }
      }
    );
  };

  const cencelUpdate = () => {
    setUpdateFlag(false);
    setUpdateTitle(originTitle);
  };

  return (
    <ListItem>
      <Tooltip {...(updateFlag ? { title: "변경 완료" } : { title: "수 정" })}>
        <IconButton
          onClick={
            updateFlag
              ? () => {
                  changeIngHandle();
                }
              : () => setUpdateFlag(true)
          }
        >
          {updateFlag ? <UpdateIcon /> : <CreateIcon />}
        </IconButton>
      </Tooltip>
      {updateFlag ? (
        <IconButton onClick={cencelUpdate}>
          <HighlightOffIcon />
        </IconButton>
      ) : (
        <Checkbox
          onChange={() => changeIngHandle("ing")}
          checked={updateIng === "YES" ? true : false}
        />
      )}
      {updateFlag ? (
        <TextField
          variant="outlined"
          value={updateTitle}
          onChange={(e) => setUpdateTitle(e.target.value)}
        />
      ) : (
        <ListItemText primary={updateTitle} />
      )}
    </ListItem>
  );
});

const TodoListSection = memo(
  ({ todoList, confirmDialogHandle, updateTodoList }) => {
    return (
      <div style={{ height: 200, overflowY: "auto" }}>
        <List>
          {todoList.map((todo, idx) => (
            <TodoInfo
              key={idx}
              {...{ todo, confirmDialogHandle, updateTodoList }}
            />
          ))}
        </List>
      </div>
    );
  }
);

const TodoCard = memo(({ todo, confirmDialogHandle, updatePlan, showUpdateDialog }) => {
  const classes = useStyles();
  const updateTodoList = (value) => {
    let todoList = [];
    for (let i = 0; i < todo["todoList"].length; i++) {
      if (value["seq"] === todo["todoList"][i]["seq"]) {
        todoList.push(value);
      } else {
        todoList.push(todo["todoList"][i]);
      }
    }
    const _updatePlan = {
      ...todo,
      todoList: todoList,
    };
    updatePlan(_updatePlan);
  };

  const updatePlanHandle = () => {
    showUpdateDialog(todo);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {todo["start"]} ~ {todo["end"]}
        </Typography>
        <Typography variant="h5" component="h2">
          {todo["tag"]}
        </Typography>
        <TodoListSection
          todoList={todo["todoList"]}
          {...{ confirmDialogHandle, updateTodoList }}
        />
      </CardContent>
      <CardActions>
        <Button size="small" fullWidth color="primary" onClick={updatePlanHandle}>
          보 기
        </Button>
      </CardActions>
    </Card>
  );
});

export default TodoCard;

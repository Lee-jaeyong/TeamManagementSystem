import React, { useState, useEffect, memo } from "react";
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
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 300,
  },
}));

const Todo = memo(({ todo }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(todo["title"]);
  const [updateIng, setUpdateIng] = useState(
    todo["ing"] === "YES" ? true : false
  );
  const updateIngHandle = () => {
    if (updateIng) {
      // Todo Ing <NO> update send
    } else {
      // Todo ING <YES> update send
    }
    setUpdateIng(!updateIng);
  };

  const updateTitleHandle = () => {
    setIsUpdate(false);
  };

  const cencelHandle = () => {
      setIsUpdate(false);
      setUpdateTitle(todo['title']);
  }

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
      <ListItemIcon>
        {isUpdate ? (
          <React.Fragment>
            <IconButton onClick={updateTitleHandle}>
              <UpdateIcon />
            </IconButton>
            <IconButton
              style={{ marginLeft: -15 }}
              onClick={cencelHandle}
            >
              <HighlightOffIcon/>
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

export default function TodoList({ todoList }) {
  const classes = useStyles();

  return (
    <List className={classes.root} subheader={<li />}>
      {todoList.map((todo, idx) => (
        <Fade key={idx} in={true} timeout={(idx + 1) * 300}>
          <div>
            <Todo {...{ todo }} />
          </div>
        </Fade>
      ))}
    </List>
  );
}

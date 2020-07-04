import React, { useState, createContext, useContext } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import CreateIcon from "@material-ui/icons/Create";
import UpdateIcon from "@material-ui/icons/Update";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Tooltip from "@material-ui/core/Tooltip";
import ConfirmDialog from "components/ConfirmDialog/ConfirmDialog";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { makeStyles } from "@material-ui/core/styles";

import * as axiosPut from "@axios/put";

const style = makeStyles({
  checkIcon: {
    marginLeft: 22,
    marginTop: 3,
  },
});

const ConfirmDialogContext = createContext();

const TodoItem = ({
  updateTodo,
  todo,
  messageBoxHandle,
  isMy,
  updateTodoList,
}) => {
  const classes = style();

  const confirmDialogContext = useContext(ConfirmDialogContext);

  const [updateFlag, setUpdateFlag] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(todo["title"]);
  const [updateIng, setUpdateIng] = useState(
    todo["ing"] === "YES" ? true : false
  );

  const updateHandle = (type) => {
    setUpdateFlag(type);
  };

  const updateTodoSuccess = () => {
    if (updateTitle.trim() === "") {
      messageBoxHandle(true, "단건 일정을 입력해주세요", 2000, "error");
      return;
    }
    setUpdateFlag(false);
    if (todo["title"] === updateTitle) {
      return;
    }
    const _updateTodo = {
      title: updateTitle,
    };
    axiosPut.putContainsData(
      "http://192.168.43.179:8090/api/teamManage/todoList/" + todo["seq"],
      () => {
        updateTodo({ ...todo, title: updateTitle });
        messageBoxHandle(true, "변경 완료", 2000, "success");
        updateTodoList({ ...todo, title: updateTitle });
      },
      () => {},
      _updateTodo
    );
  };

  const updateIngHandle = () => {
    if (updateIng) {
      axiosPut.putNotContainsData(
        "http://192.168.43.179:8090/api/teamManage/todoList/" +
          todo["seq"] +
          "/faild",
        () => {
          updateTodo({ ...todo, ing: "NO" }, "changeIng");
          messageBoxHandle(true, "변경 완료", 2000, "success");
          updateTodoList({ ...todo, ing: "NO" });
        }
      );
    } else {
      axiosPut.putNotContainsData(
        "http://192.168.43.179:8090/api/teamManage/todoList/" +
          todo["seq"] +
          "/success",
        () => {
          updateTodo({ ...todo, ing: "YES" }, "changeIng");
          messageBoxHandle(true, "변경 완료", 2000, "success");
          updateTodoList({ ...todo, ing: "YES" });
        }
      );
    }
    setUpdateIng(!updateIng);
  };

  return (
    <ListItem>
      <ListItemAvatar>
        {isMy ? (
          !updateFlag ? (
            <React.Fragment>
              <Checkbox
                onChange={() =>
                  confirmDialogContext(
                    true,
                    "변경",
                    "정말 상태를 변경하시겠습니까?",
                    updateIngHandle
                  )
                }
                checked={updateIng}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <ControllIconButton
                title={"취 소"}
                clickHandle={() =>
                  confirmDialogContext(
                    true,
                    "취소",
                    "정말 변경을 취소하시겠습니까?",
                    () => updateHandle(false)
                  )
                }
              >
                <HighlightOffIcon />
              </ControllIconButton>
            </React.Fragment>
          )
        ) : updateIng ? (
          <CheckBoxIcon className={classes.checkIcon} />
        ) : (
          <CheckBoxOutlineBlankIcon className={classes.checkIcon} />
        )}
        {isMy ? (
          !updateFlag ? (
            <ControllIconButton
              title={"수 정"}
              clickHandle={() => updateHandle(true)}
            >
              <CreateIcon />
            </ControllIconButton>
          ) : (
            <ControllIconButton
              title={"적 용"}
              clickHandle={() =>
                confirmDialogContext(
                  true,
                  "수정",
                  "정말 위 일정을 수정하시겠습니까?",
                  updateTodoSuccess
                )
              }
            >
              <UpdateIcon />
            </ControllIconButton>
          )
        ) : null}
      </ListItemAvatar>
      {!updateFlag ? (
        <ListItemText
          primary={
            updateIng ? (
              <mark>
                <span style={{ textDecorationLine: "line-through" }}>
                  {updateTitle}
                </span>
              </mark>
            ) : (
              updateTitle
            )
          }
        />
      ) : (
        <TextField
          variant="outlined"
          value={updateTitle}
          onChange={(e) => setUpdateTitle(e.target.value)}
        />
      )}
    </ListItem>
  );
};

const ControllIconButton = ({ title, children, clickHandle }) => (
  <Tooltip title={title} style={{ marginLeft: -10 }}>
    <IconButton onClick={clickHandle}>{children}</IconButton>
  </Tooltip>
);

const TodoListArea = ({
  updateTodo,
  todoList,
  classes,
  isMy,
  messageBoxHandle,
  updateTodoList,
}) => {
  const [confirmDialogState, setConfirmDialogState] = useState({
    open: false,
    title: "",
    content: "",
    handleYesClick: () => {},
    handleClose: () => {},
  });

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
  return (
    <React.Fragment>
      <List className={classes}>
        {todoList.map((todo, idx) => (
          <ConfirmDialogContext.Provider value={confirmDialogHandle}>
            <TodoItem
              updateTodoList={updateTodoList}
              updateTodo={updateTodo}
              key={idx}
              todo={todo}
              isMy={isMy}
              messageBoxHandle={messageBoxHandle}
            />
          </ConfirmDialogContext.Provider>
        ))}
      </List>
      <ConfirmDialog
        open={confirmDialogState["open"]}
        title={confirmDialogState["title"]}
        content={confirmDialogState["content"]}
        yseClick={confirmDialogState["handleYesClick"]}
        handleClose={confirmDialogState["handleClose"]}
      />
    </React.Fragment>
  );
};

export default TodoListArea;

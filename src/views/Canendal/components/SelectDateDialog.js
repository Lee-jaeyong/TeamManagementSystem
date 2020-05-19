import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import ConfirmDialog from "components/ConfirmDialog/ConfirmDialog";
import CardHeader from "components/Card/CardHeader.js";
import DialogContent from "@material-ui/core/DialogContent";
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import UpdateIcon from '@material-ui/icons/Update';
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import CreateIcon from '@material-ui/icons/Create';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import * as axiosDelete from "@axios/delete";
import * as axiosPut from '@axios/put';

import UpdatePlan from "./UpdatePlan";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    marginBottom: 20,
  },
  avatar: {
    backgroundColor: red[500],
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const Todo = ({todo,updateTodoInfo}) => {
  const [updateTag,setUpdateTag] = useState(todo['tag']);
  const [updateFlag,setUpdateFlag] = useState(false);

  const updateTodo = () => {
    setUpdateFlag(!updateFlag);
  }
  
  const updateTodoSuccess = () => {
    setUpdateFlag(false);
    const updateTodo = {
      tag : updateTag
    }
    axiosPut.putContainsData("http://localhost:8090/api/teamManage/todoList/" + todo['seq'],successUpdate,errorUpdate,updateTodo);
  }

  const successUpdate = (res) => {
    updateTodoInfo(todo['seq'],updateTag);
  }

  const errorUpdate = (res) => {
    alert();
  }

  return (
    <div style={{marginTop:10}}>
      {!updateFlag ? (
      <Tooltip title="수정">
        <IconButton aria-label="수정" size="small" onClick={updateTodo}>
          <CreateIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
      ) : (
      <Tooltip title="적용">
        <IconButton aria-label="적용" size="small" onClick={updateTodoSuccess}>
          <UpdateIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
      )}
      <Checkbox
        checked={todo['ing'] !== 'NO' ? true : false}
      />
      {!updateFlag ? (
      todo['ing'] !== 'NO' ? 
      (
        <span style={{textDecorationLine:'line-through'}}>
          {todo['tag']}
        </span>
      ) :
      (
        <span>
          {todo['tag']}
        </span>
      )
      ) : 
      (
        <TextField value={updateTag} onChange={({target})=>setUpdateTag(target.value)} id="standard-required" />
      )}
    </div>
  )
}

const TodoListPanel = ({todoList,updateTodoInfo}) => {
  const classes = useStyles();
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>일정 목록</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          {todoList.map((todo,idx)=>(
            <Todo key={idx} todo={todo} updateTodoInfo={updateTodoInfo}/>
          ))}
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export default function SelectDateDialog(props) {
  const classes = useStyles();
  const [deleteState, setDeleteState] = useState(false);
  const [updatePlanState, setUpdatePlanState] = React.useState(false);
  const [selectPlan, setSelectPlan] = React.useState();
  const [open, setOpen] = React.useState(props["open"]);

  const messageBoxHandle = (show, content, time, level) => {
    props.messageBoxHandle(show, content, time, level);
  };
  const handleClose = () => {
    setOpen(false);
    props["handleClose"]();
  };

  const selectUpdatePlan = (seq) => {
    filterEvent(seq);
    setUpdatePlanState(true);
  };

  const filterEvent = (seq) => {
    for (let i = 0; i < props["eventList"].length; i++) {
      if (props["eventList"][i]["groupId"] === seq) {
        setSelectPlan(props["eventList"][i]);
        return;
      }
    }
  };

  const deletePlanClickHandle = (idx) => {
    setSelectPlan(idx);
    setDeleteState(true);
  };

  const deletePlan = () => {
    axiosDelete.deleteNotContainsData(
      "http://localhost:8090/api/teamManage/plan/" + selectPlan,
      deletePlanSuccess
    );
  };

  const deletePlanSuccess = () => {
    props.messageBoxHandle(true, "일정 삭제 완료", 2000, "success");
    updatePlanList();
  };

  const updatePlanList = () => {
    props.updatePlanList();
    handleClose();
  };

  const updateTodo = (seq,tag) => {
    props.messageBoxHandle(true, "TodoList 변경 완료", 2000, "success");
    updatePlanList();
    handleClose();
  }

  useEffect(() => {
    setOpen(props["open"]);
  }, [props["open"]]);

  useEffect(() => {
  }, [props["eventList"]]);

  return (
    <div>
      <Dialog
        PaperComponent="div"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth={"md"}
        fullWidth
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
      >
        <Card style={{ overflowY: "scroll" }}>
          <br />
          <CardHeader color="warning">
            <Typography variant="h6" component="h6">
              일정 리스트
            </Typography>
          </CardHeader>
          <DialogContent>
            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  <h4>{props["selectDate"]}</h4>
                </ListSubheader>
              }
              className={classes.root}
            >
              {props["eventList"].map((event, idx) => (
                <ListItem component="div" alignItems="flex-start" key={idx} style={{width:'180%',marginBottom:50}}>
                  <ListItemAvatar>
                    <Avatar alt="" src="/static/images/avatar/3.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<strong>{"## " + event["title"]}</strong>}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                          style={{borderBottom:'1px solid gray'}}
                        >
                          {event["user"]["id"] === localStorage.getItem("ID") ? (
                            <span style={{ float: "right", marginTop: 0 }}>
                              <Tooltip title="수정" aria-label="add">
                                <IconButton
                                  onClick={() =>
                                    selectUpdatePlan(event["groupId"])
                                  }
                                  component="span"
                                >
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="삭제" aria-label="add">
                                <IconButton
                                  onClick={() =>
                                    deletePlanClickHandle(event["groupId"])
                                  }
                                  component="span"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </span>
                          ) : null}
                          <br/>
                          <span style={{fontSize:18}}>{event["start"]} ~ {event["end"]} <span style={{fontSize:14}}>까지</span></span>
                          <br/>
                        </Typography>
                        <br />
                        <TodoListPanel todoList={event['todoList']} updateTodoInfo={updateTodo}/>
                      </React.Fragment>
                    }
                    />
                </ListItem>
              ))}
            </List>
          </DialogContent>
        </Card>
      </Dialog>
      <UpdatePlan
        updatePlanList={updatePlanList}
        messageBoxHandle={messageBoxHandle}
        plan={selectPlan}
        open={updatePlanState}
        handleClose={() => setUpdatePlanState(false)}
      />
      <ConfirmDialog
        yseClick={deletePlan}
        title={"삭제"}
        content={"위 일정을 정말 삭제하시겠습니까?"}
        open={deleteState}
        handleClose={() => setDeleteState(false)}
      />
    </div>
  );
}

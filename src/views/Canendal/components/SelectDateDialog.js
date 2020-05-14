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
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";
import Divider from "@material-ui/core/Divider";
import ConfirmDialog from "components/ConfirmDialog/ConfirmDialog";
import CardHeader from "components/Card/CardHeader.js";
import DialogContent from "@material-ui/core/DialogContent";

import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";

import * as axiosDelete from "@axios/delete";

import UpdatePlan from "./UpdatePlan";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    marginBottom: 20,
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

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

  useEffect(() => {
    setOpen(props["open"]);
  }, [props["open"]]);

  useEffect(() => {}, [props["eventList"]]);

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
                        <span>
                          {event["content"]}
                        </span>
                        <br />
                        <br />
                        {100 - event["progress"] === 0 ? (
                        <Chip
                          component="span"
                          label={"완 료"}
                          style={{
                            color: "white",
                            background: "linear-gradient(45deg, #d81b60 30%, #ad1457 90%)",
                          }}
                        />
                        ) : (
                          <Chip
                            component="span"
                            label={100 - event["progress"] + "% 남음"}
                            style={{
                              color: "white",
                              background: "linear-gradient(45deg, #1e88e5 30%, #1565c0 90%)",
                            }}
                          />
                        )}
                        <Chip
                          component="span"
                          label={event["user"]["name"]}
                          style={{
                            marginLeft:10,
                            color: "white",
                            background: "linear-gradient(45deg, #ff8f00 30%, #ffd54f 90%)",
                          }}
                        />
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

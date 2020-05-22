import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MessageBox from "components/MessageBox/MessageBox";
import ConfirmDialog from "components/ConfirmDialog/ConfirmDialog";

import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import GridContainer from "components/Grid/GridContainer.js";
import TodoListArea from "./component/component_TodoList/TodoListArea";

import ShowSelectEvent from "../Canendal/components/ShowSelectEvent";
import UpdatePlan from "../Canendal/components/UpdatePlan";

import * as axiosGet from "@axios/get";

const styles = makeStyles((theme) => ({
  main: {
    padding: 50,
  },
  moreButton: {
    width: "100%",
    textAlign: "center",
    marginTop: 30,
  },
}));

export default function TableList(props) {
  const classes = styles();
  const [plan, setPlan] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [selectEvent, setSelectEvent] = useState();
  const [showSelectEventState, setShowSelectEventState] = useState(false);

  const [confirmDialogState, setConfirmDialogState] = useState({
    open: false,
    title: "",
    content: "",
    handleYesClick: () => {},
    handleClose: () => {},
  });

  const [showMessageState, setShowMessageState] = useState(false);
  const [MessageBoxState, setMessageBoxState] = useState({
    content: "",
    level: "success",
    time: 2000,
  });

  const dateMonthCheck = (value) => {
    const check = value + "";
    if (check.length === 1) return "0" + check;
    return check;
  };

  const getPlanListUnFinished = (number) => {
    setPage(number);
    let data = {
      year: new Date().getFullYear(),
      month: dateMonthCheck(new Date().getMonth() + 1),
      day: dateMonthCheck(new Date().getDate()),
      page: number,
      size: 6,
    };
    axiosGet.getContainsData(
      "http://localhost:8090/api/teamManage/plan/" +
        props.match.params.idx +
        "/search",
      getPlanListUnFinishedSuccess,
      data,
      true
    );
  };

  const getPlanListUnFinishedSuccess = (res) => {
    setPlan(plan.concat(res["content"]));
    setTotalPage(res["page"]["totalPages"]);
  };

  const pageMove = () => {
    getPlanListUnFinished(page + 1);
  };

  const messageBoxHandle = (show, content, time, level) => {
    setShowMessageState(show);
    setMessageBoxState({
      content: content,
      time: time,
      level: level,
    });
  };

  const confirmDialogHandle = useCallback(
    (open, title, content, handleYesClick) => {
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
    },
    []
  );

  const showUpdateDialog = (plan) => {
    setSelectEvent(plan);
    setShowSelectEventState(true);
  };

  const updatePlan = useCallback(
    (value,type) => {
      let resultPlan = [];
      for (let i = 0; i < plan.length; i++) {
        if (plan[i]["seq"] === value["seq"]) {
          if(type === 'delete'){
            continue;
          }else{
            resultPlan.push(value);
          }
        } else {
          resultPlan.push(plan[i]);
        }
      }
      messageBoxHandle(true, "변경 완료", 2000, "success");
      setPlan(resultPlan);
    },
    [plan]
  );

  useEffect(() => {
    getPlanListUnFinished(0);
  }, []);

  return (
    <div className={classes.main}>
      <GridContainer>
        <TodoListArea
          {...{ plan, confirmDialogHandle, updatePlan, showUpdateDialog }}
        />
        {totalPage === page + 1 ? null : (
          <div className={classes.moreButton}>
            <IconButton onClick={pageMove}>
              <MoreVertIcon />
            </IconButton>
          </div>
        )}
      </GridContainer>
      <MessageBox
        open={showMessageState}
        content={MessageBoxState["content"]}
        level={MessageBoxState["level"]}
        time={MessageBoxState["time"]}
        handleClose={() => setShowMessageState(false)}
      />
      <UpdatePlan
        updatePlanList={updatePlan}
        messageBoxHandle={messageBoxHandle}
        plan={selectEvent}
        open={showSelectEventState}
        handleClose={() => setShowSelectEventState(false)}
        notUpdate={true}
      />
      <ConfirmDialog
        open={confirmDialogState["open"]}
        title={confirmDialogState["title"]}
        content={confirmDialogState["content"]}
        yseClick={confirmDialogState["handleYesClick"]}
        handleClose={() =>
          setConfirmDialogState({
            open: false,
            title: confirmDialogState["title"],
            content: confirmDialogState["content"],
          })
        }
      />
    </div>
  );
}

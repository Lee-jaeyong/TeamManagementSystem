import React, { useEffect, useState, useCallback } from "react";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardHeader from "components/Card/CardHeader.js";
import DialogContent from "@material-ui/core/DialogContent";

import PlanInfo from "@commons/plan/component/readOne/PlanInfo";
import TodoList from "@commons/plan/component/readList/TodoList";
import PlanActionArea from "./PlanActionArea";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  todoListArea: {
    marginLeft: 40,
  },
});

export default function PlanDialog({ open, handleClose, plan }) {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={open}
        PaperComponent="div"
        onClose={handleClose}
        maxWidth={"sm"}
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Card className={classes.root}>
          <br />
          <CardHeader color="rose">
            <Typography variant="h6" component="h6">
              일정 정보
            </Typography>
          </CardHeader>
          <CardContent>
            <DialogContent>
              <PlanInfo {...{ plan }} />
              <TodoList
                todoList={plan["todoList"]}
                isMy={
                  plan["user"] &&
                  localStorage.getItem("ID") === plan["user"]["id"]
                    ? true
                    : false
                }
              />
            </DialogContent>
            {plan["user"] &&
            localStorage.getItem("ID") === plan["user"]["id"] ? (
              <PlanActionArea {...{ plan, handleClose }} />
            ) : null}
          </CardContent>
        </Card>
      </Dialog>
    </div>
  );
}

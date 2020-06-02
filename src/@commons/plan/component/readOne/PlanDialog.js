import React from "react";
import { useDispatch } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import Typography from "@material-ui/core/Typography";
import CardHeader from "components/Card/CardHeader.js";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CardBody from "components/Card/CardBody.js";

import { updatePlan } from "@store/actions/Plan/PlanAction";

import PlanInfo from "@commons/plan/component/readOne/PlanInfo";
import TodoList from "@commons/plan/component/readList/TodoList";
import PlanActionArea from "./PlanActionArea";

const useStyles = makeStyles({
 
});

export default function PlanDialog({ open, handleClose, plan }) {
  const dispatch = useDispatch();
  const updateTodoList = (todo) => {
    const _plan = {
      ...plan,
      todoList: todo["todoList"],
    };
    dispatch(updatePlan(_plan));
  };

  const classes = useStyles();
  return (
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={"sm"}
        fullWidth
        PaperComponent="div"
      >
        <Card>
          <CardHeader color="rose">
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="h6" component="h6">
                일정 정보
              </Typography>
            </Grid>
            <Grid item>
              <IconButton
                size={"small"}
                aria-label="close"
                onClick={handleClose}
              >
                <CloseIcon
                  style={{
                    color: "white",
                  }}
                />
              </IconButton>
            </Grid>
          </Grid>
        </CardHeader>
         
          <CardBody>
              <PlanInfo {...{ plan }} />
              <TodoList
                _updateTodoList={(todo) => updateTodoList(todo)}
                todoList={plan["todoList"]}
                isMy={
                  plan["user"] &&
                  localStorage.getItem("ID") === plan["user"]["id"]
                    ? true
                    : false
                }
              />
            {plan["user"] &&
            localStorage.getItem("ID") === plan["user"]["id"] ? (
              <PlanActionArea {...{ plan, handleClose }} />
            ) : null}
          </CardBody>
        </Card>
      </Dialog>
  );
}

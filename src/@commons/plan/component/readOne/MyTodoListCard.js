import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { CardContent, Divider } from "@material-ui/core";
import Card from "components/Card/Card.js";
import Grid from "@material-ui/core/Grid";
import TodoList from "@commons/plan/component/readList/TodoList";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import CardHeader from "components/Card/CardHeader.js";

import { updatePlan as _updatePlan } from "@store/actions/Plan/PlanAction";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(-2),
    marginRight: theme.spacing(0),
    color: "white",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function MyTodoListCard({ plan }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const countTodo = (todoList) => {
    let count = 0;
    todoList.map((todo) => {
      if (todo["ing"] === "YES") count++;
    });
    return count;
  };

  const updatePlan = (value) => {
    console.log(value);
    dispatch(_updatePlan(value));
  };

  return (
    <React.Fragment>
      <Card>
        <CardHeader color="success">
          <Grid container justify="space-between">
            <Grid item>
              <div style={{ fontSize: 15 }}>{plan ? plan["tag"] : ""}</div>
            </Grid>
            <Grid item>
              <IconButton aria-label="delete" className={classes.margin}>
                <CreateIcon fontSize="inherit" />
              </IconButton>
            </Grid>
          </Grid>
        </CardHeader>
        <CardContent>
          <Grid container justify="space-between">
            <Grid item>
              {plan ? plan["start"] : ""} ~ {plan ? plan["end"] : ""}
            </Grid>
            <Grid item>
              {plan ? (plan["todoList"] ? plan["todoList"].length : 0) : 0}개중{" "}
              {plan ? (plan["todoList"] ? countTodo(plan["todoList"]) : 0) : 0}
              개 완료
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardContent>
          <TodoList
            isMy={
              plan
                ? plan["user"] &&
                  localStorage.getItem("ID") === plan["user"]["id"]
                  ? true
                  : false
                : false
            }
            {...{ plan }}
            todoList={plan ? plan["todoList"] : []}
            _updateTodoList={(value) => updatePlan(value)}
          />
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

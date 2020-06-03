import React, { memo } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import MyTodoListCard from "@commons/plan/component/readOne/MyTodoListCard";

const TodoListArea = memo(({ plan }) => {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        {plan ? plan.map((plan, idx) => (
          <Grid key={idx} item md={12} lg={4} xs={12} sm={12}>
            <Grow in {...{ timeout: ((idx % 6) + 1) * 600 }}>
              <Paper>
                <MyTodoListCard {...{plan}} />
              </Paper>
            </Grow>
          </Grid>
        )) : null}
      </Grid>
    </React.Fragment>
  );
});

export default TodoListArea;

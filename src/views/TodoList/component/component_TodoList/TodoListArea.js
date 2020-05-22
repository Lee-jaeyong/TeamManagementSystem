import React, { memo,useEffect } from "react";
import TodoCard from "./TodoCard";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Grow from '@material-ui/core/Grow';

const TodoListArea = memo(({ plan,confirmDialogHandle,updatePlan,showUpdateDialog }) => {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        {plan.map((_data, idx) => (
          <Grid key={idx} item md={12} lg={4} xs={12} sm={12}>
            <Grow in {...{ timeout: ((idx % 6) + 1) * 600 }}>
              <Paper>
                <TodoCard todo={_data} {...{confirmDialogHandle,updatePlan,showUpdateDialog}}/>
              </Paper>
            </Grow>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
});

export default TodoListArea;

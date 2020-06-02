import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardActionArea, CardContent, Divider } from "@material-ui/core";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import Grid from "@material-ui/core/Grid";
import TodoList from '@commons/plan/component/readList/TodoList';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(-2),
      marginRight:theme.spacing(0),
      color:"white"
    },
    extendedIcon: {
        
      marginRight: theme.spacing(1),
    },
  }));

export default function MyTodoListCard({data}) {
    const classes = useStyles();

  return (
    <React.Fragment>
      <Card >
          <CardHeader color="success">
          <Grid container justify="space-between">
            <Grid item>
            <div style={{fontSize:15}}>C언어 프로젝트 완료</div>
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
            2020.06.01 ~ 2020.07.30
            </Grid>
            <Grid item>
              4개중 3개 완료
            </Grid>
          </Grid>
              
          </CardContent>
          <Divider/>
          <CardContent>
          {data.map((plan, idx) => (
          <TodoList
            isMy={
              plan["user"] && localStorage.getItem("ID") === plan["user"]["id"]
                ? true
                : false
            }
            todoList={plan["todoList"]}
            />
           ))}
          </CardContent>
      </Card>
    </React.Fragment>
  );
}

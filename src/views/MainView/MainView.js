import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import MyTodoListCard from "@commons/plan/component/readOne/MyTodoListCard";
import Grid from "@material-ui/core/Grid";

const data = [
  {
    seq: 28,
    tag: "sfsdfsf",
    start: "2020-06-02",
    end: "2020-06-18",
    teamPlan: "NO",
    state: "YES",
    user: {
      id: "dbswldnjs",
      name: "윤지원",
      email: "dbswldnjs202@naver.com",
      myImg: "dfsfsdfsdfsdfsdfsdfsdf",
      img:
        "b837b2df-1a10-413d-a73c-bad7c61fac62_KakaoTalk_20200510_192509526.jpg",
    },
    todoList: [{ seq: 32, title: "sdfs", ing: "NO" }],
    links: [],
  },
  {
    seq: 28,
    tag: "sfsdfsf",
    start: "2020-06-02",
    end: "2020-06-18",
    teamPlan: "NO",
    state: "YES",
    user: {
      id: "dbswldnjs",
      name: "윤지원",
      email: "dbswldnjs202@naver.com",
      myImg: "dfsfsdfsdfsdfsdfsdfsdf",
      img:
        "b837b2df-1a10-413d-a73c-bad7c61fac62_KakaoTalk_20200510_192509526.jpg",
    },
    todoList: [{ seq: 32, title: "sdfs", ing: "NO" }],
    links: [],
  },
  {
    seq: 28,
    tag: "sfsdfsf",
    start: "2020-06-02",
    end: "2020-06-18",
    teamPlan: "NO",
    state: "YES",
    user: {
      id: "dbswldnjs",
      name: "윤지원",
      email: "dbswldnjs202@naver.com",
      myImg: "dfsfsdfsdfsdfsdfsdfsdf",
      img:
        "b837b2df-1a10-413d-a73c-bad7c61fac62_KakaoTalk_20200510_192509526.jpg",
    },
    todoList: [{ seq: 32, title: "sdfs", ing: "NO" }],
    links: [],
  },{
    seq: 28,
    tag: "sfsdfsf",
    start: "2020-06-02",
    end: "2020-06-18",
    teamPlan: "NO",
    state: "YES",
    user: {
      id: "dbswldnjs",
      name: "윤지원",
      email: "dbswldnjs202@naver.com",
      myImg: "dfsfsdfsdfsdfsdfsdfsdf",
      img:
        "b837b2df-1a10-413d-a73c-bad7c61fac62_KakaoTalk_20200510_192509526.jpg",
    },
    todoList: [{ seq: 32, title: "sdfs", ing: "NO" }],
    links: [],
  },
];

const useStyles = makeStyles({
  cardPadding: {
    paddingLeft: 15,
    paddingRight: 15,
  },
});

export default function TableList(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container>
        <Grid item md={"4"} sm={"6"} xs={"12"} className={classes.cardPadding}>
          <MyTodoListCard {...{ data }} />
        </Grid>
        <Grid item md={"4"} sm={"6"} xs={"12"} className={classes.cardPadding}>
          <MyTodoListCard {...{ data }} />
        </Grid>
        <Grid item md={"4"} sm={"6"} xs={"12"} className={classes.cardPadding}>
          <MyTodoListCard {...{ data }} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import { Grid, CardActionArea } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import GetAppIcon from "@material-ui/icons/GetApp";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

const replyMockData = [
  {
    seq: 1,
    id: "dlwodyd202",
    name: "이재용",
    content: "안녕하세요 이재용입니다람쥐~~~",
    date: "2020-10-10",
  },
  {
    seq: 2,
    id: "fkwjddus",
    name: "라정연",
    content: "라즈베리파이를 사려하는데 어떤걸사야하는지 알려주실수있나요?",
    date: "2020-10-10",
  },
  {
    seq: 3,
    id: "dbswodnjs",
    name: "윤재원",
    content: "수업시간에는 라즈베리파이3B+ 를 사용합니다.",
    date: "2020-10-10",
  },
  {
    seq: 4,
    id: "dbswldnjs",
    name: "윤지원",
    content: "신청을 안해서구매하려구요 감사합니다",
    date: "2020-10-10",
  },
  {
    seq: 5,
    id: "dlgksk",
    name: "이하나",
    content:
      "digitalWrite와 delay를 통해 led의 밝기와 껏다키는것을 자유자제로 조정 할수있다 는 것을 알게 되었습니다.",
    date: "2020-10-10",
  },
  {
    seq: 6,
    id: "wkddbsk",
    name: "장유나",
    content:
      "주파수와 상하비의 개념을 알았고, 라즈베라파이를 이용한 led밝기 조절을 배웠습니다.",
    date: "2020-10-10",
  },
  {
    seq: 6,
    id: "dbswldnjs",
    name: "윤지원",
    content: "윤지원 이따가 맥주 마심.",
    date: "2020-10-10",
  },
  {
    seq: 3,
    id: "dbswodnjs",
    name: "윤재원",
    content: "수업시간에는 라즈베리파이3B+ 를 사용합니다.",
    date: "2020-10-10",
  },
  {
    seq: 4,
    id: "dbswldnjs",
    name: "윤지원",
    content: "신청을 안해서구매하려구요 감사합니다",
    date: "2020-10-10",
  },
  {
    seq: 5,
    id: "dlgksk",
    name: "이하나",
    content:
      "digitalWrite와 delay를 통해 led의 밝기와 껏다키는것을 자유자제로 조정 할수있다 는 것을 알게 되었습니다.",
    date: "2020-10-10",
  },
];

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: red[500],
  },
  chipCSS: {
    paddingLeft: 20,
  },
  contentsCSS: {
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
  },
  replyCSS: {
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 15,
    paddingRight: 20,
  },
  submitButtonCSS: {
    paddingLeft: 20,
    paddingTop: 10,
    paddingRight: 20,
  },
}));

export default function SearchResult(props) {
  console.log(props.match.params["search"]);

  const classes = useStyles();
  const fileList = props.fileName;

  return (
    <Paper>
      <Grid container>
        <Grid item xs={12}>
          <ListItem>
            <ListItemAvatar>
              <Avatar aria-label="recipe" className={classes.avatar}>
                ㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹ
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="윤지원" secondary="2020.04.18" />
          </ListItem>
        </Grid>
        <Grid className={classes.chipCSS} item xs={12}>
          {fileList ? (
            fileList.map((file, idx) => {
              return (
                <Chip
                  avatar={<GetAppIcon />}
                  key={idx}
                  label={file}
                  onClick={() => {
                    alert("파일 다운로드;");
                  }}
                  size="small"
                  variant="outlined"
                />
              );
            })
          ) : (
            <h6>dfㅇㄹㄴㄹㄴㅇㄹㄴㅇsf</h6>
          )}
          <Chip
            avatar={<GetAppIcon />}
            label="sdfsdfsd"
            onClick={() => {
              alert("파일 다운로드;");
            }}
            size="small"
            variant="outlined"
          />
        </Grid>
        <Grid className={classes.contentsCSS} item xs={12}>
          <CardActionArea
            onClick={() => {
              alert("본문보기");
            }}
          >
            <Typography component="p" style={{ fontSize: 16 }} variant="body2">
              메인contents
            </Typography>
          </CardActionArea>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </Grid>
    </Paper>
  );
}

// 자바스크립트 자바 어느정도하는지 어느정도라 하면 개인프로젝트에 응용해본적이있는가?
// 자바스크립트 라이브러리 리액트 배울의지있는지?
// + 교수님 강의가 따로 없다
// + 대면수업 시작하면 교수님과 모임 갖겠다(날짜,시간등 ㅈ지정) 하지만 개인적으로도 해야하는의지가있냐?

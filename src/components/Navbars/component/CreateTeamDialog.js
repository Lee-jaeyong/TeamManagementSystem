import React, { useEffect, useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MessageBox from "components/MessageBox/MessageBox";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import Card from "components/Card/Card.js";

import CardHeader from "components/Card/CardHeader.js";

import * as axiosPost from "@axios/post";


export default function FormDialog(props) {
  const name = useRef();
  const description = useRef();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");

  const [open, setOpen] = React.useState(props["open"]);
  const [showMessageState, setShowMessageState] = useState(false);
  const [MessageBoxState, setMessageBoxState] = useState({
    content: "",
    level: "success",
    time: 2000,
  });

  const messageBoxHandle = (show, content, time, level) => {
    setShowMessageState(show);
    setMessageBoxState({
      content: content,
      time: time,
      level: level,
    });
  };

  const handleClose = () => {
    setOpen(false);
    props["handleClose"]();
  };

  const createTeamHandle = () => {
    if (name.current.value.trim() === "") {
      messageBoxHandle(true, "팀명을 입력해주세요", 2000, "error");
      name.current.focus();
    } else if (!startDate) {
      messageBoxHandle(true, "팀 시작일을 입력해주세요.", 2000, "error");
    } else if (!endDate) {
      messageBoxHandle(true, "팀 마감일을 입력해주세요.", 2000, "error");
    } else if (startDateError) {
      messageBoxHandle(
        true,
        "팀 시작일은 마감일보다 작아야합니다.",
        2000,
        "error"
      );
    } else if (endDateError) {
      messageBoxHandle(
        true,
        "팀 마감일은 시작일보다 커야합니다.",
        2000,
        "error"
      );
    } else if (description.current.value === "") {
      messageBoxHandle(true, "팀 목표를 입력해주세요", 2000, "error");
      description.current.focus();
    } else {
      const team = {
        name: name.current.value,
        startDate: dateFormat(startDate + ""),
        endDate: dateFormat(endDate + ""),
        description: description.current.value
      };
      axiosPost.postContainsData(
        "http://172.30.1.37:8090/api/teamManage",
        createSuccess,
        createError,
        team
      );
    }
  };

  const dateFormat = (beforeDate) => {
    let date = new Date(beforeDate);
    let year = date.getFullYear();
    let month = dateMonthCheck(date.getMonth() + 1);
    let day = dateMonthCheck(date.getDate());
    return year + "-" + month + "-" + day;
  };

  const dateMonthCheck = (value) => {
    const check = value + "";
    if (check.length === 1) return "0" + check;
    return check;
  };

  const createSuccess = (res) => {
    props["menuUpdate"]();
    props.messageBoxHandle(true, "팀 생성 완료", 2000, "success");
    handleClose();
  };

  const createError = () => {
    messageBoxHandle(true, "팀 생성중 에러가 발생했습니다.", 2000, "error");
  };

  const handleStartDateChange = (date) => {
    if (date.toString() === "Invalid Date") {
      setStartDateError("팀을 다시 입력해주세요");
      setStartDate(null);
      return;
    }
    if (!endDate) {
      setEndDateError(null);
      setStartDateError(null);
      setStartDate(date);
    } else {
      let _endDate = new Date(endDate).getTime();
      if (_endDate < new Date(date).getTime()) {
        setStartDateError("팀 시작일은 종료일보다 작아야합니다.");
        setStartDate(date);
      } else {
        setEndDateError(null);
        setStartDateError(null);
        setStartDate(date);
      }
    }
  };

  const handleEndDateChange = (date) => {
    if (date.toString() === "Invalid Date") {
      setEndDateError("팀을 다시 입력해주세요");
      setEndDate(null);
      return;
    }
    if (!startDate) {
      setStartDateError(null);
      setEndDateError(null);
      setEndDate(date);
    } else {
      let _startDate = new Date(startDate).getTime();
      if (_startDate > new Date(date).getTime()) {
        setEndDateError("팀 종료일은 시작일보다 커야합니다.");
        setEndDate(date);
      } else {
        setStartDateError(null);
        setEndDateError(null);
        setEndDate(date);
      }
    }
  };

  useEffect(() => {
    setOpen(props["open"]);
  }, [props["open"]]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        PaperComponent="div"
      >
        <Card>
          <CardHeader color="success">
            <Typography variant="h6" component="h6">
              팀 등록
            </Typography>
          </CardHeader>
          <DialogContent>
            <DialogContentText>
              <br/>
              팀(프로젝트)을 개설합니다. 개설 후 팀원에게{" "}
              <strong>팀 코드를 배포</strong>하시기 바랍니다.
            </DialogContentText>
            <TextField
              inputRef={name}
              autoFocus
              margin="dense"
              id="name"
              label="팀(프로젝트) 명"
              fullWidth
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container>
                <Grid item xs={5}>
                  <KeyboardDatePicker
                    autoOk
                    disableToolbar
                    variant="inline"
                    format="yyyy-MM-dd"
                    margin="normal"
                    id="startDate"
                    label="시작날짜"
                    error={startDateError ? true : false}
                    helperText={startDateError}
                    value={startDate}
                    onChange={handleStartDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
                <Grid style={{ textAlign: "center" }} item xs={2}>
                  <Typography
                    variant="h4"
                    component="h4"
                    style={{ position: "relative", top: 20 }}
                  >
                    ~
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <KeyboardDatePicker
                    autoOk
                    disableToolbar
                    variant="inline"
                    format="yyyy-MM-dd"
                    error={endDateError ? true : false}
                    helperText={endDateError}
                    margin="normal"
                    id="endDate"
                    label="종료날짜"
                    value={endDate}
                    onChange={handleEndDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
            <TextField
              inputRef={description}
              style={{ marginTop: 20 }}
              id="outlined-textarea"
              fullWidth
              label="팀 최종 목표"
              multiline
            />
          </DialogContent>
          <DialogActions>
            <Button 
              style={{
                width: "100%",
                color: "white",
                background: "linear-gradient(45deg, #81c784 30%, #2e7d32 90%)",
              }}
              fullWidth
              variant="contained"
              onClick={createTeamHandle}
            >
              생 성
            </Button>
          </DialogActions>
          <MessageBox
            open={showMessageState}
            content={MessageBoxState["content"]}
            level={MessageBoxState["level"]}
            time={MessageBoxState["time"]}
            handleClose={() => setShowMessageState(false)}
          />
        </Card>
      </Dialog>
    </div>
  );
}

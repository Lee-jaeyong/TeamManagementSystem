import React, { useEffect, useState,useRef } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import Card from "components/Card/Card.js";
import Divider from "@material-ui/core/Divider";

import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import AccessTime from "@material-ui/icons/AccessTime";
import CardHeader from "components/Card/CardHeader.js";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import MessageBox from 'components/MessageBox/MessageBox';

import * as axiosPut from '@axios/put';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles({
  cardSize: {
    width: "100%",
    height: "100%",
  },
});

const PrettoSlider = withStyles({
  root: {
    color: "#00C6ED",
    height: 8,
  },
  thumb: {
    height: 30,
    width: 30,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 14,
    borderRadius: 4,
  },
  rail: {
    height: 14,
    borderRadius: 4,
  },
})(Slider);

export default function UpdatePlan(props) {
  const tag = useRef();
  const classes = useStyles();
  const [open, setOpen] = useState(props["open"]);
  const [startDate, setStartDate] = useState(props['plan'] ? props['plan']['start'] : new Date());
  const [endDate, setEndDate] = useState(props['plan'] ? props['plan']['end'] : new Date());
  const [progressValue, setProgressValue] = useState(props['plan'] ? props['plan']['progress'] : 0);
  const [showMessageState,setShowMessageState] = useState(false);
  const [MessageBoxState,setMessageBoxState] = useState(
    {
      content : "",
      level : "success",
      time : 2000
    }
  );

  const messageBoxHandle = (show,content,time,level) => {
    setShowMessageState(show);
    setMessageBoxState({
      content : content,
      time : time,
      level : level
    })
  }

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleClose = () => {
    props.handleClose();
    setOpen(false);
  };

  const handleBlur = () => {
    if (progressValue < 0) {
      setProgressValue(0);
    } else if (progressValue > 100) {
      setProgressValue(100);
    }
  };

  const handleInputChange = (event) => {
    setProgressValue(
      event.target.value === "" ? "" : Number(event.target.value)
    );
  };

  const handleSliderChange = (event, newValue) => {
    setProgressValue(newValue);
  };

  const updatePlanHandle = () => {
    if(tag.current.value.trim() === ''){
      messageBoxHandle(true,"일정 태그를 입력해주세요.",2000,'error');
      tag.current.focus();
    }else if(startDate + ''.trim() === ''){
      messageBoxHandle(true,"일정 시작일을 입력해주세요.",2000,'error');
    }else if(endDate + ''.trim() === ''){
      messageBoxHandle(true,"일정 마감일을 입력해주세요.",2000,'error');
    }else{
      const updatePlan = {
        tag:tag.current.value,
        content:'',
        start:startDate,
        end:endDate,
        progress:progressValue
      }
      axiosPut.putContainsData("http://localhost:8090/api/teamManage/plan/"+props['plan']['groupId'],updatePlanSuccess,updatePlanError,updatePlan);
    }
  }

  const updatePlanSuccess = (res) => {
    alert('aaaa');
  }

  const updatePlanError = (res) => {
    alert('bbbb');
  }

  useEffect(() => {
    if(props['open']){
      setStartDate(props['plan'] ? props['plan']['start'] : new Date())
      setEndDate(props['plan'] ? props['plan']['end'] : new Date())
      setProgressValue(props['plan'] ? props['plan']['progress'] : 0)
    }
    setOpen(props["open"]);
  }, [props["open"]]);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      PaperComponent="div"
    >
      <Card className={classes.cardSize}>
        <CardHeader color="info">
          <Typography variant="h6" component="h6">
            일정수정
          </Typography>
        </CardHeader>
        <CardBody>
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
            inputRef={tag}
            id="standard-basic"
            label="태그"
            defaultValue={props['plan'] ? props['plan']['title'] : null}
            variant="outlined"
            style={{ width: "100%", marginTop: 15 }}
          />

          <Grid
            container
            style={{ margin: 10, marginTop: 20, paddingRight: 10 }}
          >
            <Typography gutterBottom>진척도</Typography>
            <Grid item xs={11} style={{ paddingRight: 10 }}>
              <PrettoSlider
                value={typeof progressValue === "number" ? progressValue : 0}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                aria-label="pretto slider"
                defaultValue={0}
              />
            </Grid>
            <Grid item xs={1}>
              <Input
                className={classes.input}
                value={progressValue}
                margin="dense"
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{
                  step: 1,
                  min: 0,
                  max: 100,
                  type: "number",
                  "aria-labelledby": "input-slider",
                }}
              />
            </Grid>
          </Grid>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button
            style={{
              width: "100%",
              color: "white",
              background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            }}
            variant="contained"
            onClick={updatePlanHandle}
          >
            일정 수정하기
          </Button>
        </CardFooter>
      </Card>
      <MessageBox
          open={showMessageState}
          content={MessageBoxState['content']}
          level={MessageBoxState['level']}
          time={MessageBoxState['time']}
          handleClose={()=>setShowMessageState(false)}
        />
    </Dialog>
  );
}

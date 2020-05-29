import React, { useState, useEffect, memo,useCallback } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";

const KeyBoardDatePickerSection = memo(({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  setCheckDate,
  error
}) => {
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");

  const handleStartDateChange = useCallback((date) => {
    if (date.toString() === "Invalid Date") {
      setStartDateError(error['start']);
      setStartDate(null);
      setCheckDate(false);
      return;
    }
    if (!endDate) {
      setEndDateError(null);
      setStartDateError(null);
      setStartDate(dateFormat(date+""));
      setCheckDate(true);
    } else {
      let _endDate = new Date(endDate).getTime();
      if (_endDate < new Date(date).getTime()) {
        setStartDateError(error['start']);
        setStartDate(dateFormat(date+""));
        setCheckDate(false);
      } else {
        setEndDateError(null);
        setStartDateError(null);
        setStartDate(dateFormat(date+""));
        setCheckDate(true);
      }
    }
  },[]);

  const handleEndDateChange = useCallback((date) => {
    if (date.toString() === "Invalid Date") {
      setEndDateError(error['end']);
      setEndDate(null);
      setCheckDate(false);
      return;
    }
    if (!startDate) {
      setStartDateError(null);
      setEndDateError(null);
      setEndDate(dateFormat(date+""));
      setCheckDate(true);
    } else {
      let _startDate = new Date(startDate).getTime();
      if (_startDate > new Date(date).getTime()) {
        setEndDateError(error['end']);
        setEndDate(dateFormat(date+""));
        setCheckDate(false);
      } else {
        setStartDateError(null);
        setEndDateError(null);
        setEndDate(dateFormat(date+""));
        setCheckDate(true);
      }
    }
  },[]);

  const dateFormat = useCallback((beforeDate) => {
    let date = new Date(beforeDate);
    let year = date.getFullYear();
    let month = dateMonthCheck(date.getMonth() + 1);
    let day = dateMonthCheck(date.getDate());
    return year + "-" + month + "-" + day;
  },[]);

  const dateMonthCheck = useCallback((value) => {
    const check = value + "";
    if (check.length === 1) return "0" + check;
    return check;
  },[]);

  useEffect(() => {
    setStartDateError("");
    setEndDateError("");
  }, []);

  return (
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
  );
});

export default KeyBoardDatePickerSection;

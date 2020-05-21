import React, { useEffect } from 'react';

import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";

const PlanInfo = React.memo(({
    startDateError
    ,startDate
    ,endDate
    ,endDateError
    ,handleStartDateChange
    ,tag
    ,handleEndDateChange}) => {
    
    return <React.Fragment>
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
            inputRef={tag}
            id="standard-basic"
            label="태그"
            variant="outlined"
            style={{ width: "100%", marginTop: 15 }}
          />
    </React.Fragment>
});

export default PlanInfo;
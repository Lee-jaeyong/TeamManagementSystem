import React, { useRef,useState,useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import KeyBoardDatePickerSection from "@commons/component/KeyBoardDatePickerSection";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function TemporaryDrawer({
  open,
  handleClose,
  searchHandle,
}) {
  const [searchStart,setSearchStart] = useState('');
  const [searchEnd,setSearchEnd] = useState('');
  const [searchDateCheck,setSeachDateCheck] = useState(true);

  const classes = useStyles();
  const tag = useRef();
  const title = useRef();
  useEffect(()=>{
    setSearchStart('');
    setSearchEnd('');
  });
  
  return (
    <div>
      {["top"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer anchor={anchor} open={open} onClose={() => handleClose()}>
            <Grid container>
              <Grid item md={2} />
              <Grid item md={2}>
                <div
                  style={{ marginRight: 20, marginTop: 10 }}
                  className={clsx(classes.list, {
                    [classes.fullList]: anchor === "top" || anchor === "bottom",
                  })}
                  role="presentation"
                >
                  <TextField
                    fullWidth
                    inputRef={tag}
                    id="outlined-basic"
                    label="제 목"
                    variant="outlined"
                  />
                </div>
              </Grid>
              <Grid item md={3}>
                <KeyBoardDatePickerSection
                  startDate={searchStart}
                  setStartDate={setSearchStart}
                  endDate={searchEnd}
                  setEndDate={setSearchEnd}
                  setCheckDate={setSeachDateCheck}
                  error={{
                    start: "일정 시작일을 다시 입력해주세요",
                    end: "일정 마감일을 다시 입력해주세요",
                  }}
                />
              </Grid>
              <Grid item md={2}>
                <div style={{ marginLeft: 20, marginTop: 10 }}>
                  <TextField
                    fullWidth
                    inputRef={title}
                    id="outlined-basic"
                    label="~ TodoList가 포함된 일정"
                    variant="outlined"
                  />
                </div>
              </Grid>
              <Grid item md={3}>
                <div style={{ marginLeft: 20, marginTop: 20 }}>
                  <Button
                    color="primary"
                    variant="contained"
                    style={{ marginRight: 10 }}
                    onClick={() => {
                      searchHandle(
                        0,
                        tag.current.value.trim(),
                        title.current.value.trim(),
                        searchStart,
                        searchEnd,
                        true
                      );
                      handleClose();
                    }}
                  >
                    검 색
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                      setSearchStart(new Date());
                      setSearchEnd(new Date());
                      tag.current.value = "";
                      title.current.value = "";
                    }}
                  >
                    초기화
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

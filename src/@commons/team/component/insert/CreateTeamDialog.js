import React, { useEffect, useState, useRef, memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { showMessageHandle } from "@store/actions/MessageAction";
import {
  Dialog,
  Button,
  TextField,
  Typography,
  Grid,
  IconButton,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import KeyBoardDatePickerSection from "@commons/component/KeyBoardDatePickerSection";
import DragableComponent from "@commons/component/DragableComponent";

import * as TeamAccess from "@commons/team/methods/TeamAccess";
import { insertTeamHandle } from "@store/actions/Team/TeamAction";

export const CreateTeamDialog = memo(({ open, handleClose }) => {
  const dispatch = useDispatch();
  const name = useRef();
  const description = useRef();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [checkDate, setCheckDate] = useState(false);

  const messageBoxHandle = (open, content, level) => {
    dispatch(showMessageHandle({ open: open, content: content, level: level }));
  };

  async function createTeamHandle() {
    if (name.current.value.trim() === "") {
      messageBoxHandle(true, "팀명을 입력해주세요", "error");
      name.current.focus();
    } else if (!startDate) {
      messageBoxHandle(true, "팀 시작일을 입력해주세요.", "error");
    } else if (!endDate) {
      messageBoxHandle(true, "팀 마감일을 입력해주세요.", "error");
    } else if (!checkDate) {
      messageBoxHandle(true, "기간을 다시 입력해주세요", "error");
    } else if (description.current.value === "") {
      messageBoxHandle(true, "팀 목표를 입력해주세요", "error");
      description.current.focus();
    } else {
      const team = {
        name: name.current.value,
        startDate: startDate,
        endDate: endDate,
        description: description.current.value,
      };
      let successTeam = await TeamAccess.createTeam(team);
      dispatch(insertTeamHandle(successTeam));
      dispatch(
        showMessageHandle({
          open: true,
          content: "팀 등록 완료",
          level: "success",
        })
      );
      handleClose();
    }
  }

  const init = useCallback(() => {
    setStartDate(new Date());
    setEndDate(new Date());
    setCheckDate(false);
  }, []);

  useEffect(() => {
    init();
  }, [open]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={DragableComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <Card>
          <CardHeader
            color="success"
            style={{ cursor: "move" }}
            id="draggable-dialog-title"
          >
            <Grid container justify="space-between">
              <Grid item>
                <Typography variant="h6" component="h6">
                  팀 등록
                </Typography>
              </Grid>
              <Grid item>
                <IconButton
                  size={"small"}
                  aria-label="close"
                  onClick={handleClose}
                >
                  <CloseIcon
                    style={{
                      color: "white",
                    }}
                  />
                </IconButton>
              </Grid>
            </Grid>
          </CardHeader>
          <DialogContent>
            <DialogContentText>
              <br />
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
            <KeyBoardDatePickerSection
              {...{
                startDate,
                endDate,
                setStartDate,
                setEndDate,
                setCheckDate,
              }}
              error={{
                start: "팀 시작일을 다시 입력해주세요",
                end: "팀 마감일을 다시 입력해주세요",
              }}
            />
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
        </Card>
      </Dialog>
    </div>
  );
});

export default CreateTeamDialog;

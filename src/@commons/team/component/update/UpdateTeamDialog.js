import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showMessageHandle } from "@store/actions/MessageAction";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import KeyBoardDatePickerSection from "@commons/component/KeyBoardDatePickerSection";
import Typography from "@material-ui/core/Typography";
import Card from "components/Card/Card.js";
import DragableComponent from "@commons/component/DragableComponent";

import CardHeader from "components/Card/CardHeader.js";
import { updateTeam,getTeam } from "@commons/team/methods/TeamAccess";
import { updateTeamList } from "@commons/team/methods/updateStore/TeamListUpdate";

import {
  readTeamListHandle,
  updateTeamHandle,
} from "@store/actions/Team/TeamAction";

export default function FormDialog({ team, open, handleClose }) {
  const dispatch = useDispatch();
  const teamList = useSelector((state) => state["Team"]["teamList"]);
  const name = useRef();
  const description = useRef();

  const [startDate, setStartDate] = useState(team ? team["startDate"] : null);
  const [endDate, setEndDate] = useState(team ? team["endDate"] : null);
  const [checkDate, setCheckDate] = useState(true);

  const messageBoxHandle = useCallback((open, content, level) => {
    dispatch(showMessageHandle({ open: open, content: content, level: level }));
  }, []);

  async function updateTeamInfo() {
    if (!startDate) {
      messageBoxHandle(true, "일정 시작일을 입력해주세요.", "error");
    } else if (!endDate) {
      messageBoxHandle(true, "일정 마감일을 입력해주세요.", "error");
    } else if (!checkDate) {
      messageBoxHandle(true, "기간을 다시 입력해주세요", "error");
    } else if (description.current.value.trim() === "") {
      messageBoxHandle(true, "팀의 목표를 입력해주세요.", "error");
      description.current.focus();
    } else {
      const updateTeamData = {
        name: name.current.value,
        startDate: startDate,
        endDate: endDate,
        description: description.current.value,
      };
      let res = await updateTeam(team["code"], updateTeamData);
      const _updateTeam = {
        ...team,
        description : res['description'],
        startDate : res['startDate'],
        endDate : res['endDate'],
      }
      let updateList = updateTeamList(teamList, _updateTeam);
      dispatch(readTeamListHandle(updateList));
      dispatch(updateTeamHandle(_updateTeam));
      messageBoxHandle(true, "팀 수정 완료.", "success");
      handleClose();
    }
  }

  const init = useCallback(() => {
    setStartDate(team ? team["startDate"] : null);
    setEndDate(team ? team["endDate"] : null);
    setCheckDate(true);
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
            id="draggable-dialog-title"
            style={{ cursor: "move" }}
          >
            <Typography variant="h6" component="h6">
              팀 수정
            </Typography>
          </CardHeader>
          <DialogContent>
            <DialogContentText>
              <br />
              팀(프로젝트)을 <strong>수정</strong>합니다.
            </DialogContentText>
            <TextField
              autoFocus
              inputRef={name}
              margin="dense"
              id="name"
              value={team ? team["name"] : null}
              label="팀(프로젝트) 명"
              disabled
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
              defaultValue={team ? team["description"] : null}
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
              onClick={updateTeamInfo}
            >
              수 정
            </Button>
          </DialogActions>
        </Card>
      </Dialog>
    </div>
  );
}

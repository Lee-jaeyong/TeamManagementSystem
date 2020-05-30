import React, { useRef, memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { showMessageHandle } from "@store/actions/MessageAction";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Card from "components/Card/Card.js";
import { Typography, Grid } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CardHeader from "components/Card/CardHeader.js";

import * as TeamAccess from "@commons/team/methods/TeamAccess";

export const JoinTeamDialog = memo(({ open, handleClose }) => {
  const dispatch = useDispatch();
  const teamCode = useRef();

  const messageBoxHandle = useCallback((open, content, level) => {
    dispatch(showMessageHandle({ open: open, content: content, level: level }));
  }, []);

  async function joinTeamHandle() {
    if (teamCode.current.value.trim() === "") {
      messageBoxHandle(true, "팀 코드를 입력해주세요", "error");
      teamCode.current.focus();
    } else {
      try {
        await TeamAccess.joinTeam(teamCode.current.value);
        dispatch(
          showMessageHandle({
            open: true,
            content: "팀 신청 완료",
            level: "success",
          })
        );
        handleClose();
      } catch {
        messageBoxHandle(
          true,
          "등록 되지 않은 팀이거나 이미 신청한 팀, 자신이 팀장인 팀입니다.",
          "error"
        );
      }
    }
  }

  return (
    <Dialog PaperComponent="div" open={open} onClose={handleClose}>
      <Card>
        <CardHeader color="warning">
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="h6" component="h6">
                팀 참여 신청{" "}
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
            팀장에게 부여받은 팀 코드를 입력해주세요
          </DialogContentText>
          <TextField
            inputRef={teamCode}
            autoFocus
            margin="dense"
            id="name"
            label="Team Code"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            style={{
              width: "100%",
              color: "white",
              background: "linear-gradient(45deg, #ffd54f 30%, #ff8f00 90%)",
            }}
            fullWidth
            variant="contained"
            onClick={joinTeamHandle}
          >
            팀 신청
          </Button>
        </DialogActions>
      </Card>
    </Dialog>
  );
});

export default JoinTeamDialog;

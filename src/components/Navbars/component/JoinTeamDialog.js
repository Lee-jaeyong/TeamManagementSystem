import React, { useEffect, useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MessageBox from "components/MessageBox/MessageBox";
import Card from "components/Card/Card.js";
import Typography from "@material-ui/core/Typography";
import CardHeader from "components/Card/CardHeader.js";

import * as axiosPost from "@axios/post";

export default function JoinTeamDialog(props) {
  const teamCode = useRef();
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

  const joinTeamHandle = () => {
    if (teamCode.current.value.trim() === "") {
      messageBoxHandle(true, "팀 코드를 입력해주세요", 2000, "error");
      teamCode.current.focus();
    } else {
      axiosPost.postNotContainsData(
        "http://localhost:8090/api/teamManage/" +
          teamCode.current.value +
          "/joinTeam",
        successJoin,
        errorJoin
      );
    }
  };

  const successJoin = (res) => {
    props.messageBoxHandle(true, "팀 신청 완료", 2000, "success");
    handleClose();
  };

  const errorJoin = (res) => {
    messageBoxHandle(
      true,
      "존재하지 않거나, 이미 신청한 팀입니다.",
      2000,
      "error"
    );
  };

  useEffect(() => {
    setOpen(props["open"]);
  }, [props["open"]]);

  return (
    <div>
      <Dialog
        PaperComponent="div"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <Card>
          <CardHeader color="warning">
            <Typography variant="h6" component="h6">
              팀 참여 신청
            </Typography>
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

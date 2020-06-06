import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";

import { sendMessage } from "@store/actions/SocketAction";

export default function ChatDialog({ handleClose, open, team, user, message }) {
  const dispatch = useDispatch();
  const text = useRef();
  const _sendMessage = () => {
    if (text.current.value.trim() === "") {
      return;
    }
    const _chat = {
      code: team["code"],
      message: text.current.value,
      user: user["id"],
      userImg: "X",
    };
    dispatch(sendMessage(_chat));
    text.current.value = "";
    text.current.focus();
  };

  useEffect(()=>{
    if(document.getElementById("chatArea")){
      document.getElementById("chatArea").scrollTop = document.getElementById("chatArea").scrollHeight;
    }
  },[message])

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth={"md"}
        disableBackdropClick={true}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{team ? team["name"] : ""}</DialogTitle>
        <DialogContent id="chatArea" style={{ height: 300 }}>
          <DialogContentText>
            {message[0] && message[0]["message"]
              ? message[0]["message"].map((chat, idx) =>
                  chat["user"] === localStorage.getItem("ID") ? (
                    <ListItem key={idx} alignItems="flex-start">
                      <ListItemText
                        secondary={
                          <React.Fragment>
                            <Typography
                              style={{ float: "right" }}
                              component="span"
                              variant="body2"
                              color="textPrimary"
                            >
                              {chat["message"]}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  ) : (
                    <ListItem key={idx} alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={chat["user"]}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              color="textPrimary"
                            >
                              {chat["message"]}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  )
                )
              : null}
          </DialogContentText>
        </DialogContent>
        <Grid container style={{ padding: 30 }}>
          <Grid item md={11}>
            <TextField
              inputRef={text}
              margin="dense"
              variant="outlined"
              fullWidth
              onKeyUp={(e) => {
                if (window.event.keyCode === 13) _sendMessage();
              }}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              style={{ marginTop: 10, marginLeft: 10 }}
              fullWidth
              onClick={() => _sendMessage()}
              color="primary"
            >
              전 송
            </Button>
          </Grid>
        </Grid>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            닫 기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

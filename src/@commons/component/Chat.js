import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

import ChatIcon from "@material-ui/icons/Chat";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import EmailIcon from "@material-ui/icons/Email";

import ChatDialog from "@commons/component/ChatDialog";

import sound from "assets/alarm.m4a";

const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: "absolute",
    right: 50,
    bottom: 50,
  },
}));

const ChatRoomInfo = ({ chatOpen, team, open, message }) => {
  const [showMessage, setShowMessage] = useState(false);
  useEffect(() => {
    if (
      message &&
      message.length !== 0 &&
      message[message.length - 1]["user"] !== localStorage.getItem("ID")
    ) {
      try {
        document.getElementById("soundSection").play();
      } catch {}
      setShowMessage(false);
    }
  }, [message]);
  return (
    <SpeedDialAction
      style={{ marginTop: 20 }}
      icon={<ChatIcon />}
      tooltipTitle={
        <ListItem>
          <ListItemText>
            {team["name"]}
            {message && message.length !== 0 && !showMessage ? (
              <React.Fragment>
                <EmailIcon />
                <audio
                  id="soundSection"
                  controls
                  autoplay
                  style={{ display: "none" }}
                >
                  <source src={sound} type="audio/mp4" />
                </audio>
              </React.Fragment>
            ) : null}
            <span style={{ marginRight: 200 }}></span>
          </ListItemText>
        </ListItem>
      }
      tooltipOpen
      open={open}
      onClick={() => {
        setShowMessage(true);
        chatOpen(team);
      }}
    />
  );
};

export default function Chat({ teamList, user }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [chatOpenState, setChatOpenState] = useState(false);
  const [_team, setTeam] = useState();
  const [message, setMessage] = useState([]);
  const _chatData = useSelector(({ Sockcet }) => Sockcet["chatRoom"]);

  useEffect(() => {
    if (_team) {
      setMessage(_chatData.filter((value) => value["code"] === _team["code"]));
    }
  }, [_chatData]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const chatOpen = (team) => {
    setMessage(_chatData.filter((value) => value["code"] === team["code"]));
    setTeam(team);
    setChatOpenState(true);
  };

  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        className={classes.speedDial}
        hidden={hidden}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {teamList.map((team, idx) => {
          let message = "";
          _chatData.map((chat) => {
            if (team["code"] === chat["code"]) {
              message = chat["message"];
            }
          });
          return <ChatRoomInfo {...{ team, chatOpen, open, message }} />;
        })}
      </SpeedDial>
      <ChatDialog
        user={user}
        message={message}
        team={_team}
        open={chatOpenState}
        handleClose={() => setChatOpenState(false)}
      />
    </div>
  );
}

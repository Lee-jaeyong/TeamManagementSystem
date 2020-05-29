import React, { memo } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { useSelector, useDispatch } from "react-redux";

import { showMessageHandle } from "@store/actions/MessageAction";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const MessageBox = memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const messageState = useSelector((state) => state["Message"]);
  const handleClose = () => {
    dispatch(showMessageHandle({ ...messageState, open: false }));
  };
  return (
    <div className={classes.root}>
      <Snackbar
        open={messageState['open']}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert
          variant="filled"
          onClose={handleClose}
          severity={messageState["level"]}
        >
          {messageState["content"]}
        </Alert>
      </Snackbar>
    </div>
  );
});

export default MessageBox;
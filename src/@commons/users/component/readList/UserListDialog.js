import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { blue } from "@material-ui/core/colors";
import CloseIcon from "@material-ui/icons/Close";
import DragableComponent from "@commons/component/DragableComponent";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import UserListTable from "./UserListTable";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

const UserListDialog = memo(({ open, handleClose, userList }) => {
  const classes = useStyles();
  return (
    <Dialog
      PaperComponent={DragableComponent}
      aria-labelledby="draggable-dialog-title"
      onClose={handleClose}
      open={open}
    >
      <Card>
        <CardHeader
          color="rose"
          id="draggable-dialog-title"
          style={{ cursor: "move" }}
        >
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="h6" component="h6">
                팀원 목록
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
        <UserListTable userList={userList} />
      </Card>
    </Dialog>
  );
});

export default UserListDialog;

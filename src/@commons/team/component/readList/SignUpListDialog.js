import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Dialog,
  ListItemText,
  ListItemAvatar,
  ListItem,
  List,
  Typography,
  Avatar,
  IconButton,
  Button,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import DragableComponent from "@commons/component/DragableComponent";

import {
  successJoinTeam,
  faildJoinTeam,
} from "@commons/team/methods/TeamAccess";
import { deleteJoinTeamData } from "@commons/team/methods/updateStore/TeamListUpdate";
import { showMessageHandle } from "@store/actions/MessageAction";
import { showConfirmHandle } from "@store/actions/ConfirmAction";
import { updateJoinTeam } from "@store/actions/Team/TeamAction";
import { showForm } from "@store/actions/FormAction";

const useStyles = makeStyles({});

export default function SignUpListDiloag({ open, signUpList, handleClose }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const showConfirmDialog = (id) => {
    dispatch(
      showConfirmHandle({
        open: true,
        title: "승인 요청",
        content: "정말 승인 요청을 승낙하시겠습니까?",
        yseClick: () => yseClick(id),
      })
    );
  };

  const showFormDialog = (idx) => {
    dispatch(
      showForm({
        open: true,
        title: "반려",
        content: "반려 사유를 입력해주세요",
        yseClick: (value) => _falidJoinTeam(value, idx),
      })
    );
  };

  useEffect(() => {
    if (open && (!signUpList || signUpList.length === 0)) {
      dispatch(
        showMessageHandle({
          open: true,
          content: "신청 명단이 존재하지 않습니다.",
          level: "warning",
        })
      );
      handleClose();
    }
  }, [signUpList]);

  async function _falidJoinTeam(value, idx) {
    let res = await faildJoinTeam(idx, value);
    let _updateJoinTeam = deleteJoinTeamData(signUpList, { seq: idx });
    dispatch(updateJoinTeam(_updateJoinTeam));
  }

  async function yseClick(idx) {
    let res = await successJoinTeam(idx);
    let _updateJoinTeam = deleteJoinTeamData(signUpList, res);
    dispatch(updateJoinTeam(_updateJoinTeam));
  }

  return (
    <Dialog
      PaperComponent={DragableComponent}
      aria-labelledby="draggable-dialog-title"
      onClose={handleClose}
      open={open}
    >
      <Card>
        <CardHeader
          color="success"
          id="draggable-dialog-title"
          style={{ cursor: "move" }}
        >
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="h6" component="h6">
                신청 현황
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
        <List>
          {signUpList.map((user, idx) => (
            <ListItem key={idx}>
              <ListItemAvatar>
                <Avatar
                  src={
                    user["user"]["myImg"]
                      ? "data:image/png;base64," + user["user"]["myImg"]
                      : null
                  }
                />
              </ListItemAvatar>
              <ListItemText>
                <span style={{ marginRight: 30 }}>{user["user"]["id"]}</span>
                <span style={{ marginRight: 30 }}>{user["user"]["name"]}</span>
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ marginRight: 10 }}
                  onClick={() => showConfirmDialog(user["seq"])}
                >
                  승인
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => showFormDialog(user["seq"])}
                >
                  반려
                </Button>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Card>
    </Dialog>
  );
}

import React,{useEffect} from "react";
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
import PersonIcon from "@material-ui/icons/Person";
import { blue } from "@material-ui/core/colors";

import { successJoinTeam } from "@commons/team/methods/TeamAccess";
import { deleteJoinTeamData } from '@commons/team/methods/updateStore/TeamListUpdate';
import { showMessageHandle } from "@store/actions/MessageAction";
import { showConfirmHandle } from "@store/actions/ConfirmAction";
import {
  updateJoinTeam,
} from "@store/actions/Team/TeamAction";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

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

  useEffect(()=>{
    if(open && (!signUpList || signUpList.length === 0)){
      dispatch(showMessageHandle({open:true,content:"신청 명단이 존재하지 않습니다.",level:"warning"}));
      handleClose();
    }
  },[signUpList]);

  async function yseClick(idx) {
    let res = await successJoinTeam(idx);
    let _updateJoinTeam = deleteJoinTeamData(signUpList,res);
    dispatch(updateJoinTeam(_updateJoinTeam));
  }

  return (
    <Dialog PaperComponent="div" onClose={handleClose} open={open}>
      <Card>
        <CardHeader color="success">
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
                <Avatar className={classes.avatar}>
                  <PersonIcon />
                </Avatar>
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
                  // onClick={() => setFaildSignUp(user["seq"])}
                >
                  반려
                </Button>
              </ListItemText>
            </ListItem>
          ))}
        </List>
        {/* <ConfirmDialog yseClick={yesClickHandle} handleClose={()=>setConfirmState(false)} open={confirmState} title={confirmInfo['title']} content={confirmInfo['content']}/>
    <FaildSignUp open={faildSignUpState} messageBoxHandle={messageBoxHandle} updateList={props['updateList']} handleClose={()=>setFaildSignUpState(false)} signUpSeq={selectSignUp}/>
    <MessageBox
      open={showMessageState}
      content={MessageBoxState['content']}
      level={MessageBoxState['level']}
      time={MessageBoxState['time']}
      handleClose={()=>setShowMessageState(false)}
    /> */}
      </Card>
    </Dialog>
  );
}

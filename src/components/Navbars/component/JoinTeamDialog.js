import React,{useEffect,useRef,useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MessageBox from 'components/MessageBox/MessageBox';

import * as axiosPost from '@axios/post';

export default function JoinTeamDialog(props) {
  const teamCode = useRef();
  const [open, setOpen] = React.useState(props['open']);
  const [showMessageState,setShowMessageState] = useState(false);
  const [MessageBoxState,setMessageBoxState] = useState(
    {
      content : "",
      level : "success",
      time : 2000
    }
  );

  const messageBoxHandle = (show,content,time,level) => {
    setShowMessageState(show);
    setMessageBoxState({
      content : content,
      time : time,
      level : level
    })
  }
  const handleClose = () => {
    setOpen(false);
    props['handleClose']();
  };

  const joinTeamHandle = () => {
    if(teamCode.current.value.trim() === ''){
      messageBoxHandle(true,"팀 코드를 입력해주세요",2000,'error');
      teamCode.current.focus();
    }else{
      axiosPost.postNotContainsData("http://localhost:8090/api/teamManage/" + teamCode.current.value + "/joinTeam", successJoin,errorJoin)
    }
  }

  const successJoin = (res)=>{
    props.messageBoxHandle(true,"팀 신청 완료",2000,'success');
    handleClose();
  }

  const errorJoin = (res) => {
    messageBoxHandle(true,"존재하지 않거나, 이미 신청한 팀입니다.",2000,'error');
  }

  useEffect(()=>{
    setOpen(props['open']);
  },[props['open']]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">팀 참여 신청</DialogTitle>
        <DialogContent>
          <DialogContentText>
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
          <Button onClick={joinTeamHandle} color="primary">
            팀 신청
          </Button>
          <Button onClick={handleClose} color="primary">
            취 소
          </Button>
        </DialogActions>
        <MessageBox
          open={showMessageState}
          content={MessageBoxState['content']}
          level={MessageBoxState['level']}
          time={MessageBoxState['time']}
          handleClose={()=>setShowMessageState(false)}
        />
      </Dialog>
    </div>
  );
}
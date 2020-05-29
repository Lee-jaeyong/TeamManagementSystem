import React,{useEffect,useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MessageBox from 'components/MessageBox/MessageBox';

import * as axiosPut from '@axios/put';

export default function FaildSignUp(props) {
  const reson = React.useRef();
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
    props['handleClose']();
    setOpen(false);
  };

  const yseClickHandle = () => {
    if(reson.current.value.trim() === ''){
      messageBoxHandle(true,"반려 사유를 입력해주세요",2000,'error');
      reson.current.focus();
      return;
    }
    axiosPut.putNotContainsData("http://localhost:8090/api/teamManage/"+props['signUpSeq']+"/joinTeam/faild?reson="+reson.current.value.trim(),success);
    handleClose();
  }

  const success = (res) => {
    props.messageBoxHandle(true,"반려 완료",2000,'success');
    props['updateList']();
  }
  
  useEffect(()=>{
    setOpen(props['open']);
  },[props['open']]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">승인 반려</DialogTitle>
        <DialogContent>
          <DialogContentText>
            승인 반려 사유를 입력해주세요
          </DialogContentText>
          <TextField
            autoFocus
            inputRef={reson}
            margin="dense"
            id="reson"
            label="사유"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={yseClickHandle} color="primary">
            반려
          </Button>
          <Button onClick={handleClose} color="primary">
            취소
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
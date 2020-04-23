import React,{useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function JoinTeamDialog(props) {
  const [open, setOpen] = React.useState(props['open']);

  const handleClose = () => {
    setOpen(false);
    props['handleClose']();
  };

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
            autoFocus
            margin="dense"
            id="name"
            label="Team Code"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            팀 신청
          </Button>
          <Button onClick={handleClose} color="primary">
            취 소
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
import React,{useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slider from '@material-ui/core/Slider';

const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
    marginTop:20
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export default function FormDialog(props) {
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
        <DialogTitle id="form-dialog-title">팀 생성</DialogTitle>
        <DialogContent>
          <DialogContentText>
            팀(프로젝트)을 개설합니다.
            개설 후 팀원에게 <strong>팀 코드를 배포</strong>하시기 바랍니다.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="팀(프로젝트) 명"
            fullWidth
            />
          <TextField
            style={{marginTop:20}}
            id="datetime-local"
            label="프로젝트 시작일"
            type="date"
            margin="dense"
            fullWidth
            defaultValue="2017-05-24"
            InputLabelProps={{
                shrink: true,
            }}
            />
          <TextField
            style={{marginTop:20}}
            id="datetime-local"
            label="프로젝트 마감일"
            type="date"
            margin="dense"
            fullWidth
            defaultValue="2017-05-24"
            InputLabelProps={{
            shrink: true,
            }}
        />
        <TextField
          style={{marginTop:20}}
          id="outlined-textarea"
          fullWidth
          label="팀 최종 목표"
          multiline
        />
        <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={0} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            생 성
          </Button>
          <Button onClick={handleClose} color="primary">
            취 소
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
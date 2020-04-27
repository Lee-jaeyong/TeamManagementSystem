import React,{useEffect,useState,useRef} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slider from '@material-ui/core/Slider';
import Hidden from '@material-ui/core/Hidden';
import MessageBox from 'components/MessageBox/MessageBox';

import * as axiosPut from '@axios/put';

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
  const name = useRef();
  const start = useRef();
  const end = useRef();
  const description = useRef();
  const progress = useRef();

  const {team} = props;

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

  const updateTeamInfo = () => {
    if(start.current.value + ''.trim() === ''){
      messageBoxHandle(true,"시작일을 입력해주세요.",2000,'error');
      start.current.focus();
    }else if(end.current.value + ''.trim() === ''){
      messageBoxHandle(true,"마감일을 입력해주세요.",2000,'error');
      end.current.focus();
    }else if(description.current.value.trim() === ''){
      messageBoxHandle(true,"팀의 목표를 입력해주세요.",2000,'error');
      description.current.focus();
    }else{
      const team = {
        name : name.current.value,
        startDate : start.current.value,
        endDate : end.current.value,
        description : description.current.value,
        progress : progress.current.value
      };
      axiosPut.putContainsData("http://localhost:8090/api/teamManage/" + props['team']['code'],updateTeamSuccess,updateTeamError,team);
    }
  }

  const updateTeamSuccess = (res) => {
    props['messageBoxHandle'](true,"팀 수정 완료",2000,'success');
    props['updateTeamInfo']();
    handleClose();
  }

  const updateTeamError = (res) => {
    messageBoxHandle(true,"팀 수정중 문제가 발생했습니다.",2000,'error');
  }

  useEffect(()=>{
    console.log(team);
    setOpen(props['open']);
  },[props['open']]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">팀 수정</DialogTitle>
        <DialogContent>
          <DialogContentText>
            팀(프로젝트)을 <strong>수정</strong>합니다.
          </DialogContentText>
          <TextField
            autoFocus
            inputRef={name}
            margin="dense"
            id="name"
            value={team ? team['name'] : null}
            label="팀(프로젝트) 명"
            disabled
            fullWidth
            />
          <TextField
            inputRef={start}
            style={{marginTop:20}}
            id="datetime-local"
            label="프로젝트 시작일"
            type="date"
            margin="dense"
            fullWidth
            defaultValue={team ? team['startDate'] : null}
            InputLabelProps={{
                shrink: true,
            }}
            />
          <TextField
            inputRef={end}
            style={{marginTop:20}}
            id="datetime-local"
            label="프로젝트 마감일"
            type="date"
            margin="dense"
            fullWidth
            defaultValue={team ? team['endDate'] : null}
            InputLabelProps={{
            shrink: true,
            }}
        />
        <TextField
          inputRef={description}
          style={{marginTop:20}}
          id="outlined-textarea"
          fullWidth
          defaultValue={team ? team['description'] : null}
          label="팀 최종 목표"
          multiline
        />
        <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" onChange={(e,num)=>{progress.current.value = num}} defaultValue={team ? team['progress'] : 0} />
        <input type="hidden" ref={progress}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={updateTeamInfo} color="primary">
            수 정
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
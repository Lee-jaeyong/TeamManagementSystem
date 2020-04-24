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

import * as axiosPost from '@axios/post';

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

  const createTeamHandle = () => {
    if(name.current.value.trim() === ''){
      messageBoxHandle(true,"팀명을 입력해주세요",2000,'error');
      name.current.focus();
    }else if(start.current.value === ''){
      messageBoxHandle(true,"시작일을 입력해주세요",2000,'error');
      start.current.focus();
    }else if(end.current.value === ''){
      messageBoxHandle(true,"마감일을 입력해주세요",2000,'error');
      end.current.focus();
    }else if(description.current.value === ''){
      messageBoxHandle(true,"팀 목표를 입력해주세요",2000,'error');
      description.current.focus();
    }else{
      const team = {
        name:name.current.value,
        startDate:start.current.value,
        endDate:end.current.value,
        description:description.current.value
      }
      axiosPost.postContainsData("http://localhost:8090/api/teamManage",createSuccess,createError,team);
    }
  }

  const createSuccess = (res) => {
    props['menuUpdate']();
    props.messageBoxHandle(true,"팀 생성 완료",2000,'success');
    handleClose();
  }

  const createError = () => {
    messageBoxHandle(true,"팀 생성중 에러가 발생했습니다.",2000,'error');
  }

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
            inputRef={name}
            autoFocus
            margin="dense"
            id="name"
            label="팀(프로젝트) 명"
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
            defaultValue="2017-05-24"
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
            defaultValue="2017-05-24"
            InputLabelProps={{
            shrink: true,
            }}
        />
        <TextField
          inputRef={description}
          style={{marginTop:20}}
          id="outlined-textarea"
          fullWidth
          label="팀 최종 목표"
          multiline
        />
        <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" onChange={(e,num)=>{progress.current.value = num}} defaultValue={0} />
        <input type="hidden" ref={progress}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={createTeamHandle} color="primary">
            생 성
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
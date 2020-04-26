import React,{useEffect,useState,useRef} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Chip from '@material-ui/core/Chip';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import UpdatePlan from './UpdatePlan';
import ConfirmDialog from 'components/ConfirmDialog/ConfirmDialog';
import * as axiosDelete from '@axios/delete';
import * as axiosPatch from '@axios/patch';
import MessageBox from 'components/MessageBox/MessageBox';

const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
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

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ShowSelectEvent(props) {
  const classes = useStyles();
  const progress = useRef();
  const [updatePlanState,setUpdatePlanState] = React.useState(false);
  const [confirmState,setConfirmState] = useState(false);

  const [open, setOpen] = React.useState(props['open']);
  const [checkDate,setCheckDate] = React.useState(0);
  const {event} = props;
  const [confirmDialogState,setConfirmDialogState] = useState(false);
  const [confirmDialogInfo,setConfirmDialogInfo] = useState({
    title : "",
    content : ""
  })
  const [showMessageState,setShowMessageState] = useState(false);
  const [MessageBoxState,setMessageBoxState] = useState(
    {
      content : "",
      level : "success",
      time : 2000
    }
  );

  const _messageBoxHandle = (show,content,time,level) => {
    setShowMessageState(show);
    setMessageBoxState({
      content : content,
      time : time,
      level : level
    })
  }

  const messageBoxHandle = (show,content,time,level) => {
    props.messageBoxHandle(show,content,time,level);
  }

  const handleClose = () => {
    setOpen(false);
    props['handleClose']();
  };

  const notYet_d_dayCalculate = (targetDate) => {
    let _target = new Date(targetDate).getTime();
    let _now = new Date().getTime();
    if(_now < _target){
      return parseInt((_target-_now)/86400000);
    }
  }

  const remain_d_dayCalcultate = (targetDate) => {
    let _target = new Date(targetDate).getTime();
    let _now = new Date().getTime();
    if(_now < _target){
      return parseInt((_now-_target)/86400000);
    }
  }

  const updatePlanList = () => {
    props.updatePlanList();
    handleClose();
  }

  const yseClickHandle = () => {
    if(confirmState)
      axiosDelete.deleteNotContainsData("http://localhost:8090/api/teamManage/plan/" + props['event']['groupId'],deletePlanSuccess);
    else{
      let data = new FormData();
      data.append("progress",progress.current.value);
      axiosPatch.patchContainsData("http://localhost:8090/api/teamManage/plan/"+ props['event']['groupId']+"/updateProgress",updateProgressSuccess,updateProgressError,data);
    }
  }

  const updateProgressSuccess = (res) => {
    messageBoxHandle(true,"진척도 변경 완료",2000,'success');
    updatePlanList();
  }

  const updateProgressError = () => {
    _messageBoxHandle(true,"진척도 변경 중 오류가 발생했습니다.",2000,'error');
  }

  const deletePlanSuccess = () => {
    props.messageBoxHandle(true,"일정 삭제 완료",2000,'success');
    updatePlanList();
  }

  const deleteHandle = () => {
    setConfirmDialogState(true);
    setConfirmDialogInfo({
      title : "삭제",
      content : "위 일정을 정말 삭제하시겠습니까?"
    });
    setConfirmState(true);
  }
  
  const updateProgress = () => {
    setConfirmDialogState(true);
    setConfirmDialogInfo({
      title : "진척도 변경",
      content : "정말 진척도를 변경하시겠습니까?"
    });
    setConfirmState(false);
  }

  const updateProgressState = (num) => {
    progress.current.value = num;
  }

  useEffect(()=>{
    let notYetDate = notYet_d_dayCalculate(event ? event['start'] : null);
    if(notYetDate){
      setCheckDate("일정 시작 "+ notYetDate + "일 전");
    }else{
      let checkData = remain_d_dayCalcultate(event ? event['end'] : null);
      checkData || checkData === 0 ? setCheckDate("일정 종료까지 " + checkData + "일 남음") : setCheckDate("마감된 일정");
    }
    setOpen(props['open']);
  },[props['open']]);

  useEffect(()=>{
    setCheckDate(0);
  },[props['event']]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Card className={classes.root}>
          <CardContent>
            <Chip label={props['event'] ? props['event']['user']['name'] : null} color="primary" style={{marginBottom:30,marginRight:10}}/>
            <Chip label={checkDate} color="info" style={{marginBottom:30,marginRight:10}}/>
            <Chip label={props['event'] ? props['event']['progress'] + "% 진행" : null} color="secondary" style={{marginBottom:30}}/>
            <Typography variant="h6" component="h3">
              {event ? event['title'] : null}
              <br />
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {event ? event['start'] : null} ~ {event ? event['end'] : null}
            </Typography>
            <PrettoSlider valueLabelDisplay="auto" style={{width:'65%'}} aria-label="pretto slider" defaultValue={props['event'] ? props['event']['progress'] : null} onChange={(e,num)=>updateProgressState(num)}/>
            <input type="hidden" ref={progress}/>
            {props['event'] && props['event']['user']['id'] === localStorage.getItem('ID') ? 
            (
              <Button size="small" style={{float:'right'}} variant="outlined" color="secondary" onClick={updateProgress}>변 경</Button>
            ) : 
            null}
          </CardContent>
          {props['event'] && props['event']['user']['id'] === localStorage.getItem('ID') ? 
          (
          <CardActions style={{float:'right'}}>
            <Button size="small" onClick={()=>setUpdatePlanState(true)}>수정</Button>
            <Button size="small" onClick={deleteHandle}>삭제</Button>
          </CardActions>
          ) : null}
        </Card>
      </Dialog>
      <UpdatePlan updatePlanList={updatePlanList} messageBoxHandle={messageBoxHandle} plan={props['event']} open={updatePlanState} handleClose={setUpdatePlanState}/>
      <ConfirmDialog yseClick={yseClickHandle} title={confirmDialogInfo['title']} content={confirmDialogInfo['content']} open={confirmDialogState} handleClose={()=>setConfirmDialogState(false)}/>
      <MessageBox
          open={showMessageState}
          content={MessageBoxState['content']}
          level={MessageBoxState['level']}
          time={MessageBoxState['time']}
          handleClose={()=>setShowMessageState(false)}
        />
    </div>
  );
}
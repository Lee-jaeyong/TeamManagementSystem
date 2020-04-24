import React,{useEffect} from 'react';
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

  const [updatePlanState,setUpdatePlanState] = React.useState(false);
  const [open, setOpen] = React.useState(props['open']);
  const [checkDate,setCheckDate] = React.useState(0);
  const {event} = props;

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
            <Chip label="이재용" color="primary" style={{marginBottom:30,marginRight:10}}/>
            <Chip label={checkDate} color="info" style={{marginBottom:30,marginRight:10}}/>
            <Chip label="10% 진행" color="secondary" style={{marginBottom:30}}/>
            <Typography variant="h6" component="h3">
              {event ? event['title'] : null}
              <br />
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {event ? event['start'] : null} ~ {event ? event['end'] : null}
            </Typography>
            <PrettoSlider valueLabelDisplay="auto" style={{width:'65%'}} aria-label="pretto slider" defaultValue={20} />
            <Button size="small" style={{float:'right'}} variant="outlined" color="secondary">변 경</Button>
          </CardContent>
          <CardActions style={{float:'right'}}>
            <Button size="small" onClick={()=>setUpdatePlanState(true)}>수정</Button>
            <Button size="small">삭제</Button>
          </CardActions>
        </Card>
      </Dialog>
      <UpdatePlan open={updatePlanState} handleClose={setUpdatePlanState}/>
    </div>
  );
}
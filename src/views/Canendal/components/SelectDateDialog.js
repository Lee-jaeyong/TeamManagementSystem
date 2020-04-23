import React,{useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Slider from '@material-ui/core/Slider';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import CardHeader from "components/Card/CardHeader.js";

const useStyles = makeStyles((theme) => ({
  root: {
    width:500,
    marginBottom:20
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

export default function SelectDateDialog(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(props['open']);
  const handleClose = () => {
    setOpen(false);
    props['handleClose']();
  };

  useEffect(()=>{
    setOpen(props['open'])
  },[props['open']]);
  
  useEffect(()=>{
    console.log(props['eventList'])
  },[props['eventList']]);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{props['selectDate']} 일정 리스트</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          </DialogContentText>
          {props['eventList'].map((event,idx)=>{
            return (
            <div key={idx}>
            <Card className={classes.root}>
              <CardContent>
              <Typography className={classes.pos} color="textSecondary">
                #{event['content']}
              </Typography>
              <Typography variant="h6" component="h2">
                {event['tag']}
              </Typography>
              <Typography variant="body2" component="p">
                {event['start']} ~ {event['end']}
              </Typography>
              <div>
                <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" value={event['progress']} />
                <Chip label={"윤지원"} style={{marginRight:10}} color="secondary"/>
                <Chip label={100-event['progress'] + "% 남음"} color="primary"/>
              </div>
              <div style={{float:'right',marginTop:-20}}>
                <Tooltip title="수정" aria-label="add">
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="삭제" aria-label="add">
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </CardContent>
            </Card>
            </div>
            )
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            확 인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
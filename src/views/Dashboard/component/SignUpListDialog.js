import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';

const mockData = [
  {seq:"1",id:"dlwodyd202",name:"이재용",email:"wodyd202@naver.com"},
  {seq:"1",id:"dlwodyd202",name:"윤지원",email:"wodyd202@naver.com"},
  {seq:"1",id:"dlwodyd202",name:"장유나",email:"wodyd202@naver.com"},
  {seq:"1",id:"dlwodyd202",name:"박선규",email:"wodyd202@naver.com"},
  {seq:"1",id:"dlwodyd202",name:"홍지환",email:"wodyd202@naver.com"},
  {seq:"1",id:"dlwodyd202",name:"박남일",email:"wodyd202@naver.com"},
  {seq:"1",id:"dlwodyd202",name:"조성택",email:"wodyd202@naver.com"},
  {seq:"1",id:"dlwodyd202",name:"심일식",email:"wodyd202@naver.com"}
]

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export default function SimpleDialogDemo(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(props['open']);

  const handleClose = () => {
    setOpen(false);
    props['handleClose']();
  };

  useEffect(()=>{
    setOpen(props['open']);
  },[props['open']]);

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
    <DialogTitle id="simple-dialog-title">신청 현황</DialogTitle>
    <List>
      {mockData.map((user,idx) => (
        <ListItem key={idx}>
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>
            <span style={{marginRight:30}}>
              {user['id']}
            </span>
            <span style={{marginRight:30}}>
              {user['name']}
            </span>
            <Button variant="outlined" color="primary" style={{marginRight:10}}>승인</Button>
            <Button variant="outlined" color="secondary">거절</Button>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  </Dialog>
  );
}
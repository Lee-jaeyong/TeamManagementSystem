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
import { blue } from '@material-ui/core/colors';
import MessageBox from 'components/MessageBox/MessageBox';

import ConfirmDialog from 'components/ConfirmDialog/ConfirmDialog';
import FaildSignUp from './component/FaildSignUp';

import * as axiosPatch from '@axios/patch';
import * as axiosPut from '@axios/put';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export default function SimpleDialogDemo(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(props['open']);
  const [selectSignUp,setSelectSignUp] = useState();
  const [faildSignUpState,setFaildSignUpState] = useState(false);
  const [confirmState,setConfirmState] = useState(false);
  const [confirmInfo,setConfirmInfo] = useState({
    title : '승인신청',
    content : '승인신청하시겠습니까?'
  });
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

  const {signUpList} = props;

  const handleClose = () => {
    props['handleClose']();
    setOpen(false);
  };

  const yesClickHandle = () => {
    axiosPut.putNotContainsData("http://localhost:8090/api/teamManage/" + selectSignUp + "/joinTeam/success",signUpSuccess);
  }

  const signUpSuccess = (res) => {
    props.updateList();
    messageBoxHandle(true,"승인 완료",2000,"success");
  }

  const selectHandle = (value) => {
    setSelectSignUp(value);
    setConfirmState(true);
  }

  const setFaildSignUp = (value) => {
    setSelectSignUp(value);
    setFaildSignUpState(true);
  }

  useEffect(()=>{
    setOpen(props['open']);
  },[props['open']]);

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
    <DialogTitle id="simple-dialog-title">신청 현황</DialogTitle>
    <List>
      {signUpList.map((user,idx) => (
        <ListItem key={idx}>
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>
            <span style={{marginRight:30}}>
              {user['user']['id']}
            </span>
            <span style={{marginRight:30}}>
              {user['user']['name']}
            </span>
            <Button variant="outlined" color="primary" style={{marginRight:10}} onClick={()=>selectHandle(user['seq'])}>승인</Button>
            <Button variant="outlined" color="secondary" onClick={()=>setFaildSignUp(user['seq'])}>반려</Button>
          </ListItemText>
        </ListItem>
      ))}
    </List>
    <ConfirmDialog yseClick={yesClickHandle} handleClose={()=>setConfirmState(false)} open={confirmState} title={confirmInfo['title']} content={confirmInfo['content']}/>
    <FaildSignUp open={faildSignUpState} messageBoxHandle={messageBoxHandle} updateList={props['updateList']} handleClose={()=>setFaildSignUpState(false)} signUpSeq={selectSignUp}/>
    <MessageBox
      open={showMessageState}
      content={MessageBoxState['content']}
      level={MessageBoxState['level']}
      time={MessageBoxState['time']}
      handleClose={()=>setShowMessageState(false)}
    />
  </Dialog>
  );
}
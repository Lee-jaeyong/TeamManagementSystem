import React, { useEffect,useState } from "react";
import ChartistGraph from "react-chartist";
import { makeStyles,withStyles } from "@material-ui/core/styles";
import AccessTime from "@material-ui/icons/AccessTime";
import DeleteIcon from '@material-ui/icons/Delete';

// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/core/Slider';
import CreateIcon from '@material-ui/icons/Create';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';

import MessageBox from 'components/MessageBox/MessageBox';
import UpdateTeamDialog from './component/UpdateTeamDialog';
import bgImage from "assets/img/teamInfoBack.jpg";

const useStyles = makeStyles(styles);

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

export default function SignUpList(props){
    const classes = useStyles();
    const [updateTeam,setUpdateTeam] = useState(false);
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

    const copyCode = () => {
      let dummy = document.createElement("textarea");
      document.body.appendChild(dummy);
      dummy.value = document.getElementById("teamCode").innerText;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
      messageBoxHandle(true,"팀 코드가 복사되었습니다.",2000,'success');
    }

    const {teamInfo} = props;
    const updateTeamHandle = () => {
        setUpdateTeam(true);
    }

    useEffect(()=>{
    },[]);

    return (
        <Card>
            <CardHeader color={teamInfo ? teamInfo['teamLeader']['id'] === localStorage.getItem("ID") ? "rose" : "warning" : null} stats icon>
            </CardHeader>
            <CardBody>
            <br/>
            <br/>
            <span style={{fontSize:20}}><span style={{fontSize:15}}>Since...</span> {teamInfo ? teamInfo['startDate'] : null} ~ {teamInfo ? teamInfo['endDate'] : null}</span>
            {teamInfo ? teamInfo['teamLeader']['id'] === localStorage.getItem("ID") ? (
              <Tooltip title="수정" style={{position:"relative", top:-5}}>
                <IconButton aria-label="update" onClick={updateTeamHandle}>
                  <CreateIcon />
                </IconButton>
              </Tooltip>
             ) : null : null}
            <h1 className={classes.cardTitle}><strong>{teamInfo ? teamInfo['name'] : null}</strong>
            <span style={{fontSize:20}}>
            {teamInfo ? teamInfo['teamLeader']['id'] === localStorage.getItem("ID") ? " [팀 코드 : "+ teamInfo['code'] + "]" : "" : null}</span>{teamInfo ? teamInfo['teamLeader']['id'] === localStorage.getItem("ID") ? (<Button onClick={copyCode} variant="outlined" color="secondary" style={{marginLeft:10}}>복사하기</Button>) : "" : null}</h1>
            {teamInfo ? teamInfo['teamLeader']['id'] === localStorage.getItem("ID") ? (<div id="teamCode" style={{display:'none'}}>{teamInfo['code']}</div>) : null : null}
            <Divider/>
            <div className={classes.cardCategory}>
                <span style={{fontSize:22}}>{teamInfo ? teamInfo['description'] : null}</span>
                {teamInfo ? teamInfo['joinPerson'] ? (
                <AvatarGroup style={{marginTop:20}} max={teamInfo ? teamInfo['joinPerson'] ? teamInfo['joinPerson'].length + 1 : 1 : 1}>
                    <Avatar alt="" src="/static/images/avatar/1.jpg" />
                    {teamInfo ? teamInfo['joinPerson'] ? teamInfo['joinPerson'].map((person,idx)=>{
                        return (
                            <Avatar key={idx} alt="" src="/static/images/avatar/1.jpg" />
                        )
                    }) : null : null}
                </AvatarGroup>
                ) : <Avatar alt="" style={{marginTop:20}} src="/static/images/avatar/1.jpg" /> : ""}
            </div>
            <br/>
            </CardBody>
            <UpdateTeamDialog updateTeamInfo={props.updateTeamInfo} messageBoxHandle={messageBoxHandle} team={teamInfo} open={updateTeam} handleClose={()=>setUpdateTeam(false)}/>
            <MessageBox
                open={showMessageState}
                content={MessageBoxState['content']}
                level={MessageBoxState['level']}
                time={MessageBoxState['time']}
                handleClose={()=>setShowMessageState(false)}
            />
        </Card>
    )
}
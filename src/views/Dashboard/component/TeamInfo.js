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
import GroupIcon from '@material-ui/icons/Group';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/core/Slider';
import CreateIcon from '@material-ui/icons/Create';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';

import MessageBox from 'components/MessageBox/MessageBox';
import UpdateTeamDialog from './component/UpdateTeamDialog';

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

    const {teamInfo} = props;
    console.log(teamInfo);
    const updateTeamHandle = () => {
        setUpdateTeam(true);
    }

    useEffect(()=>{
    },[]);

    return (
        <Card>
            <CardHeader color={teamInfo ? teamInfo['teamLeader']['id'] === localStorage.getItem("ID") ? "rose" : "warning" : null} stats icon>
                <CardIcon color={teamInfo ? teamInfo['teamLeader']['id'] === localStorage.getItem("ID") ? "rose" : "warning" : null}>
                    <GroupIcon />
                </CardIcon>
                {teamInfo ? teamInfo['teamLeader']['id'] === localStorage.getItem("ID") ? (<div>
                    <Tooltip title="수정">
                        <IconButton aria-label="update" onClick={updateTeamHandle}>
                            <CreateIcon />
                        </IconButton>
                    </Tooltip>
                </div>
                ) : null : null}
            </CardHeader>
            <CardBody>
            <h3 className={classes.cardTitle}><strong>{teamInfo ? teamInfo['name'] : null}</strong><span style={{fontSize:20}}>{teamInfo ? teamInfo['teamLeader']['id'] === localStorage.getItem("ID") ? " [팀 코드 : "+ teamInfo['code'] + "]" : "" : null}</span></h3>
            <p className={classes.cardCategory}>
                {teamInfo ? teamInfo['description'] : null}
                <AvatarGroup max={teamInfo ? teamInfo['joinPerson'].length + 1 : 0}>
                    {teamInfo ? teamInfo['joinPerson'].map((person,idx)=>{
                        return (
                            <Avatar key={idx} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        )
                    }) : null}
                </AvatarGroup>
            </p>
            <br/>
            {teamInfo ? teamInfo['startDate'] : null} ~ {teamInfo ? teamInfo['endDate'] : null}
            <Chip style={{marginLeft:10}} color="primary" label={
                teamInfo ? parseInt((new Date(teamInfo['endDate']).getTime() - new Date().getTime()) / 86400000) + 1 + " 일 남음" : null
            }/>
            <Chip style={{marginLeft:10}} label={teamInfo ? "팀장 : " +  teamInfo['teamLeader']['name'] : null} color="secondary"/>
            <Grid container style={{marginTop:20,marginLeft:20}}>
                <Grid item sm={12} md={1}>
                    <Chip label={"현재 진척도"} color=""/>
                </Grid>
                <Grid item sm={12} md={8}>
                    <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" value={teamInfo ? teamInfo['progress'] : 0} />
                </Grid>
            </Grid>
            </CardBody>
            <CardFooter chart>
            </CardFooter>
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
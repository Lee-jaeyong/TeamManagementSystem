import React, { useEffect,useState } from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import { CardActionArea } from "@material-ui/core";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import DateRange from "@material-ui/icons/DateRange";
import SignUpListDialog from './SignUpListDialog';

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import MessageBox from 'components/MessageBox/MessageBox';

import * as axiosGet from '@axios/get';

const useStyles = makeStyles(styles);

export default function SignUpList(props){
    const classes = useStyles();
    const [signUpList,setSignUplist] = useState(false);
    const [signUpUserList,setSignUpUserList] = useState([]);
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

    const getSignUpList = () => {
        axiosGet.getNotContainsData("http://localhost:8090/api/teamManage/" + props['code'] + "/signUpList",getSignUpListSuccess);
    }

    const getSignUpListSuccess = (res) => {
        if(props['teamLeader'] !== localStorage.getItem('ID')){
            return;
        }
        if(!res['content']){
            setSignUpUserList([]);
            return;
        }
        let userList = [];
        const result = res['content'];        
        for(let i =0;i<result.length;i++){
            userList.push(result[i]);
        }
        setSignUpUserList(userList);
    }

    const ShowSignUpDialog = () => {
        if(signUpUserList.length > 0)
            setSignUplist(true);
        else
            messageBoxHandle(true,"신청 명단이 존재하지 않습니다.",2000,'error');
    }

    useEffect(()=>{
        getSignUpList();
    },[]);

    return (
        <Card>
            <CardActionArea onClick={ShowSignUpDialog}>
            <CardHeader color="rose" stats icon>
                <CardIcon color="rose">
                <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Board</p>
                <h3 className={classes.cardTitle}>신청<br/> 현황</h3>
                <br />
            </CardHeader>
            <CardFooter stats>
                <div className={classes.stats}>
                <Danger>
                    <DateRange />
                </Danger>
                신청 현황
                </div>
            </CardFooter>
            </CardActionArea>
            <SignUpListDialog updateList={getSignUpList} signUpList={signUpUserList} open={signUpList} handleClose={()=>setSignUplist(false)}/>
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
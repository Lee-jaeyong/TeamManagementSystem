import React, { useEffect,useState } from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import { CardActionArea } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
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

import * as axiosGet from '@axios/get';

const useStyles = makeStyles(styles);

export default function SignUpList(props){
    const classes = useStyles();
    const [signUpList,setSignUplist] = useState(false);
    const [signUpUserList,setSignUpUserList] = useState([]);

    const getSignUpList = () => {
        axiosGet.getNotContainsData("http://localhost:8090/api/teamManage/" + props['code'] + "/signUpList",getSignUpListSuccess);
    }

    const getSignUpListSuccess = (res) => {
        if(!res['_embedded']){
            setSignUpUserList([]);
            return;
        }
        let userList = [];
        const result = res['_embedded']['joinTeamList'];        
        for(let i =0;i<result.length;i++){
            userList.push(result[i]);
        }
        setSignUpUserList(userList);
    }

    useEffect(()=>{
        if(props['teamLeader'] === localStorage.getItem('ID')){
            getSignUpList();
        }
        setSignUplist(false);
    },[props['location']]);

    return (
        <Card>
            <CardActionArea onClick={()=>setSignUplist(true)}>
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
                공지, 자료, 게시글
                </div>
            </CardFooter>
            </CardActionArea>
            <SignUpListDialog updateList={getSignUpList} signUpList={signUpUserList} open={signUpList} handleClose={()=>setSignUplist(false)}/>
        </Card>
    )
}
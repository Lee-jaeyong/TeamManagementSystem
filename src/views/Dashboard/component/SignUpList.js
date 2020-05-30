import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import SignUpListDialog from "@commons/team/component/readList/SignUpListDialog";

import { getJoinTeamList } from "@commons/team/methods/TeamAccess";
import { updateJoinTeam } from "@store/actions/Team/TeamAction";
import { showMessageHandle } from "@store/actions/MessageAction";

import * as axiosGet from "@axios/get";

const useStyles = makeStyles(styles);

export default function SignUpList(props) {
  const dispatch = useDispatch();

  const _signUpList = useSelector((state) => state["Team"]["joinTeam"]);

  const classes = useStyles();
  const [signUpList, setSignUplist] = useState(false);
  const [signUpUserList, setSignUpUserList] = useState([]);

  async function getSignUpList() {
    let res = await getJoinTeamList(props["code"]);
    dispatch(updateJoinTeam(res["content"]));
  }

  const getSignUpListSuccess = (res) => {
    if (props["teamLeader"] !== localStorage.getItem("ID")) {
      return;
    }
    if (!res) {
      setSignUpUserList([]);
      return;
    }
    let userList = [];
    const result = res;
    for (let i = 0; i < result.length; i++) {
      userList.push(result[i]);
    }
    setSignUpUserList(userList);
  };

  const ShowSignUpDialog = () => {
    if (signUpUserList.length > 0) setSignUplist(true);
    else {
      dispatch(showMessageHandle({open:true,content:"신청 명단이 존재하지 않습니다.",level:"warning"}));
    }
  };

  useEffect(() => {
    getSignUpListSuccess(_signUpList);
  }, [_signUpList]);

  useEffect(() => {
    getSignUpList();
  }, []);

  return (
    <Card>
      <CardActionArea onClick={ShowSignUpDialog}>
        <CardHeader color="rose" stats icon>
          <CardIcon color="rose">
            <Store />
          </CardIcon>
          <p className={classes.cardCategory}>Board</p>
          <h3 className={classes.cardTitle}>
            신청
            <br /> 현황
          </h3>
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
      <SignUpListDialog
        signUpList={signUpUserList}
        open={signUpList}
        handleClose={() => setSignUplist(false)}
      />
    </Card>
  );
}

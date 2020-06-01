import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

import Scheduler from "@commons/plan/component/readList/Scheduler";

import { getPlanList } from "@commons/plan/methods/PlanAccess";
import { readPlanListHandle } from "@store/actions/Plan/PlanAction";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <FormControl variant="outlined" className={classes.formControl}>
        <Select value={10}>
          <MenuItem value={0}>전체 보기</MenuItem>
          <MenuItem value={10}>내 일정만 보기</MenuItem>
        </Select>
    </FormControl>
  );
};

export default function Calendal(props) {
  const dispatch = useDispatch();
  const _planList = useSelector((state) => state["Plan"]["planList"]);

  async function _getPlanList() {
    let now = new Date();
    let data = {
      date:
        now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate(),
      size: 200,
      page: 0,
    };
    const planList = await getPlanList(props.match.params.idx, data);
    dispatch(readPlanListHandle(planList["content"]));
  }

  useEffect(() => {
    _getPlanList();
  }, []);

  return (
    <div>
      <Card>
        <CardHeader color="rose" stats>
          <Header />
        </CardHeader>
        <CardBody>
          <Scheduler plan={_planList} />
        </CardBody>
        <CardFooter chart></CardFooter>
      </Card>
    </div>
  );
}

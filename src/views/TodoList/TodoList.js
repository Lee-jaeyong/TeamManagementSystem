import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import GridContainer from "components/Grid/GridContainer.js";
import TodoListArea from "./component/TodoListArea";

import { getPlanListMy } from "@commons/plan/methods/PlanAccess";
import { getTeam } from "@commons/team/methods/TeamAccess";
import { readTeamOneHandle } from "@store/actions/Team/TeamAction";

const styles = makeStyles((theme) => ({
  main: {
    padding: 50,
  },
  moreButton: {
    width: "100%",
    textAlign: "center",
    marginTop: 30,
  },
}));

const filterMyPlans = (planList) => {
  return planList.filter(
    (plan) => plan["user"]["id"] === localStorage.getItem("ID")
  );
};

export default function TableList(props) {
  const dispatch = useDispatch();
  const classes = styles();
  const [planList, setPlanList] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const _teamInfo = useSelector((state) => state["Team"]["team"]);
  const _planList = useSelector((state) => state["Plan"]["planList"]);

  async function getPlanListUnFinished(number) {
    setPage(number);
    const data = {
      page: number,
      size: 6,
    };
    let res = await getPlanListMy(
      _teamInfo["code"] ? _teamInfo["code"] : props.match.params.idx,
      data
    );
    setTotalPage(Math.ceil(res["page"]["totalElements"] / 6));
    setPlanList(planList.concat(res["content"]));
  }

  const pageMove = () => {
    getPlanListUnFinished(page + 1);
  };

  async function getTeamInfo(data) {
    let res = await getTeam(data);
    dispatch(readTeamOneHandle(res));
  }

  useEffect(() => {
    if (!_teamInfo) getTeamInfo(props.match.params.idx);
    getPlanListUnFinished(0);
  }, []);

  return (
    <div className={classes.main}>
      <GridContainer>
        <TodoListArea plan={filterMyPlans(planList)} />
        {totalPage === page + 1 ? null : (
          <div className={classes.moreButton}>
            <IconButton onClick={pageMove}>
              <MoreVertIcon />
            </IconButton>
          </div>
        )}
      </GridContainer>
    </div>
  );
}

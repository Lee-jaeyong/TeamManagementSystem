import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";

import GridContainer from "components/Grid/GridContainer.js";
import TodoListArea from "./component/TodoListArea";
import PlanSearchDrawer from "@commons/plan/component/readOne/PlanSearchDrawer";
import Chip from "@material-ui/core/Chip";

import { readPlanListHandle } from "@store/actions/Plan/PlanAction";
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

export default function TableList(props) {
  const dispatch = useDispatch();
  const classes = styles();

  const [searchTitle, setSearchTitle] = useState("");
  const [searchTag, setSearchTag] = useState("");
  const [searchStart, setSearchStart] = useState("");
  const [searchEnd, setSearchEnd] = useState("");
  const [searchDateCheck, setSeachDateCheck] = useState(true);

  const [searchDialogState, setSearchDialogState] = useState(false);
  const [planList, setPlanList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const _teamInfo = useSelector((state) => state["Team"]["team"]);
  const _planList = useSelector((state) => state["Plan"]["planList"]);

  async function getPlanListUnFinished(number, tag, title, start, end, search) {
    if (
      number === page &&
      tag === searchTag &&
      title === searchTitle &&
      start === searchStart &&
      end === searchEnd
    ) {
      return;
    }
    setPage(number);
    setSearchTag(tag);
    setSearchTitle(title);
    setSearchStart(start);
    setSearchEnd(end);
    const data = {
      page: number,
      size: 6,
      tag: tag,
      title: title,
      start: start,
      end: end,
    };
    let res = await getPlanListMy(
      _teamInfo["code"] ? _teamInfo["code"] : props.match.params.idx,
      data
    );
    setTotalCount(res["page"]["totalElements"]);
    setTotalPage(Math.ceil(res["page"]["totalElements"] / 6));
    if (search) {
      setPlanList(res["content"]);
      dispatch(readPlanListHandle(res["content"]));
    } else {
      setPlanList(planList.concat(res["content"]));
      dispatch(readPlanListHandle(planList.concat(res["content"])));
    }
  }

  const pageMove = () => {
    getPlanListUnFinished(
      page + 1,
      searchTag,
      searchTitle,
      searchStart,
      searchEnd
    );
  };

  async function getTeamInfo(data) {
    let res = await getTeam(data);
    dispatch(readTeamOneHandle(res));
  }

  const filterMyPlans = useCallback((planList) => {
    return planList.filter(
      (plan) => plan["user"]["id"] === localStorage.getItem("ID")
    );
  }, []);

  useEffect(() => {
    setPlanList(_planList);
  }, [_planList]);

  useEffect(() => {
    if (!_teamInfo) getTeamInfo(props.match.params.idx);
    getPlanListUnFinished(0, "", "", "", "");
  }, []);

  return (
    <div className={classes.main}>
      <PlanSearchDrawer
        searchHandle={getPlanListUnFinished}
        open={searchDialogState}
        handleClose={() => setSearchDialogState(false)}
      />
      <Button
        style={{ marginBottom: 30 }}
        variant="contained"
        onClick={() => setSearchDialogState(true)}
        color="primary"
      >
        조건부 검색
      </Button>
      <Button
        style={{ marginBottom: 30, marginLeft: 10 }}
        variant="contained"
        onClick={() => getPlanListUnFinished(0, "", "", "", "", true)}
      >
        초기화
      </Button>
      <div style={{ float: "right" }}>
        <Chip label={totalCount + " 건의 일정이 존재합니다."} />
      </div>
      <GridContainer>
        <TodoListArea plan={filterMyPlans(planList)} />
        {totalPage === page || totalPage === page + 1 ? null : (
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

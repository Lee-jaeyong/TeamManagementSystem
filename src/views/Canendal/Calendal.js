import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

import Scheduler from "@commons/plan/component/readList/Scheduler";

import {
  readPlanListHandle,
  readPlanHandle,
} from "@store/actions/Plan/PlanAction";

import CreatePlanDialog from "@commons/plan/component/insert/CreatePlanDialog";
import SearchBar from "@commons/component/SearchBar";
import PlanDialog from "@commons/plan/component/readOne/PlanDialog";
import PlanListDialog from "@commons/plan/component/readList/PlanListDialog";
import ExcelDataReadDialog from "@commons/plan/component/readList/ExcelDataReadDialog";

import {
  getExcelData,
  getPlanListAll,
  getPlan,
  excelFormDown,
} from "@commons/plan/methods/PlanAccess";
import { showConfirmHandle } from "@store/actions/ConfirmAction";
import { showMessageHandle } from "@store/actions/MessageAction";

import { getTeam } from "@commons/team/methods/TeamAccess";
import { readTeamOneHandle } from "@store/actions/Team/TeamAction";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

const useStyles = makeStyles((theme) => ({}));

const Header = ({
  userList,
  selectChange,
  selectState,
  createPlanDialogHandle,
  searchPlan,
  teamCode,
  teamLeader,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [fileSection, setFileSection] = useState(true);
  const [excelDataDialgState, setExcelDataDialogState] = useState(false);
  const [excelDataFile, setExcelDataFile] = useState();
  const [ecelData, setExcelData] = useState([]);

  async function upload(file) {
    if (!file) return;
    setFileSection(false);
    const data = new FormData();
    data.append("file", file);
    setExcelDataFile(file);
    try {
      let res = await getExcelData(teamCode, data);
      if (res["_embedded"]) {
        setExcelData(res["_embedded"]["planByUserList"]);
      }
      setExcelDataDialogState(true);
    } catch (error) {
      setExcelDataFile(null);
      dispatch(
        showMessageHandle({
          open: true,
          content: "엑셀 형식이 잘못되었습니다.",
          level: "error",
        })
      );
    }
    setFileSection(true);
  }

  const excelFileUpload = ({ target }) => {
    upload(target.files[0]);
  };

  const excelFormDownload = () => {
    dispatch(
      showConfirmHandle({
        open: true,
        title: "엑셀 양식 다운로드",
        content: "엑셀 양식을 다운로드 하시겠습니까?",
        yseClick: () => excelFormDown(),
      })
    );
  };

  return (
    <React.Fragment>
      <ExcelDataReadDialog
        {...{ excelDataFile, setExcelDataFile, teamCode }}
        open={excelDataDialgState}
        handleClose={() => {
          setExcelDataDialogState(false);
          setExcelDataFile(null);
        }}
        data={ecelData}
      />
      <FormControl variant="outlined">
        <Select value={selectState} onChange={selectChange}>
          <MenuItem value={"all"}>전체 보기</MenuItem>
          {userList.map((user, idx) => (
            <MenuItem key={idx} value={user["id"]}>
              {user["name"]} 의 일정 보기
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div style={{ float: "left", marginRight: 30, marginTop: 5 }}>
        <SearchBar title={"일정"} onClick={searchPlan} />
      </div>
      <div style={{ float: "right", marginTop: 10 }}>
        {teamLeader &&
          (teamLeader === localStorage.getItem("ID") ? (
            <React.Fragment>
              <Button variant="contained" onClick={excelFormDownload}>
                엑셀 양식 다운로드
              </Button>{" "}
              {fileSection ? (
                <input
                  accept="xlsx/*"
                  style={{ display: "none" }}
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={excelFileUpload}
                />
              ) : null}
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                  엑셀 파일 업로드
                </Button>
              </label>{" "}
            </React.Fragment>
          ) : null)}
        <Button variant="contained" onClick={createPlanDialogHandle}>
          일정 등록
        </Button>
      </div>
    </React.Fragment>
  );
};

const getPersonList = (plan) => {
  let result = [];
  for (let i = 0; i < plan.length; i++) {
    let chk = true;
    for (let j = 0; j < result.length; j++) {
      if (plan[i]["user"]["id"] === result[j]["id"]) {
        chk = false;
        break;
      }
    }
    if (chk) {
      result.push(plan[i]["user"]);
    }
  }
  return result;
};

export default function Calendal(props) {
  const dispatch = useDispatch();
  const _planList = useSelector((state) => state["Plan"]["planList"]);
  const _plan = useSelector((state) => state["Plan"]["plan"]);
  const _teamInfo = useSelector((state) => state["Team"]["team"]);

  const [selectState, setSelectState] = useState("all");
  const [searchState, setSearchState] = useState("");
  const [createPlanDialogState, setCreatePlanDialogState] = useState(false);
  const [readPlanDialogState, setReadPlanDialogState] = useState(false);
  const [planListDialogState, setPlanListDialogState] = useState(false);
  const [selectDatePlanList, setSelectDatePlanList] = useState([]);

  async function getTeamInfo(data) {
    let res = await getTeam(data);
    dispatch(readTeamOneHandle(res));
  }

  async function _getPlanList() {
    let data = {
      size: 200,
      page: 0,
    };
    const planList = await getPlanListAll(props.match.params.idx, data);
    dispatch(readPlanListHandle(planList["content"]));
  }

  const selectChange = ({ target }) => {
    setSelectState(target.value);
  };

  const createPlanDialogHandle = () => {
    setCreatePlanDialogState(true);
  };

  const searchPlan = (value) => {
    setSelectState("all");
    setSearchState(value);
  };

  const showPlan = (_planList) => {
    let result = _planList;
    if (searchState.trim() !== "") {
      result = result.filter((plan) => plan["tag"].indexOf(searchState) != -1);
    }
    if (selectState === "all") {
      return result;
    }
    return result.filter((plan) => plan["user"]["id"] === selectState);
  };

  async function showEvent(groupId) {
    let res = await getPlan(groupId);
    dispatch(readPlanHandle(res));
    setReadPlanDialogState(true);
  }

  const dateClickHandle = (date) => {
    let result = [];
    const clickDate = new Date(date).getTime();
    _planList.map((plan) => {
      if (
        new Date(plan["start"]).getTime() <= clickDate &&
        new Date(plan["end"]).getTime() > clickDate
      )
        result.push(plan);
    });
    setSelectDatePlanList(result);
    setPlanListDialogState(true);
  };

  const updatePlanToPlanListTab = () => {
    let result = [];
    selectDatePlanList.map((plan) => {
      if (_plan["seq"] === plan["seq"]) result.push(_plan);
      else result.push(plan);
    });
    setSelectDatePlanList(result);
  };

  useEffect(() => {
    updatePlanToPlanListTab();
  }, [_plan]);

  useEffect(() => {
    if (!_teamInfo) getTeamInfo(props.match.params.idx);
    setSelectDatePlanList([]);
    _getPlanList();
  }, []);

  return (
    <React.Fragment>
      <PlanListDialog
        data={selectDatePlanList ? selectDatePlanList : []}
        open={planListDialogState}
        handleClose={() => setPlanListDialogState(false)}
      />
      <PlanDialog
        open={readPlanDialogState}
        handleClose={() => setReadPlanDialogState(false)}
        plan={_plan}
      />
      <CreatePlanDialog
        teamCode={props.match.params.idx}
        open={createPlanDialogState}
        handleClose={() => setCreatePlanDialogState(false)}
      />
      <Card>
        <CardHeader
          color={
            selectState === "all" && searchState.trim() === "" ? "info" : "rose"
          }
        >
          <Header
            {...{
              selectChange,
              selectState,
              createPlanDialogHandle,
              searchPlan,
            }}
            teamLeader={
              _teamInfo["teamLeader"] ? _teamInfo["teamLeader"]["id"] : null
            }
            teamCode={props.match.params.idx}
            userList={getPersonList(_planList)}
          />
        </CardHeader>
        <CardBody>
          <Scheduler
            header={{
              left: "prev,next today",
              center: "title",
              right: "print addSchedule",
            }}
            editable
            dateClick={(date) => dateClickHandle(date["dateStr"])}
            eventClick={({ event }) => showEvent(event["_def"]["groupId"])}
            droppable={true}
            plan={showPlan(_planList)}
            customButtons={{
              print: {
                text: "일정 인쇄",
                click: function() {
                  window.print();
                },
              },
            }}
          />
        </CardBody>
        <CardFooter chart></CardFooter>
      </Card>
    </React.Fragment>
  );
}

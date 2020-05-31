import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showMessage, showMessageHandle } from "@store/actions/MessageAction";
import PlanListTab from "@commons/plan/component/readList/PlanListTab";
import PlanListDialog from "@commons/plan/component/readList/PlanListDialog";
import CreatePlanDialog from '@commons/plan/component/insert/CreatePlanDialog';
const mockData = [
  {
    seq: 0,
    tag: "제목입니다1",
    start: "2020-05-29",
    end: "2020-05-29",
    teamPlan: "NO",
    state: "YES",
    user: {
      id: "dbswldnjs",
      name: "윤지원",
      email: "wldnj@naver.com",
      myImg: null,
    },
    todoList: [{title:"todoList13",ing:'YES'},{title:"todoLis412412t1todoLdoLis4124oLis412412t1",ing:'YES'},{title:"todoList1",ing:'YES'}],
    links: [],
  },
  {
    seq: 1,
    tag: "태그입니다2",
    start: "2020-06-29",
    end: "2020-07-29",
    teamPlan: "NO",
    state: "YES",
    user: {
      id: "dbswodnjsl",
      name: "윤재원",
      email: "재원@naver.com",
      myImg: null,
    },
    todoList: [],
    links: [],
  },
  {
    seq: 2,
    tag: "태그,제목입니다3",
    start: "2020-08-29",
    end: "2020-09-29",
    teamPlan: "NO",
    state: "YES",
    user: {
      id: "dlwodyd",
      name: "이재용",
      email: "재용202@naver.com",
      myImg: null,
    },
    todoList: [],
    links: [],
  },
  {
    seq: 2,
    tag: "태그,제목입니다3",
    start: "2020-08-29",
    end: "2020-09-29",
    teamPlan: "NO",
    state: "YES",
    user: {
      id: "dlwodyd",
      name: "이재용",
      email: "재용202@naver.com",
      myImg: null,
    },
    todoList: [],
    links: [],
  },
  {
    seq: 2,
    tag: "태그,제목입니다3",
    start: "2020-08-29",
    end: "2020-09-29",
    teamPlan: "NO",
    state: "YES",
    user: {
      id: "dlwodyd",
      name: "이재용",
      email: "재용202@naver.com",
      myImg: null,
    },
    todoList: [],
    links: [],
  },
  {
    seq: 2,
    tag: "태그,제목입니다3",
    start: "2020-08-29",
    end: "2020-09-29",
    teamPlan: "NO",
    state: "YES",
    user: {
      id: "dlwodyd",
      name: "이재용",
      email: "재용202@naver.com",
      myImg: null,
    },
    todoList: [],
    links: [],
  },
  {
    seq: 2,
    tag: "태그,제목입니다3",
    start: "2020-08-29",
    end: "2020-09-29",
    teamPlan: "NO",
    state: "YES",
    user: {
      id: "dlwodyd",
      name: "이재용",
      email: "재용202@naver.com",
      myImg: null,
    },
    todoList: [],
    links: [],
  },
  {
    seq: 2,
    tag: "태그,제목입니다3",
    start: "2020-08-29",
    end: "2020-09-29",
    teamPlan: "NO",
    state: "YES",
    user: {
      id: "dlwodyd",
      name: "이재용",
      email: "재용202@naver.com",
      myImg: null,
    },
    todoList: [],
    links: [],
  },
  {
    seq: 2,
    tag: "태그,제목입니다3",
    start: "2020-08-29",
    end: "2020-09-29",
    teamPlan: "NO",
    state: "YES",
    user: {
      id: "dlwodyd",
      name: "이재용",
      email: "재용202@naver.com",
      myImg: null,
    },
    todoList: [],
    links: [],
  },
];

export default function TableList(props) {
  const [createTeamDialogState, setCreateTeamDialogState] = useState(true);
  return <CreatePlanDialog  open={createTeamDialogState} handleClose={() => setCreateTeamDialogState(false)} />;
}

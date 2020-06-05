import {
  READ_PLAN_LIST,
  READ_PLAN_COUNT_GROUP_BY_USER,
  READ_PLAN_PROGRESS,
  INSERT_PLAN,
  READ_PLAN,
  DELETE_PLAN,
  UPDATE_PLAN,
} from "../../actions/Plan/PlanAction";

const init = {
  planList: [],
  plan: {},
  planListCount: [],
  planProgress: [],
};

const updatePlanListHandle = (originPlanList, plan) => {
  let result = [];
  for (let i = 0; i < originPlanList.length; i++) {
    if (originPlanList[i]["seq"] === plan["seq"]) result.push(plan);
    else result.push(originPlanList[i]);
  }
  return result;
};

function parseDate(day) {
  let date = new Date(day);
  return (
    date.getFullYear() +
    "-" +
    plusZeroDate(date.getMonth() + 1) +
    "-" +
    plusZeroDate(date.getDate())
  );
}

function plusZeroDate(day) {
  return day < 10 ? "0" + day : day;
}

export default function PlanReducer(state = init, action) {
  switch (action.type) {
    case READ_PLAN_LIST:
      return Object.assign({}, state, {
        planList: action["planList"],
      });
    case READ_PLAN_COUNT_GROUP_BY_USER:
      return Object.assign({}, state, {
        planListCount: action["planListCount"],
      });
    case READ_PLAN_PROGRESS:
      return Object.assign({}, state, {
        planProgress: action["planProgress"],
      });
    case INSERT_PLAN:
      const _plan = {
        ...action["plan"],
        start: parseDate(action["plan"]["start"]),
        end: parseDate(action["plan"]["end"]),
      };
      return Object.assign({}, state, {
        planList: state["planList"].concat(_plan),
        plan: _plan,
      });
    case READ_PLAN:
      return Object.assign({}, state, {
        plan: action["plan"],
      });
    case DELETE_PLAN:
      return Object.assign({}, state, {
        planList: state["planList"].filter(
          (plan) => plan["seq"] !== action["plan"]["seq"]
        ),
      });
    case UPDATE_PLAN:
      return Object.assign({}, state, {
        plan: action["plan"],
        planList: updatePlanListHandle(state["planList"], action["plan"]),
      });
    default:
      return state;
  }
}

import {
  READ_PLAN_LIST,
  READ_PLAN_COUNT_GROUP_BY_USER,
  INSERT_PLAN,
  READ_PLAN,
  DELETE_PLAN,
  UPDATE_PLAN,
} from "../../actions/Plan/PlanAction";

const init = {
  planList: [],
  plan: {},
  planListCount: [],
};

const updatePlanListHandle = (originPlanList, plan) => {
  let result = [];
  for (let i = 0; i < originPlanList.length; i++) {
    if (originPlanList[i]["seq"] === plan["seq"]) result.push(plan);
    else result.push(originPlanList[i]);
  }
  return result;
};

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
    case INSERT_PLAN:
      return Object.assign({}, state, {
        planList: state["planList"].concat(action["plan"]),
        plan: action["plan"],
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

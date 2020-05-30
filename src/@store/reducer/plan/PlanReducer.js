import {
  READ_PLAN_LIST,
  READ_PLAN_COUNT_GROUP_BY_USER,
} from "../../actions/Plan/PlanAction";

const init = {
  planList: [],
  plan: {},
  planListCount : []
};

export default function PlanReducer(state = init, action) {
  switch (action.type) {
    case READ_PLAN_LIST:
      return Object.assign({}, state, {
        planList: action["planList"],
      });
    case READ_PLAN_COUNT_GROUP_BY_USER :
      return Object.assign({},state,{
        planListCount : action['planListCount']
      });
    default:
      return state;
  }
}

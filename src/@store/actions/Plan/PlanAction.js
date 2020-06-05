export const READ_PLAN_LIST = "READ_PLAN_LIST";
export const READ_PLAN_COUNT_GROUP_BY_USER = "READ_PLAN_COUNT_GROUP_BY_USER";
export const READ_PLAN = "READ_PLAN";
export const INSERT_PLAN = "INSERT_PLAN";
export const DELETE_PLAN = "DELETE_PLAN";
export const UPDATE_PLAN = "UPDATE_PLAN";
export const READ_PLAN_PROGRESS = "READ_PLAN_PROGRESS";

export const readPlanHandle = (plan) => {
  return {
    type: READ_PLAN,
    plan: plan,
  };
};

export const readPlanListHandle = (planList) => {
  return {
    type: READ_PLAN_LIST,
    planList: planList,
  };
};

export const readPlanListProgressHandle = (planProgress) => {
  return { type: READ_PLAN_PROGRESS, planProgress: planProgress };
};

export const readPlanListCountHandle = (planListCount) => {
  return {
    type: READ_PLAN_COUNT_GROUP_BY_USER,
    planListCount: planListCount,
  };
};

export const insertPlanList = (plan) => {
  return {
    type: INSERT_PLAN,
    plan: plan,
  };
};

export const updatePlan = (plan) => {
  return {
    type: UPDATE_PLAN,
    plan: plan,
  };
};

export const deletePlan = (plan) => {
  return {
    type: DELETE_PLAN,
    plan: plan,
  };
};

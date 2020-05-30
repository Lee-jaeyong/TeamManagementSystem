export const READ_PLAN_LIST = "READ_PLAN_LIST";
export const READ_PLAN_COUNT_GROUP_BY_USER = "READ_PLAN_COUNT_GROUP_BY_USER";
export const READ_PLAN = "READ_PLAN";

export const readPlanListHandle = (planList) => {
    return {
        type : READ_PLAN_LIST,
        planList : planList
    }
}

export const readPlanListCountHandle = (planListCount) => {
    return {
        type : READ_PLAN_COUNT_GROUP_BY_USER,
        planListCount : planListCount
    }
}

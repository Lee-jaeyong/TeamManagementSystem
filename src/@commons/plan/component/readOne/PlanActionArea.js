import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";

import { deletePlan } from "@commons/plan/methods/PlanAccess";
import { deletePlan as _deletePlan } from "@store/actions/Plan/PlanAction";

import { showMessageHandle } from "@store/actions/MessageAction";
import { showConfirmHandle } from "@store/actions/ConfirmAction";
import UpdatePlanDialog from "../update/UpdatePlanDialog";

const PlanActionArea = React.memo(({ plan, handleClose }) => {
  const dispatch = useDispatch();
  const [updatePlanDialogState, setUpdatePlanDialogState] = useState(false);

  async function deleteHandle() {
    dispatch(
      showConfirmHandle({
        open: true,
        title: "일정 삭제",
        content: "정말 일정을 삭제하시겠습니까?",
        yseClick: () => {
          let res = deletePlan(plan["seq"]);
          dispatch(_deletePlan(plan));
          dispatch(
            showMessageHandle({
              open: true,
              content: "삭제 완료",
              level: "success",
            })
          );
          if (handleClose) handleClose();
        },
      })
    );
  }

  return (
    <CardActions>
      <UpdatePlanDialog
        {...{ plan }}
        open={updatePlanDialogState}
        handleClose={() => setUpdatePlanDialogState(false)}
      />
      <Button
        style={{
          width: "100%",
          color: "white",
          background: "linear-gradient(45deg, #e91e63 30%, #c2185b 90%)",
        }}
        fullWidth
        variant="contained"
        onClick={() => setUpdatePlanDialogState(true)}
      >
        수정
      </Button>
      <Button
        style={{
          width: "100%",
          color: "white",
          background: "linear-gradient(45deg, #e91e63 30%, #c2185b 90%)",
        }}
        fullWidth
        variant="contained"
        onClick={deleteHandle}
      >
        삭제
      </Button>
    </CardActions>
  );
});

export default PlanActionArea;

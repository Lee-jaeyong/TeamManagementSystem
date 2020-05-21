import React from "react";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";

const ActionArea = React.memo(({setUpdatePlanState,deleteHandle}) => {
  return (
    <CardActions>
      <Button
        style={{
          width: "100%",
          color: "white",
          background: "linear-gradient(45deg, #e91e63 30%, #c2185b 90%)",
        }}
        fullWidth
        variant="contained"
        onClick={() => setUpdatePlanState(true)}
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

export default ActionArea;

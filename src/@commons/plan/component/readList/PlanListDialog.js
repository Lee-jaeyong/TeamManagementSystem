import React, { useRef, memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { showMessageHandle } from "@store/actions/MessageAction";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Card from "components/Card/Card.js";
import { Typography, Grid } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CardHeader from "components/Card/CardHeader.js";

import PlanListTab from "./PlanListTab";

export const PlanListDialog = memo(({ open, handleClose, data }) => {
  const dispatch = useDispatch();

  return (
    <Dialog PaperComponent="div" maxWidth={"md"} fullWidth open={open} onClose={handleClose}>
      <Card>
        <CardHeader color="warning">
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="h6" component="h6">
                일정 리스트{" "}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton
                size={"small"}
                aria-label="close"
                onClick={handleClose}
              >
                <CloseIcon
                  style={{
                    color: "white",
                  }}
                />
              </IconButton>
            </Grid>
          </Grid>
        </CardHeader>
        <DialogContent>
          <PlanListTab {...{ data }} />
        </DialogContent>
      </Card>
    </Dialog>
  );
});

export default PlanListDialog;

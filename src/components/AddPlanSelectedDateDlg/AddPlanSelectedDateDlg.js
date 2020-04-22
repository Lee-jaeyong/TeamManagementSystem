import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import AccessTime from "@material-ui/icons/AccessTime";
import CardHeader from "components/Card/CardHeader.js";
import ChartistGraph from "react-chartist";
import { dailySalesChart, emailsSubscriptionChart } from "variables/charts.js";

const useStyles = makeStyles({
  //   avatar: {
  //     backgroundColor: blue[100],
  //     color: blue[600],
  //   },
});

export default function AddPlanSelectedDateDlg(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(props["open"]);

  const handleClose = () => {
    props.handleClose();
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    setOpen(props["open"]);
  }, [props["open"]]);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      PaperComponent="div"
    >
      <Card chart>
        <CardHeader color="warning">
          <ChartistGraph
            style={{ height: 380 }}
            className="ct-chart"
            data={emailsSubscriptionChart.data}
            type="Bar"
            options={emailsSubscriptionChart.options}
            responsiveOptions={emailsSubscriptionChart.responsiveOptions}
            listener={emailsSubscriptionChart.animation}
          />
        </CardHeader>
        <CardBody>
          <h4 className={classes.cardTitle}>개인별 진척도</h4>
          <p className={classes.cardCategory}>
            팀원과 자신의 진척도를 비교할 수 있습니다.
          </p>
        </CardBody>
        <CardFooter chart>
          <div className={classes.stats}>
            <AccessTime /> 내 일정에 대한 진척도 보기
          </div>
        </CardFooter>
      </Card>
    </Dialog>
  );
}

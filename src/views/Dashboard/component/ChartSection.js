import React, { useEffect,useState } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AccessTime from "@material-ui/icons/AccessTime";

// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { emailsSubscriptionChart } from "variables/charts.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function SignUpList(props){
    const classes = useStyles();

    useEffect(()=>{
    },[]);

    return (
        <Card chart>
            <CardHeader color="warning">
            <ChartistGraph
                style={{ height: 320 }}
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
    )
}
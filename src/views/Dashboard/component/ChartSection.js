import React, { useEffect, useState } from "react";
import ChartistGraph from "react-chartist";
import { makeStyles } from "@material-ui/core/styles";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(styles);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const chartData = (user, value) => {
  return {
    data: {
      labels: user,
      series: [value],
    },
    options: {
      axisX: {
        showGrid: false,
      },
      low: 0,
      high: 300,
      chartPadding: {
        top: 0,
        right: 5,
        bottom: 0,
        left: 0,
      },
    },
    responsiveOptions: [
      [
        "screen and (max-width: 640px)",
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function(value) {
              return value[0];
            },
          },
        },
      ],
    ],
    animation: {
      draw: function(data) {
        if (data.type === "bar") {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * 80,
              dur: 500,
              from: 0,
              to: 1,
              easing: "ease",
            },
          });
        }
      },
    },
  };
};

export default function SignUpList(props) {
  const classes = useStyles();
  const [data, setData] = useState();
  const [title, setTitle] = useState("개인별 일정수");
  const [content, setContent] = useState(
    "팀원과 자신의 일정수를 비교할 수 있습니다."
  );
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      setTitle("개인별 일정수");
      setContent("팀원과 자신의 일정수를 비교할 수 있습니다.");
    } else if (newValue === 1) {
      setTitle("팀 진척도 현황");
      setContent("팀의 진척도 현황을 확인할 수 있습니다.");
    }
  };

  const parseChartData = (data) => {
    let user = [];
    let value = [];
    for (let i = 0; i < data.length; i++) {
      user.push(data[i]["name"]);
      value.push(data[i]["count"]);
    }
    setData({
      user: user,
      value: value,
    });
  };

  useEffect(() => {
    parseChartData(props["data"]);
  }, [props["data"]]);

  return (
    <Card chart>
      <CardHeader color={value === 0 ? "warning" : "success"}>
        <TabPanel value={value} index={0}>
          <ChartistGraph
            style={{ height: 200 }}
            className="ct-chart"
            data={
              chartData(data ? data["user"] : [], data ? data["value"] : [])
                .data
            }
            type="Bar"
            options={chartData.options}
            responsiveOptions={chartData.responsiveOptions}
            listener={chartData.animation}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ChartistGraph
            style={{ height: 200 }}
            className="ct-chart"
            data={
              chartData(data ? data["user"] : [], data ? data["value"] : [])
                .data
            }
            type="Line"
            options={chartData.options}
            responsiveOptions={chartData.responsiveOptions}
            listener={chartData.animation}
          />
        </TabPanel>
      </CardHeader>
      <CardBody>
        <h4 className={classes.cardTitle}>{title ? title : null}</h4>
        <p className={classes.cardCategory}>{content ? content : null}</p>
        <Divider style={{ marginTop: 7, marginBottom: 0 }} />
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="개인별 일정수" {...a11yProps(0)} />
          <Tab label="팀 진척도 현황" {...a11yProps(1)} />
        </Tabs>
      </CardBody>
    </Card>
  );
}

import React from "react";
import Chart from "react-google-charts";

const parseChartData = (data) => {
  if (!data) return [];
  let result = [];
  data.map((plan) => {
    result.push([
      plan["user"]["name"],
      new Date(plan["start"]),
      new Date(plan["end"]),
    ]);
  });
  result.unshift([
    { type: "string", id: "President" },
    { type: "date", id: "시작일" },
    { type: "date", id: "마감일" },
  ]);
  return result;
};

const PlanChart = ({ data }) => {
  return (
    <React.Fragment>
      <Chart
        width={"100%"}
        height={"300px"}
        chartType="Timeline"
        loader={<div>Loading Chart</div>}
        data={parseChartData(data)}
        options={{
          showRowNumber: true,
        }}
        rootProps={{ "data-testid": "1" }}
      />
      <iframe name="planChartPrint" style={{ display: "none" }} />
    </React.Fragment>
  );
};

export default PlanChart;

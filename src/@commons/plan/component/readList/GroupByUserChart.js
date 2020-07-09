import React, { memo } from "react";
import Chart from "react-google-charts";

const parseChartData = (data) => {
  let result = [];
  result.push(["", "전체 일정", "전체 단건 일정", "완료 단건 일정"]);
  data.map((dataInfo) => {
    result.push([
      dataInfo["name"],
      parseInt(dataInfo["planCount"]),
      parseInt(dataInfo["todoCount"]),
      parseInt(dataInfo["successTodoCount"]),
    ]);
  });
  if (result.length === 1) result.push(["일정 없음", 0, 0, 0]);
  return result;
};

const GroupByUserChart = memo(({ data }) => {
  return (
    <div id="chart">
      <Chart
        width={"100%"}
        height={"300px"}
        chartType="Bar"
        loader={<div>Loading Chart</div>}
        data={parseChartData(data)}
        options={{
          chart: {},
        }}
        rootProps={{ "data-testid": "2" }}
      />
      <iframe name="chartPrint" style={{ display: "none" }} />
    </div>
  );
});

export default GroupByUserChart;

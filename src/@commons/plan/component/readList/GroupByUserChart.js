import React, { memo } from "react";
import Chart from "react-google-charts";

const parseChartData = (data) => {
  let result = [];
  result.push(["", "전체 일정", "전체 TodoList", "완료 TodoList"]);
  data.map((dataInfo)=>{
    result.push([dataInfo['name'],parseInt(dataInfo['planCount']),parseInt(dataInfo['todoCount']),parseInt(dataInfo['successTodoCount'])]);
  });
  if(result.length === 1)
    result.push(["일정 없음",0,0,0]);
  return result;
}

const GroupByUserChart = memo(({ data }) => {
  return (
    <div>
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
    </div>
  );
});

export default GroupByUserChart;

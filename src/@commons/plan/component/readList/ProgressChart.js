import React from "react";
import Chart from "react-google-charts";

const parseChartData = (data) => {
  let result = [];
  const start = data["start"] >= data["end"] ? data["start"] : data["end"];
  const end = data["start"] < data["end"] ? data["start"] : data["end"];
  if (!start) {
    return;
  }
  for (let i = 0; i < start.length; i++) {
    result.push([start[i]["DATE"], start[i]["count"]]);
    let check = true;
    for (let j = 0; j < end.length; j++) {
      if (result[i][0] === end[j]["DATE"]) {
        result[i] = [...result[i], end[j]["count"]];
        check = false;
        break;
      }
    }
    if (check) result[i] = [...result[i], 0];
  }
  result.unshift([{ type: "date", label: "월" }, "일정 시작률", "일정 마감률"]);
  for (let i = 1; i < result.length; i++) {
    result[i][0] = new Date(result[i][0]);
  }
  return result;
};

const ProgressChart = ({ data }) => {
  return (
    <React.Fragment>
      <Chart
        width={"100%"}
        height={"300"}
        chartType="Line"
        loader={<div>Loading Chart</div>}
        data={parseChartData(data)}
        options={{
          width: "100%",
          height: 300,
          series: {
            // Gives each series an axis name that matches the Y-axis below.
            0: { axis: "일정 시작률" },
            1: { axis: "일정 마감률" },
          },
        }}
      />
      <iframe name="progressChartPrint" style={{ display: "none" }} />
    </React.Fragment>
  );
};

export default ProgressChart;

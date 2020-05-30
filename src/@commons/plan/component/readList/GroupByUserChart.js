import React, { useState, useEffect, memo } from "react";
import ChartistGraph from "react-chartist";

const chartOption = (maxCount) => {
  return {
    options: {
      axisX: {
        showGrid: false,
      },
      low: 0,
      high: maxCount + 5,
      chartPadding: {
        top: 0,
        right: 5,
        bottom: 0,
        left: 0,
      },
    },
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

const GroupByUserChart = memo(({ data }) => {
  const [maxCount, setMaxCount] = useState(0);
  const [_chartData, _setChartData] = useState({ user: [], value: [] });

  const chartData = (user, value) => {
    return {
      data: {
        labels: user,
        series: [value],
      },
    };
  };

  const parseChartData = (_data) => {
    if (!_data["content"]) return;
    let user = [];
    let value = [];
    let max = 0;
    for (let i = 0; i < _data["content"].length; i++) {
      user.push(_data["content"][i]["name"]);
      value.push(_data["content"][i]["count"]);
      if (max < _data["content"][i]["count"])
        max = _data["content"][i]["count"];
    }
    setMaxCount(max);
    _setChartData({
      user: user,
      value: value,
    });
  };

  useEffect(() => {
    setMaxCount(0);
    parseChartData(data);
  }, [data]);

  return (
    <ChartistGraph
      style={{ height: 365 }}
      className="ct-chart"
      data={
        chartData(
          _chartData ? _chartData["user"] : [],
          _chartData ? _chartData["value"] : []
        ).data
      }
      type="Bar"
      options={chartOption(maxCount).options}
      responsiveOptions={chartOption(maxCount).responsiveOptions}
      listener={chartOption(maxCount).animation}
    />
  );
});

export default GroupByUserChart;

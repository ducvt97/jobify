import React, { useState } from "react";

import Wrapper from "../assets/wrappers/ChartsContainer";
import BarChartComponent from "./bar-chart";
import AreaChartComponent from "./area-chart";

const ChartContainer = ({ data }) => {
  const [isBarChart, setIsBarChart] = useState(true);
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setIsBarChart(!isBarChart)}>
        {isBarChart ? "Area Chart" : "Bar Chart"}
      </button>
      {isBarChart ? (
        <BarChartComponent data={data} />
      ) : (
        <AreaChartComponent data={data} />
      )}
    </Wrapper>
  );
};

export default ChartContainer;

import React, { useState } from "react";
import { Card, Grid, Slider } from "@mui/material";
import ReactEcharts from "echarts-for-react";
import landCoverBurnedAreaStats from "../data/land_cover_burned_area_stats.json";
import populationData from "../data/yearly_affected_population.json";

import BrazilMap from "./brazilMap";

function View5() {
  const [year, setYear] = useState(2010);
  const maxCO2LandCoverName = "";
  // Year Slider marks
  const marks = [];
  for (let year = 2010; year <= 2020; year++) {
    marks.push({ value: year, label: `${year}` });
  }

  // Handle year change for the slider
  const handleYearChange = (event, newValue) => {
    setYear(newValue);
  };
  // Assuming "Urban and Built-up" is the exact name in your data
  const urbanData = Object.values(landCoverBurnedAreaStats[year]).find(
    (lc_ba_stat) => lc_ba_stat.name === "Urban and Built-up"
  );

  const population = populationData[year];

  const getOption = () => {
    return {
      grid: {
        left: "5%", // Increase the left padding to give more space for the axis labels
        right: "5%",
        containLabel: true,
      },
      title: {
        text: "Burned Area in Urban and Built-up",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        formatter: function (params) {
          let data = params[0];
          return `${data.value.toFixed(0)} hectares burned`;
        },
      },
      xAxis: {
        type: "category",
        data: ["Urban and Built-up"],
        axisLabel: {
          rotate: 45,
          fontSize: 10,
        },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: "{value} ha",
        },
      },
      series: [
        {
          name: "Hectares Burned",
          type: "bar",
          data: [urbanData?.burned_hectars || 0], // Safely accessing the burned hectares
          barWidth: "50%",
        },
      ],
    };
  };
  const getOptionPopulation = () => {
    return {
      grid: {
        left: "5%", // Increase the left padding to give more space for the axis labels
        right: "5%",
        containLabel: true,
      },
      title: {
        text: "Affected Population by Burned Area",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        formatter: function (params) {
          let data = params[0];
          return `${data.value.toFixed(0)} people affected`;
        },
      },
      xAxis: {
        type: "category",
        data: ["Urban and Built-up"],
        axisLabel: {
          rotate: 45,
          fontSize: 10,
        },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: "{value} pp.",
        },
      },
      series: [
        {
          name: "Hectares Burned",
          type: "bar",
          data: [population || 0], // Safely accessing the burned hectares
          barWidth: "50%",
        },
      ],
    };
  };

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      style={{ width:"87vw", height: "100vh" }}
    >
      <Grid item container spacing={2} style={{ height: "100%", width: "100%" }}>
        <Grid item xs={12} style={{ height: "100%", width: "100%" }}>
          <BrazilMap year={year} layers={["prediction"]} style={{ height: "100%", width: "100%" }}/>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default View5;

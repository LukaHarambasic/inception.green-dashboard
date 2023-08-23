// Main
new Chart(document.getElementById("chart-main"), {
  type: "bar",
  data: {
    labels: rolling12MonthsLabels,
    datasets: [
      {
        label: "Carbon Offset",
        backgroundColor: ["#D2DED2"],
        data: chartMainCarbonOffsetPerMonth,
        borderRadius: 2,
        order: 4,
        yAxisID: "y",
      },
      {
        label: "Trees planted",
        backgroundColor: ["#86A786"],
        data: chartMainTreesPlantedPerMonth,
        borderRadius: 2,
        order: 3,
        yAxisID: "y",
      },
      {
        label: "Total trees",
        backgroundColor: ["#49654C"],
        data: chartMainTotalTrees,
        borderRadius: 2,
        type: "line",
        order: 1,
        yAxisID: "y",
      },
      //   {
      //     label: "Tree Age (average)",
      //     backgroundColor: ["#49654C"],
      //     data: chartMainTreesGroupedByAge,
      //     borderRadius: 2,
      //     type: "line",
      //     order: 2,
      //     yAxisID: "y1",
      //   },
    ],
  },
  options: {
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      // y1: {
      //   type: "linear",
      //   display: true,
      //   position: "right",
      //   title: {
      //     display: true,
      //     text: "Average age",
      //   },
      //   grid: {
      //     drawOnChartArea: false, // only want the grid lines for one axis to show up
      //   },
      // },
    },
  },
});

// Fruit Trees per Month
// TODO: selection requires custom implementation: https://stackoverflow.com/questions/49249902/select-all-and-unselect-option-for-chart-js
new Chart(document.getElementById("chart-fruit-trees-monthly"), {
  type: "bar",
  data: {
    labels: chartFruitTreeAgeInMonthsLabels,
    datasets: chartFruitTreeTreesPerAgeDatasets,
  },
  options: {},
});

// Fruit Trees Total
new Chart(document.getElementById("chart-fruit-trees-total"), {
  type: "doughnut",
  data: {
    labels: chartPieLabels,
    datasets: [
      {
        backgroundColor: chartPieColors,
        data: chartPietreesGroupedByType,
      },
    ],
  },
  options: {},
});

// Main
new Chart(document.getElementById("chart-main"), {
  type: "bar",
  data: {
    labels: getRolling12MonthsLabels(),
    datasets: [
      {
        label: "Carbon Offset",
        backgroundColor: ["#D2DED2"],
        data: [500, 600, 700, 800, 900, 1000, 1100, 1200, 1300],
        borderRadius: 2,
        order: 4,
        yAxisID: "y",
      },
      {
        label: "Trees planted",
        backgroundColor: ["#86A786"],
        data: [50, 50, 50, 100, 100, 100, 150, 150, 150],
        borderRadius: 2,
        order: 3,
        yAxisID: "y",
      },
      {
        label: "Total trees",
        backgroundColor: ["#49654C"],
        data: [50, 100, 150, 250, 350, 450, 600, 750, 900],
        borderRadius: 2,
        type: "line",
        order: 1,
        yAxisID: "y",
      },
      {
        label: "Tree Age (average)",
        backgroundColor: ["#49654C"],
        data: [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        borderRadius: 2,
        type: "line",
        order: 2,
        yAxisID: "y1",
      },
    ],
  },
  options: {
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Average age",
        },
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    },
  },
});

// Fruit Trees per Month
// TODO: selection requires custom implementation: https://stackoverflow.com/questions/49249902/select-all-and-unselect-option-for-chart-js
new Chart(document.getElementById("chart-fruit-trees-monthly"), {
  type: "bar",
  data: {
    labels: [
      "0.1",
      "0.2",
      "0.3",
      "0.4",
      "0.5",
      "0.6",
      "0.7",
      "0.8",
      "0.9",
      "1.0",
      "1.1",
      "1.2",
      "1.3",
      "1.4",
    ],
    datasets: [
      {
        label: "Papaya",
        backgroundColor: ["#D2DED2"],
        data: [34, 55, 65, 34, 123, 43, 54, 65, 76, 68, 12, 0, 4],
        borderRadius: 2,
      },
      {
        label: "Mango",
        backgroundColor: ["#86A786"],
        data: [34, 56, 75, 34, 23, 56, 57, 68, 34, 7, 35, 6, 7, 8],
        borderRadius: 2,
      },
      {
        label: "Avocado",
        backgroundColor: ["#49654C"],
        data: [23, 3, 23, 3, 54, 67, 45, 34, 4, 3, 4, 4, 5, 5],
        borderRadius: 2,
      },
    ],
  },
  options: {},
});

// Fruit Trees Total
new Chart(document.getElementById("chart-fruit-trees-total"), {
  type: "doughnut",
  data: {
    labels: ["Jackfruit", "Mango", "Avocado", "Papaya"],
    datasets: [
      {
        backgroundColor: ["#ABC2AB", "#86A786", "#49654C", "#D2DED2"],
        data: [1000, 400, 120, 320],
      },
    ],
  },
  options: {},
});

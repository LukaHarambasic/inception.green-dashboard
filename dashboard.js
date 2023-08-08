// ############
// Transform data
// ############

// assumption I can filter to just retrieve the trees from the correct company
// TODO fetch this from a airtable or similiar to make it easible configurable
const CARBON_OFFSET_PER_TREE_TYPE = [
    { type: "Jackfruit", carbon_offset: 2 },
    { type: "Mango", carbon_offset: 4 },
    { type: "Avocado", carbon_offset: 5 },
    { type: "Papaya", carbon_offset: 10 }
  ];
  
  const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  
  const INIT_YEAR_MAP = [
    [0, null],
    [1, null],
    [2, null],
    [3, null],
    [4, null],
    [1, null],
    [5, null],
    [6, null],
    [7, null],
    [8, null],
    [9, null],
    [10, null],
    [11, null]
  ];
  
  // https://stackoverflow.com/a/38327540
  function groupBy(list, keyGetter) {
    const map = new Map(INIT_YEAR_MAP);
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }
  
  // TODO needs to include the right calculation - but this might already happen in airtable
  function getCarbonOffsetPerType(type) {
    const result = CARBON_OFFSET_PER_TREE_TYPE.find((tree) => tree.type === type);
    return result.carbon_offset;
  }
  
  // This should somehow come from the API, prefiltered by company ID
  const input = [
    { type: "Jackfruit", planted_date: dateFns.subMonths(new Date(), 6) },
    { type: "Jackfruit", planted_date: dateFns.subMonths(new Date(), 5) },
    { type: "Jackfruit", planted_date: dateFns.subMonths(new Date(), 4) },
    { type: "Jackfruit", planted_date: dateFns.subMonths(new Date(), 2) },
    { type: "Jackfruit", planted_date: dateFns.subMonths(new Date(), 1) },
    { type: "Jackfruit", planted_date: dateFns.subMonths(new Date(), 0) },
    { type: "Jackfruit", planted_date: dateFns.subMonths(new Date(), 10) },
    { type: "Jackfruit", planted_date: dateFns.subMonths(new Date(), 12) },
    { type: "Jackfruit", planted_date: dateFns.subMonths(new Date(), 12) },
    { type: "Jackfruit", planted_date: dateFns.subMonths(new Date(), 12) },
    { type: "Jackfruit", planted_date: dateFns.subMonths(new Date(), 12) },
    { type: "Jackfruit", planted_date: dateFns.subMonths(new Date(), 12) },
    { type: "Jackfruit", planted_date: dateFns.subMonths(new Date(), 11) },
    { type: "Jackfruit", planted_date: dateFns.subMonths(new Date(), 11) },
    { type: "Jackfruit", planted_date: dateFns.subMonths(new Date(), 11) },
    { type: "Jackfruit", planted_date: dateFns.subMonths(new Date(), 11) },
    { type: "Jackfruit", planted_date: dateFns.subMonths(new Date(), 8) },
    { type: "Mango", planted_date: dateFns.subMonths(new Date(), 6) },
    { type: "Mango", planted_date: dateFns.subMonths(new Date(), 5) },
    { type: "Mango", planted_date: dateFns.subMonths(new Date(), 4) },
    { type: "Mango", planted_date: dateFns.subMonths(new Date(), 2) },
    { type: "Mango", planted_date: dateFns.subMonths(new Date(), 1) },
    { type: "Mango", planted_date: dateFns.subMonths(new Date(), 0) },
    { type: "Mango", planted_date: dateFns.subMonths(new Date(), 6) },
    { type: "Mango", planted_date: dateFns.subMonths(new Date(), 5) },
    { type: "Mango", planted_date: dateFns.subMonths(new Date(), 4) },
    { type: "Mango", planted_date: dateFns.subMonths(new Date(), 2) },
    { type: "Mango", planted_date: dateFns.subMonths(new Date(), 1) },
    { type: "Mango", planted_date: dateFns.subMonths(new Date(), 0) },
    { type: "Mango", planted_date: dateFns.subMonths(new Date(), 10) },
    { type: "Mango", planted_date: dateFns.subMonths(new Date(), 12) },
    { type: "Mango", planted_date: dateFns.subMonths(new Date(), 12) },
    { type: "Mango", planted_date: dateFns.subMonths(new Date(), 12) },
    { type: "Mango", planted_date: dateFns.subMonths(new Date(), 12) },
    { type: "Mango", planted_date: dateFns.subMonths(new Date(), 12) },
    { type: "Mango", planted_date: dateFns.subMonths(new Date(), 12) },
    { type: "Mango", planted_date: dateFns.subMonths(new Date(), 12) },
    { type: "Mango", planted_date: dateFns.subMonths(new Date(), 12) },
    { type: "Mango", planted_date: dateFns.subMonths(new Date(), 11) },
    { type: "Mango", planted_date: dateFns.subMonths(new Date(), 11) },
    { type: "Mango", planted_date: dateFns.subMonths(new Date(), 8) },
    { type: "Avocado", planted_date: dateFns.subMonths(new Date(), 6) },
    { type: "Avocado", planted_date: dateFns.subMonths(new Date(), 5) },
    { type: "Avocado", planted_date: dateFns.subMonths(new Date(), 6) },
    { type: "Avocado", planted_date: dateFns.subMonths(new Date(), 6) },
    { type: "Avocado", planted_date: dateFns.subMonths(new Date(), 5) },
    { type: "Avocado", planted_date: dateFns.subMonths(new Date(), 6) },
    { type: "Avocado", planted_date: dateFns.subMonths(new Date(), 5) },
    { type: "Avocado", planted_date: dateFns.subMonths(new Date(), 6) },
    { type: "Avocado", planted_date: dateFns.subMonths(new Date(), 5) },
    { type: "Avocado", planted_date: dateFns.subMonths(new Date(), 2) },
    { type: "Avocado", planted_date: dateFns.subMonths(new Date(), 1) },
    { type: "Avocado", planted_date: dateFns.subMonths(new Date(), 1) },
    { type: "Avocado", planted_date: dateFns.subMonths(new Date(), 2) },
    { type: "Avocado", planted_date: dateFns.subMonths(new Date(), 1) },
    { type: "Avocado", planted_date: dateFns.subMonths(new Date(), 2) },
    { type: "Avocado", planted_date: dateFns.subMonths(new Date(), 1) },
    { type: "Avocado", planted_date: dateFns.subMonths(new Date(), 0) },
    { type: "Avocado", planted_date: dateFns.subMonths(new Date(), 10) },
    { type: "Avocado", planted_date: dateFns.subMonths(new Date(), 12) },
    { type: "Avocado", planted_date: dateFns.subMonths(new Date(), 12) },
    { type: "Avocado", planted_date: dateFns.subMonths(new Date(), 12) },
    { type: "Avocado", planted_date: dateFns.subMonths(new Date(), 11) },
    { type: "Avocado", planted_date: dateFns.subMonths(new Date(), 11) },
    { type: "Avocado", planted_date: dateFns.subMonths(new Date(), 11) },
    { type: "Avocado", planted_date: dateFns.subMonths(new Date(), 11) },
    { type: "Avocado", planted_date: dateFns.subMonths(new Date(), 11) },
    { type: "Avocado", planted_date: dateFns.subMonths(new Date(), 11) },
    { type: "Avocado", planted_date: dateFns.subMonths(new Date(), 8) },
    { type: "Avocado", planted_date: dateFns.subMonths(new Date(), 8) },
    { type: "Avocado", planted_date: dateFns.subMonths(new Date(), 8) },
    { type: "Avocado", planted_date: dateFns.subMonths(new Date(), 8) },
    { type: "Avocado", planted_date: dateFns.subMonths(new Date(), 8) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 6) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 5) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 6) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 6) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 5) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 6) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 5) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 6) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 5) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 2) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 1) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 1) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 2) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 1) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 2) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 1) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 0) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 10) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 12) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 12) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 12) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 11) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 11) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 11) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 11) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 11) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 11) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 8) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 8) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 8) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 8) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 8) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 20) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 20) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 20) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 20) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 20) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 20) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 20) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 19) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 22) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 21) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 25) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 26) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 29) },
    { type: "Papaya", planted_date: dateFns.subMonths(new Date(), 28) }
  ];
  
  const enhanced = input.map((tree) => {
    const ageInMonth = dateFns.differenceInMonths(new Date(), tree.planted_date);
    const plantedMonth = dateFns.getMonth(tree.planted_date);
    const plantedYear = dateFns.getYear(tree.planted_date);
    const carbonOffset = getCarbonOffsetPerType(tree.type);
    return {
      ...tree,
      ageInMonth,
      plantedMonth,
      plantedYear,
      carbonOffset
    };
  });
  
  // Main chart
  const startMonth = dateFns.getMonth(dateFns.subMonths(new Date(), 12));
  
  function getRolling12MonthsLabels() {
    const startMonth = dateFns.getMonth(new Date());
    const months = [];
    let index = startMonth;
    for (i = 0; i < 12; i++) {
      if (index < 0) {
        index = 11;
      }
      months.push(MONTHS[index]);
      index--;
    }
    // Yeah wouldn't be needed if I would be smart :)
    return months.reverse();
  }
  
  const enhancedTreesLast12Months = enhanced.filter(
    (tree) => tree.ageInMonth <= 12
  );
  
  const enhancedTreesOlderThan12Months = enhanced.filter(
    (tree) => tree.ageInMonth > 12
  );
  
  const enhancedTreesLast12MonthsGroupedByMonth = groupBy(
    enhancedTreesLast12Months,
    (tree) => tree.plantedMonth
  );
  
  function aggregateMapValues(initialMap, attribute) {
    const map = new Map(INIT_YEAR_MAP);
    initialMap.forEach((value, key) => {
      if (value === null) {
        map.set(key, 0);
      } else {
        const sum = value.reduce((sum, tree) => sum + tree[attribute], 0);
        map.set(key, sum);
      }
    });
    return map;
  }
  
  function mapSizePerValue(initialMap) {
    const map = new Map(INIT_YEAR_MAP);
    initialMap.forEach((value, key) => {
      if (value === null) {
        map.set(key, 0);
      } else {
        map.set(key, value.length);
      }
    });
    return map;
  }
  
  function mapToArray(initialMap) {
    const array = [];
    initialMap.forEach((value, key) => {
      array.push(value);
    });
    return array;
  }
  
  // TODO functions: sortArrayByRollingMonth
  
  console.log("enhancedTreesLast12MonthsGroupedByMonth");
  console.log(enhancedTreesLast12MonthsGroupedByMonth);
  
  const carbonOffsetPerMonth = mapToArray(
    aggregateMapValues(enhancedTreesLast12MonthsGroupedByMonth, "carbonOffset")
  );
  const treesPlantedPerMonth = mapToArray(
    mapSizePerValue(enhancedTreesLast12MonthsGroupedByMonth)
  );
  console.log("treesPlantedPerMonth");
  console.log(treesPlantedPerMonth);
  
  function treesPlantedAccumulatedPerMonth(
    initTreesPlantedPerMonth,
    initEnhancedTreesOlderThan12Months
  ) {
    const startingValueAccumulatedPlantedTrees =
      initEnhancedTreesOlderThan12Months.length;
    console.log(startingValueAccumulatedPlantedTrees);
    const result = [];
    initTreesPlantedPerMonth.forEach((trees, index) => {
      if (index === 0) {
        result.push(startingValueAccumulatedPlantedTrees + trees);
      } else {
        result.push(result[index - 1] + trees);
      }
    });
    return result;
  }
  
  console.log("here we go");
  console.log(
    treesPlantedAccumulatedPerMonth(
      treesPlantedPerMonth,
      enhancedTreesOlderThan12Months
    )
  );
  
  // Fruit Trees per Month chart
  const ageInMonthsLabels = [];
  // dynamic for every type - use to generate the whole data sets
  const treesPerAge = [];
  
  // Pie Chart
  const treeLabels = [];
  const treesGroupedByType = [];
  
  // ############
  // Charts
  // ############
  
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
          yAxisID: "y"
        },
        {
          label: "Trees planted",
          backgroundColor: ["#86A786"],
          data: [50, 50, 50, 100, 100, 100, 150, 150, 150],
          borderRadius: 2,
          order: 3,
          yAxisID: "y"
        },
        {
          label: "Total trees",
          backgroundColor: ["#49654C"],
          data: [50, 100, 150, 250, 350, 450, 600, 750, 900],
          borderRadius: 2,
          type: "line",
          order: 1,
          yAxisID: "y"
        },
        {
          label: "Tree Age (average)",
          backgroundColor: ["#49654C"],
          data: [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
          borderRadius: 2,
          type: "line",
          order: 2,
          yAxisID: "y1"
        }
      ]
    },
    options: {
      scales: {
        y: {
          type: "linear",
          display: true,
          position: "left"
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",
          title: {
            display: true,
            text: "Average age"
          },
          grid: {
            drawOnChartArea: false // only want the grid lines for one axis to show up
          }
        }
      }
    }
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
        "1.4"
      ],
      datasets: [
        {
          label: "Papaya",
          backgroundColor: ["#D2DED2"],
          data: [34, 55, 65, 34, 123, 43, 54, 65, 76, 68, 12, 0, 4],
          borderRadius: 2
        },
        {
          label: "Mango",
          backgroundColor: ["#86A786"],
          data: [34, 56, 75, 34, 23, 56, 57, 68, 34, 7, 35, 6, 7, 8],
          borderRadius: 2
        },
        {
          label: "Avocado",
          backgroundColor: ["#49654C"],
          data: [23, 3, 23, 3, 54, 67, 45, 34, 4, 3, 4, 4, 5, 5],
          borderRadius: 2
        }
      ]
    },
    options: {}
  });
  
  // Fruit Trees Total
  new Chart(document.getElementById("chart-fruit-trees-total"), {
    type: "doughnut",
    data: {
      labels: ["Jackfruit", "Mango", "Avocado", "Papaya"],
      datasets: [
        {
          backgroundColor: ["#ABC2AB", "#86A786", "#49654C", "#D2DED2"],
          data: [1000, 400, 120, 320]
        }
      ]
    },
    options: {}
  });
  
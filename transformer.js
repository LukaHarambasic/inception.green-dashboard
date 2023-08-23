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
    carbonOffset,
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

function mapToArray(initialMap) {
  const array = [];
  initialMap.forEach((value, key) => {
    array.push(value);
  });
  return array;
}

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
  return mapToArray(map);
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
  return mapToArray(map);
}

// TODO functions: sortArrayByRollingMonth

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

const chartMainCarbonOffsetPerMonth = aggregateMapValues(
  enhancedTreesLast12MonthsGroupedByMonth,
  "carbonOffset"
);

const chartMainTreesPlantedPerMonth = mapSizePerValue(
  enhancedTreesLast12MonthsGroupedByMonth
);

const chartMainTotalTrees = treesPlantedAccumulatedPerMonth(
  chartMainTreesPlantedPerMonth,
  enhancedTreesOlderThan12Months
);

const chartMainTreesGroupedByAge = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

// Fruit Trees per Month chart
const chartFruitTreeAgeInMonthsLabels = [
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
];
// dynamic for every type - use to generate the whole data sets
const chartFruitTreeTreesPerAgeDatasets = [
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
];

// Pie Chart
const chartPieLabels = ["Jackfruit", "Mango", "Avocado", "Papaya"];
const chartPieColors = ["#ABC2AB", "#86A786", "#49654C", "#D2DED2"];
const chartPietreesGroupedByType = [1000, 400, 120, 320];

function rollingSorting(data) {
  const startMonth = dateFns.getMonth(new Date());
  const result = [];
  let index = startMonth;
  for (i = 0; i < 12; i++) {
    if (index < 0) {
      index = 11;
    }
    result.push(data[index]);
    index--;
  }
  // Yeah wouldn't be needed if I would be smart :)
  return result.reverse();
}

function mapToArray(initialMap) {
  const array = [];
  initialMap.forEach((value, key) => {
    array.push(value);
  });
  return array;
}

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

// TODO specific name
function aggregateMapValues(initialMap, attribute) {
  const map = new Map(rollingSorting(INIT_YEAR_MAP));
  const sortedInitialMap = new Map(rollingSorting([...initialMap.entries()]));
  sortedInitialMap.forEach((value, key) => {
    if (value === null) {
      map.set(key, 0);
    } else {
      const sum = value.reduce((sum, tree) => sum + tree[attribute], 0);
      map.set(key, sum);
    }
  });
  return mapToArray(map);
}

// TODO specific name
function mapSizePerValue(initialMap) {
  const map = new Map(INIT_YEAR_MAP);
  initialMap.forEach((value, key) => {
    if (value === null) {
      map.set(key, 0);
    } else {
      map.set(key, value.length);
    }
  });
  return rollingSorting(mapToArray(map));
}

// TODO specific name
function treesPlantedAccumulatedPerMonth(
  initTreesPlantedPerMonth,
  initEnhancedTreesOlderThan12Months
) {
  const startingValueAccumulatedPlantedTrees =
    initEnhancedTreesOlderThan12Months.length;
  const sortedTreesPlantedPerMonth = rollingSorting(initTreesPlantedPerMonth);
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

// Values main chart
const rolling12MonthsLabels = rollingSorting(MONTHS);

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

// const chartMainTreesGroupedByAge = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

// Fruit Trees per Month chart

console.log(enhanced);
// TODO specific name
function calculateLabels(initTrees) {
  const ages = initTrees.map((tree) => tree.ageInMonth);
  return [...new Set(ages)];
}

const testing = new Map();
const papayaMap = new Map();
papayaMap.set(1, 20);
papayaMap.set(2, 30);
papayaMap.set(5, 5);
testing.set("Papaya", papayaMap);
console.log(testing);

function generateTreesGroupedByTypeandAge(initTrees) {
  const map = new Map();
  const treeTypes = CARBON_OFFSET_PER_TREE_TYPE.map((tree) => tree.type);
  console.log(treeTypes);
  treeTypes.forEach((type) => {
    map.set(type, new Map());
  });
  initTrees.forEach((tree) => {
    const type = tree.type;
    const age = tree.ageInMonth;
    const value = map.get(type).get(age);
    if (value) {
      map.get(type).set(age, value + 1);
    } else {
      map.get(type).set(age, 1);
    }
  });
  return map;
}

console.log(generateTreesGroupedByTypeandAge(enhanced));

function generateDatasets(initTreesGroupedByTypeandAge) {
  const availableColors = ["#ABC2AB", "#86A786", "#49654C", "#D2DED2"];
  const result = [];
  initTreesGroupedByTypeandAge.forEach((value, key) => {
    const data = mapToArray(value);
    if (data.length > 0) {
      result.push({
        label: key,
        backgroundColor: [availableColors.pop()],
        data: data,
        borderRadius: 2,
      });
    }
  });
  return result;
}

console.log(generateDatasets(generateTreesGroupedByTypeandAge(enhanced)));

const chartFruitTreeAgeInMonthsLabels = calculateLabels(enhanced);
// dynamic for every type - use to generate the whole data sets
const chartFruitTreeTreesPerAgeDatasets = generateDatasets(
  generateTreesGroupedByTypeandAge(enhanced)
);
// const chartFruitTreeTreesPerAgeDatasets = [
//   {
//     label: "Papaya",
//     backgroundColor: ["#D2DED2"],
//     data: [34, 55, 65, 34, 123, 43, 54, 65, 76, 68, 12, 0, 4],
//     borderRadius: 2,
//   },
//   {
//     label: "Mango",
//     backgroundColor: ["#86A786"],
//     data: [34, 56, 75, 34, 23, 56, 57, 68, 34, 7, 35, 6, 7, 8],
//     borderRadius: 2,
//   },
//   {
//     label: "Avocado",
//     backgroundColor: ["#49654C"],
//     data: [23, 3, 23, 3, 54, 67, 45, 34, 4, 3, 4, 4, 5, 5],
//     borderRadius: 2,
//   },
// ];

// Pie Chart
const chartPieLabels = ["Jackfruit", "Mango", "Avocado", "Papaya"];
const chartPieColors = ["#ABC2AB", "#86A786", "#49654C", "#D2DED2"];
const chartPietreesGroupedByType = [1000, 400, 120, 320];

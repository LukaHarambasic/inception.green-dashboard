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

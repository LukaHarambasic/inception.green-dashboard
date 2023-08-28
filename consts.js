// assumption I can filter to just retrieve the trees from the correct company
// TODO fetch this from a airtable or similiar to make it easible configurable
const CARBON_OFFSET_PER_TREE_TYPE = [
  { type: "Jackfruit", carbon_offset: 2 },
  { type: "Mango", carbon_offset: 4 },
  { type: "Avocado", carbon_offset: 5 },
  { type: "Papaya", carbon_offset: 10 },
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
  "Dec",
];

const INIT_YEAR_MAP = [
  [0, null],
  [1, null],
  [2, null],
  [3, null],
  [4, null],
  [5, null],
  [6, null],
  [7, null],
  [8, null],
  [9, null],
  [10, null],
  [11, null],
];

const AIRTABLE_ENDPOINT =
  "https://api.airtable.com/v0/appbzY4xSZjgh6Z49/tblEIFVBTPw04vipb";

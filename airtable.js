// Function to fetch data from Airtable
function fetchDataFromAirtable() {
  const companyId = 4; // TODO extract from URL
  fetch(`${AIRTABLE_ENDPOINT}?filterByFormula={company_id}=${companyId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.records); // Logs all records from the table
    })
    .catch((error) => {
      console.error("There was an error fetching data from Airtable:", error);
    });
}

// Call the function
fetchDataFromAirtable();

// Function to fetch data from Airtable
function fetchDataFromAirtable() {
  const url = new URL(window.location.href);
  const companyId = url.searchParams.get("companyId"); // TODO error handling if empty akak forward
  fetch(`${AIRTABLE_ENDPOINT}?filterByFormula={company_id}=${companyId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      "Content-Type": "application/json",
    },
  }) // TODO use asyn await and handle error
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

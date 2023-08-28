# inception.green Dashboard

Welcome to the `inception.green` dashboard repository. This serves as a testing and development ground for our dashboard charts before integrating them into Webflow.

## Why Not Directly in Webflow?

While Webflow is a powerful tool for web design, its JavaScript editor has certain limitations. Moreover, testing changes within Webflow can be time-consuming. Thus, this repository provides a more efficient environment to build and test the charts using Chart.js.

## Migrating to Webflow

Once the charts are finalized and working as expected, they can be easily migrated to the Webflow platform for the final website integration aka copy-and-paste.
Replace the libraries with their corresponding CDNs. You can locate these CDNs in the `index.html`. For better readability within Webflow, ensure each `.js` file is contained in its own block.

## Open Tasks

- [x] Integrate AirTable
- [x] Fetch data by company id in URL
- [ ] Transform data in required format
- [ ] Implement CO2 Offset calculations
- [ ] Check if possible to manually host only required datefns functions to not laod the full CDN
- [ ] Clean up coding
- [ ] Migrate to WebFlow

## How it works

Data is retrieved from AirTable. Trees have been pre-filtered based on the company ID.
The company ID is included in the URL, as seen in the example: inception.green/dashboard?companyId=4. Each company is assigned a unique ID.
The retrieved data is then transformed into a format suitable for further use.
Relevant calculations are performed using this data to display information for the past 12 months.
The processed data is then integrated into Chart.js for visualization.

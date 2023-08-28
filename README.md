# inception.green Dashboard

Welcome to the `inception.green` dashboard repository. This serves as a testing and development ground for our dashboard charts before integrating them into Webflow.

## Why Not Directly in Webflow?

While Webflow is a powerful tool for web design, its JavaScript editor has certain limitations. Moreover, testing changes within Webflow can be time-consuming. Thus, this repository provides a more efficient environment to build and test the charts using Chart.js.

## Migrating to Webflow

Once the charts are finalized and working as expected, they can be easily migrated to the Webflow platform for the final website integration aka copy-and-paste.
Replace the libraries with their corresponding CDNs. You can locate these CDNs in the `index.html`. For better readability within Webflow, ensure each `.js` file is contained in its own block.

## Open Tasks

- [ ] Check data in AirTable
- [ ] Integrate AirTable
- [ ] Transform data in required format
- [ ] Fetch data by company id in URL
- [ ] Clean up coding
- [ ] Migrate to WebFlow

# EPNS Challenge
**Question ID - 2.A**

Design a basic web app or react native app, In which you have to implement sorting and filter options, for data you can use any third-party API’s

# Running the App
1. `npm install`
2. `npm start`

# Packages used
1. Material-UI for styling
2. Faker JS for data generation

# Design
1. The table is designed as a component.
2. User can pass props to customise the table.
3. Table uses a column configuration as defined in `columnsDef`
4. Date is in `MM/DD/YYYY` format
5. Currently supporting -
   * Single Column sort
   * Single/Multi Column Filter
   * Sort & Filter
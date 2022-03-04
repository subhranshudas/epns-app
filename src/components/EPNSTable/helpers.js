import { getFormattedDate } from '../../utils';
/**
 * Helpers
 */
export const SORT_KEYS = {
  ASC: 'asc',
  DESC: 'desc',
};

export const standardSort = (a, b) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
};

export const getSortedData = ({
  tableData, columnKey, sortOrder, customSort,
}) => {
  /**
     * SPECIAL TYPES
     */
  if (typeof customSort === 'function') {
    return tableData.sort((a, b) => {
      const [first, second] = sortOrder === SORT_KEYS.ASC
        ? [a, b] : [b, a];
      return customSort(first, second);
    });
  }

  return tableData.sort((a, b) => {
    const [first, second] = sortOrder === SORT_KEYS.ASC
      ? [a[columnKey], b[columnKey]]
      : [b[columnKey], a[columnKey]];
    return standardSort(first, second);
  });
};

export const getFilteredData = ({ tableData, filters }) => Object.keys(filters)
  .reduce((filteredData, columnKey) => {
    const filterValue = filters[columnKey];

    return filteredData.filter((rowData) => {
      const rowValue = rowData[columnKey];

      if (typeof rowValue === 'number') {
        return parseFloat(rowValue) === parseFloat(filterValue);
      } if (rowValue instanceof Date) {
        return getFormattedDate(rowValue).includes(filterValue);
      } // add other cases if needed

      return rowValue.toUpperCase().includes(filterValue.toUpperCase());
    });
  }, tableData);

export const getColumnSchema = (columnConfig) => {
  const schema = {};

  for (let i = 0; i < columnConfig.length; i += 1) {
    const config = columnConfig[i];

    schema[config.field] = {};

    if (typeof config?.customSort === 'function') {
      schema[config.field].customSort = config.customSort;
    }
  }
  return schema;
};

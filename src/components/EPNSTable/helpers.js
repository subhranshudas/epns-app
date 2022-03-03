/**
 * Helpers
 */

export const standardSort = (a, b) => {
    if (a < b){
      return 1;
    }
    if (a > b){
      return -1;
    }
    return 0;
  };
  
export const getSortedData = ({ tableData, columnKey, sortOrder, customSort }) => {
    /** 
     * SPECIAL TYPES
     */
    if (typeof customSort === 'function') {
      return tableData.sort((a, b) => {
        const [first, second] = sortOrder === 'asc' ?
          [a, b] : [b, a];
        return customSort(first, second);
      });
    }
  
    return tableData.sort((a, b) => {
      const [first, second] = sortOrder === 'asc' ?
        [a[columnKey], b[columnKey]] :
        [b[columnKey], a[columnKey]];
      return standardSort(first, second);
    });
  };
  
  export const getColumnSchema = (columnConfig) => {
    const schema = {};
  
    for (let i = 0; i < columnConfig.length; i++) {
      const config = columnConfig[i];
  
      schema[config.field] = {};
  
      if (typeof config?.customSort === 'function') {
        schema[config.field].customSort = config.customSort;
      }
    }
    return schema;
  };
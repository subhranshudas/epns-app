import React, { useState, memo } from 'react';
import { TableCell, TableRow, TextField } from '@mui/material';
import {
  arrayOf, string, func,
  shape,
} from 'prop-types';
import { getId } from '../../utils';

function FilterCell({
  onFilter,
  column,
}) {
  const [filter, setFilter] = useState('');

  const onFilterChange = (e) => {
    const query = e.target.value;
    setFilter(query);
    onFilter(query, column);
  };

  return (
    <TableCell variant="head">
      <TextField
        placeholder="Filter"
        value={filter}
        onChange={onFilterChange}
      />
    </TableCell>
  );
}

FilterCell.propTypes = {
  onFilter: func.isRequired,
  column: string.isRequired,
};

/**
 * EPNSTableFilters
 */
function EPNSTableFilters({
  columns,
  applyFilter,
}) {
  const onFilterChange = (query, field) => {
    applyFilter(field, query);
  };

  return (
    <TableRow>
      {columns.map((column) => (
        <FilterCell
          key={getId('table-filter-cell')}
          onFilter={onFilterChange}
          column={column.field}
        />
      ))}
    </TableRow>
  );
}

EPNSTableFilters.propTypes = {
  columns: arrayOf(
    shape({
      field: string.isRequired,
    }),
  ).isRequired,
  applyFilter: func.isRequired,
};

/**
 * prevents un-necessary rendering for the filter boxes
 */
const propsAreEqual = (prevProps, nextProps) => prevProps.columns === nextProps.columns
    && prevProps.data === nextProps.data;

export default memo(EPNSTableFilters, propsAreEqual);

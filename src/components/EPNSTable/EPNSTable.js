import React, {
  useEffect, useState, useMemo,
} from 'react';
import {
  string, func, oneOfType, bool, arrayOf,
  shape,
} from 'prop-types';
import {
  Table, TableBody, TableCell, tableCellClasses, TableContainer,
  TableHead, TableRow, Paper, Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import EPNSTableFilters from './EPNSTableFilters';
import { getId, getFormattedDate } from '../../utils';
import {
  SORT_KEYS, getSortedData, getFilteredData, getColumnSchema,
} from './helpers';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  '& .headerBox': {
    display: 'flex',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTable = styled(Table)(() => ({
  minWidth: 650,
}));

/**
 * Header Cell
 */
function EPNSTableHeaderCell({
  title,
  onSort,
  sortOrder = false,
}) {
  const arrowIcon = sortOrder === SORT_KEYS.ASC ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />;

  return (
    <StyledTableCell variant="head">
      <Box className="headerBox" onClick={onSort}>
        <span>{title}</span>
        {typeof sortOrder === 'string' ? arrowIcon : null}
      </Box>
    </StyledTableCell>
  );
}

EPNSTableHeaderCell.defaultProps = {
  sortOrder: false,
};

EPNSTableHeaderCell.propTypes = {
  title: string.isRequired,
  onSort: func.isRequired,
  sortOrder: oneOfType([string, bool]),
};

/**
 * Body Cell
 */
function EPNSTableBodyCell({
  row,
  column,
}) {
  let cellText = row[column.field];

  if (column?.type === 'date') {
    cellText = getFormattedDate(cellText);
  }

  return (
    <TableCell variant="body">
      <span>{cellText}</span>
    </TableCell>
  );
}

EPNSTableBodyCell.propTypes = {
  row: shape({}).isRequired,
  column: shape({
    field: string.isRequired,
    type: string,
  }).isRequired,
};

/**
  * Table
  */
function EPNSTable({
  data,
  columns,
}) {
  const [tableData, setTableData] = useState([]); // has the reduced data set
  const [sortOrder, setSortOrder] = useState({}); // { [columnKey]: ["asc","desc",false] }
  const [filters, setFilters] = useState({}); // { [columnKey]: "query", ... }

  const columnSchema = useMemo(() => getColumnSchema(columns), [columns]);

  const handleTableSort = (e, columnKey) => {
    const existingSortOrder = sortOrder[columnKey] || false;
    setSortOrder({
      [columnKey]: existingSortOrder === SORT_KEYS.ASC ? SORT_KEYS.DESC : SORT_KEYS.ASC,
    });
  };

  const applyFilter = (column, filterQuery) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [column]: filterQuery,
    }));
  };

  /**
   * Effects when any sort OR filter is applied
   */
  useEffect(() => {
    const sortOrderHasValues = Object.values(sortOrder).filter((fVal) => !!fVal).length > 0;
    const filtersHasValue = Object.values(filters).filter((fVal) => !!fVal).length > 0;

    // if no sort, filter get original data
    let tData = data;

    if (sortOrderHasValues) {
      // Has Sort
      const [columnKey] = Object.keys(sortOrder);

      tData = getSortedData({
        tableData: tData,
        columnKey,
        sortOrder: sortOrder[columnKey],
        customSort: columnSchema[columnKey].customSort,
      });
    }

    if (filtersHasValue) {
      // Has filters
      tData = getFilteredData({
        tableData: tData,
        filters,
      });
    }

    if (data.length > 0) {
      setTableData([...tData]);
    }
  }, [
    sortOrder, filters,
    columnSchema, data,
  ]);

  useEffect(() => {
    // reset state
    if (data.length === 0) {
      setTableData([]);
      setSortOrder({});
      setFilters({});
    }
  }, [data]);

  return (
    <TableContainer component={Paper}>
      <StyledTable aria-label="simple table">
        {/* Table Header starts */}
        <TableHead>

          {/* Table Column Headers start */}
          <TableRow>
            {columns.map((column) => (
              <EPNSTableHeaderCell
                key={getId('table-header-cell')}
                title={column.title}
                onSort={(e) => handleTableSort(e, column.field)}
                sortOrder={sortOrder[column.field]}
              />
            ))}
          </TableRow>
          {/* Table Column Headers ends */}

          {/* Table Column Filters start */}
          <EPNSTableFilters
            data={data}
            columns={columns}
            applyFilter={applyFilter}
          />
          {/* Table Column Filters ends */}

        </TableHead>
        {/* Table Header ends */}

        <TableBody>
          {tableData.map((row) => (
            <StyledTableRow
              key={getId('table-row')}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {columns.map((column) => (
                <EPNSTableBodyCell key={getId('table-cell')} row={row} column={column} />
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}

EPNSTable.propTypes = {
  data: arrayOf(
    shape({}),
  ).isRequired,
  columns: arrayOf(
    shape({
      title: string,
      field: string.isRequired,
      type: string,
      customSort: func,
      // add others if needed
    }),
  ).isRequired,
};

export default EPNSTable;

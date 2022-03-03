import React, { useEffect, useState, useMemo } from 'react';
import { array } from 'prop-types';
import {
  Table, TableBody, TableCell, tableCellClasses, TableContainer,
  TableHead, TableRow, Paper, Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import { getId, getFormattedDate } from '../../utils';
import { getSortedData, getColumnSchema } from './helpers';

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
    fontSize: 16
  }
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

const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 650
}));

/**
 * Header Cell
 */
const EPNSTableHeaderCell = ({
  title,
  onSort,
  sortOrder = false
}) => {
  return (
    <StyledTableCell variant="head">
      <Box className="headerBox" onClick={onSort}>
        <span>{title}</span>
        {typeof sortOrder === 'string' ? (
          sortOrder === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />
        ) : null}
      </Box>
    </StyledTableCell>
  );
};

/**
 * Body Cell
 */
 const EPNSTableBodyCell = ({
   row,
   column
 }) => {
  let cellText = row[column.field];

  if (column?.type === 'date') {
    cellText = getFormattedDate(cellText);
  }

  return (
    <TableCell variant="body">
      <span>{cellText}</span>
    </TableCell>
  );
 };

 /**
  * Table
  */
const EPNSSimpleTable = ({
  data,
  columns
}) => {
  const [tableData, setTableData] = useState([]);
  const [sortOrder, setSortOrder] = useState({}); // { [columnKey]: ["asc","desc",false] }

  const columnSchema = useMemo(() => getColumnSchema(columns), [columns]);

  const handleTableSort = (e, columnKey) => {
    const existingSortOrder = sortOrder[columnKey] || false;

    setSortOrder({
      [columnKey]: existingSortOrder ===  'asc' ? 'desc' : 'asc'
    });

    setTableData(
      getSortedData({
        tableData,
        columnKey,
        sortOrder: sortOrder[columnKey],
        customSort: columnSchema[columnKey].customSort
      })
    );
  };

  useEffect(() => {
    // reset state
    setTableData(data);
    setSortOrder({})
  }, [data]);

  console.log("\tONLY table rendered...", tableData);

  return (
    <TableContainer component={Paper}>
      <StyledTable aria-label="simple table">
        <TableHead>
          {/* Table Header starts */}
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
          {/* Table Header ends */}
        </TableHead>
        <TableBody>
          {tableData.map((row) => {
            return (
            <StyledTableRow
              key={getId('table-row')}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {columns.map((column) => (
                <EPNSTableBodyCell key={getId('table-cell')} row={row} column={column}/>
              ))}
            </StyledTableRow>
          ); })}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
};

EPNSSimpleTable.propTypes = {
  data: array,
  columns: array
};

EPNSSimpleTable.defaultProps = {
  data: [],
  columns: []
};

export default EPNSSimpleTable;

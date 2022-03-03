import React, { useEffect, useState, memo } from 'react';
import {
    Table, TableCell, TableContainer,
    TableHead, TableRow, Paper, TextField
  } from '@mui/material';
import { getId } from '../../utils';


const FilterCell = ({
  onFilter,
  column,
}) => {
    const [filter, setFilter] = useState('');

    const onFilterChange = (e) => {
        const query = e.target.value;
        setFilter(query);
        onFilter(query, column);
    };

    console.log("\t\tfilter cell: ", column, filter);

    return (
        <TableCell variant="head">
            <TextField
                placeholder="Filter"
                value={filter}
                onChange={onFilterChange}
            />
        </TableCell>
    );
};

const EPNSTableFilters = ({
  columns,
  applyFilter
}) => {
    const onFilterChange = (query, field) => {
        applyFilter(field, query);
    };

    console.log("\tfilters renders: ");

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table filters">
            <TableHead>  
                {/* Table Column Filter starts */}
                <TableRow>
                {columns.map((column) => (
                    <FilterCell
                        key={getId('table-filter-cell')}
                        onFilter={onFilterChange}
                        column={column.field}
                    />
                ))}
                </TableRow>
                {/* Table Column Filter ends */}
    
            </TableHead>
            </Table>
        </TableContainer>
    );
};

function propsAreEqual(prevProps, nextProps) {
    const res = prevProps.columns === nextProps.columns
        && prevProps.data === nextProps.data;
    console.warn('\t --> comparing props: ', res);
    return res;
}
  

export default memo(EPNSTableFilters, propsAreEqual);
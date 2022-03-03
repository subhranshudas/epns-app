import React, { useEffect, useState, useCallback } from 'react';
import { array } from 'prop-types';
import {
  Table, TableBody, TableCell, tableCellClasses, TableContainer,
  TableHead, TableRow, Paper, Box, TextField
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EPNSSimpleTable from './EPNSSimpleTable';
import EPNSTableFilters from './EPNSTableFilters';

const processFilters = () => {}

const EPNSTable = ({
  data,
  columns
}) => {
  const [filters, setFilters] = useState({});
  const [filteredData, applyFilterToData] = useState([]);
  const [, reset] = useState(false);

  const applyFilter = (column, filterQuery) => {
        setFilters({
            ...filters,
            [column]: filterQuery
        });
        console.log("ALL:setFilters() called...", column, filterQuery);
  };

useEffect(() => {
    if (data.length > 0) {
        applyFilterToData(data);
    } else if (data.length === 0){
        applyFilterToData(data);
    }
}, [data]);

console.log("ALL rendered...");

  return (
    <Box>
        <EPNSTableFilters
            applyFilter={applyFilter}
            columns={columns}
            data={data}
        />
        
        <EPNSSimpleTable
            data={filteredData}
            columns={columns}
        />
    </Box>
  );
};

export default EPNSTable;

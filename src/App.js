import React, { useState } from 'react';
import {
  Box, Stack, Button, TextField,
} from '@mui/material';
import { EPNSTable } from './components/EPNSTable';
import { getFakeData, columnsDef } from './utils';
import './App.css';

function App() {
  const [tableData, setTableData] = useState([]);
  const [numOfItems, setNumOfItems] = useState(0);

  const onChangeHandler = (e) => {
    setNumOfItems(e.target.value);
  };

  const fetchData = () => {
    const fakeData = getFakeData(numOfItems);
    setTableData(fakeData);
  };

  const reset = () => {
    setTableData([]);
    setNumOfItems(0);
  };

  return (
    <Box padding={3}>
      <Stack spacing={2} direction="row">
        <TextField
          label="Num of Items"
          variant="outlined"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          value={numOfItems}
          onChange={onChangeHandler}
        />

        <Button variant="contained" onClick={fetchData}>Fetch Data</Button>
        <Button variant="contained" color="secondary" onClick={reset}>Reset</Button>
      </Stack>
      <Box padding={3}>
        <EPNSTable
          data={tableData}
          columns={columnsDef}
        />
      </Box>
    </Box>
  );
}

export default App;

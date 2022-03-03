import { useState } from 'react';
import { Box, Stack, Button, TextField } from '@mui/material';
import './App.css';
import { EPNSTable } from './components/EPNSTable';
import { getFakeData } from './utils';


const columns = [
  { title: 'Name', field: 'firstName' },
  { title: 'Surname', field: 'lastName' },
  {
    title: 'Birth Year',
    field: 'birthYear',
    type: 'date',
    customSort: (a, b) => {
      if ((a.birthYear).getTime() < (b.birthYear).getTime()){
        return 1;
      }
      if ((a.birthYear).getTime() > (b.birthYear).getTime()){
        return -1;
      }
      return 0;
    }
  },
  { title: 'Birth Place', field: 'birthCity'},
  { title: 'Salary', field: 'salary'}
];

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
          value={numOfItems}
          onChange={onChangeHandler}
        />

        <Button variant="contained" onClick={fetchData}>Fetch Data</Button>
        <Button variant="contained" color="secondary" onClick={reset}>Reset</Button>
      </Stack>
      <Box padding={3}>
        <EPNSTable
          data={tableData}
          columns={columns}
        />
      </Box>
    </Box>
  );
}

export default App;

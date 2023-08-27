
import { DataGrid  } from '@mui/x-data-grid';
// import React, { useCallback, useMemo, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useCallback, useState } from 'react';

const useFakeMutation = () => {
  return useCallback(
    (user) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (user.name?.trim() === '') {
            reject(new Error("Error while saving user: name can't be empty."));
          } else {
            resolve({ ...user, name: user.name?.toUpperCase() });
          }
        }, 200);
      }),
    [],
  );
};


const columns = [
  { field: 'name', headerName: 'Name', width: 180, editable: true },
  { field: 'age', headerName: 'Age', type: 'number', editable: true },
  {
    field: 'dateCreated',
    headerName: 'Date Created',
    type: 'number',
    width: 180,
    editable: true,
    cellClassName: 'font-tabular-nums'
  },
  {
    field: 'lastLogin',
    headerName: 'Last Login',
    type: 'date',
    width: 220,
    editable: true,
  },
];

const rows = [
  {
    id: 1,
    name: 'aaaaa',
    age: 25,
    dateCreated: 4578154,
    lastLogin: new Date('2022-01-01'),
  },
  {
    id: 2,
    name: 'bbbbbbbbbbbbb',
    age: 36,
    dateCreated: 23234442,
    lastLogin: new Date('2022-01-01'),
  },
  {
    id: 3,
    name: 'ccccccccccccccccc',
    age: 19,
    dateCreated: 4454532,
    lastLogin: new Date('2022-01-01'),
  },
  {
    id: 4,
    name: 'ddddddddddddddd',
    age: 28,
    dateCreated: 43434333,
    lastLogin: new Date('2022-01-01'),
  },
  {
    id: 5,
    name: 'eeeeeeeeeeeeeeeeee',
    age: 23,
    dateCreated: 3243455,
    lastLogin: new Date('2022-01-01'),
  },
];


const Prestamo = () => {
  const mutateRow = useFakeMutation();

  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = useCallback(
    async (newRow) => {
      // Make the HTTP request to save in the backend
      console.log('el new row',newRow);
      const response = await mutateRow(newRow);
      setSnackbar({ children: 'User successfully saved', severity: 'success' });
      return response;
    },
    [mutateRow],
  );

  const mio = useCallback(async(newRow)=>{
    console.log(newRow);
    return newRow
  },[])
    
  

  const handleProcessRowUpdateError = useCallback((error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <label className="titulo">Prestamos</label><br />
      <DataGrid
        rows={rows}
        columns={columns}
        processRowUpdate={mio}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        page
      />
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </div>
  );
}

export default Prestamo



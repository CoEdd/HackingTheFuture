import * as React from 'react';
import axios from 'axios';
import { styled } from '@mui/system';
import { useSearchParams } from 'next/navigation';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function Review() {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const searchParams = useSearchParams();
  const creatorEmail = searchParams.get("email");

  const columns = [
    { field: 'childmail', headerName: 'Child Email', type: 'text', width: 200, align: 'left', headerAlign: 'left', editable: false },
    { field: 'eventVenue', headerName: 'Trip Destination', type: 'text', width: 250, align: 'left', headerAlign: 'left', editable: false },
    { field: 'eventDate', headerName: 'Trip Date', type: 'text', width: 250, align: 'left', headerAlign: 'left', editable: false },
  ];

  React.useEffect(() => {
    // Fetch data from the backend
    axios.get('http://localhost:8080/api/v1/programJoins')
      .then(response => {
        const data = response.data;
        // Filter the data based on the creator email
        const filteredData = data.filter(item => item.bookedByParent === creatorEmail);
        // Map the filtered data to the format expected by DataGrid
        const formattedData = filteredData.map((item, index) => ({
          id: index + 1,
          childmail: item.emailRegister,
          eventVenue: item.eventVenue,
          eventDate: item.eventDate,
        }));
        setRows(formattedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [creatorEmail]);

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === 'rowFocusOut') {
      event.defaultMuiPrevented = true;
    }
  };

  return (
    <Grid container spacing={2}>
      <Box
        sx={{
          height: 440,
          width: '100%',
          '& .actions': { color: 'text.secondary' },
          '& .textPrimary': { color: 'text.primary' },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
        />
      </Box>
    </Grid>
  );
}

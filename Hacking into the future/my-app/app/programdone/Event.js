import * as React from 'react';
import Grid from '@mui/material/Grid';
import { useSearchParams, useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import axios from 'axios';
import {
  DataGrid,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';

function randomId() {
  return Math.floor(Math.random() * 1000000);
}

export default function Event() {
  const searchParams = useSearchParams();
  const creatorEmail = searchParams.get("email");

  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  React.useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/programJoins');
        console.log('Fetched event data:', response.data);

        const filteredEventData = response.data
          .filter(event => event.emailRegister === creatorEmail)
          .filter(event => event.eventVenue && event.eventDate );

        setRows(filteredEventData.map(event => ({ ...event, id: event.id || randomId() })));
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };
    fetchEventData();
  }, [creatorEmail]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'eventTitle', headerName: 'Event Title', width: 180, editable: false },
    { field: 'eventDescription', headerName: 'Event Description', type: 'text', width: 180, align: 'left', headerAlign: 'left', editable: false },
    { field: 'eventVenue', headerName: 'Event Venue', width: 220, editable: false, type: 'singleSelect' },
    { field: 'eventDate', headerName: 'Event Date', type: 'text', width: 100, editable: false },
    { field: 'eventTime', headerName: 'Event Time', type: 'time', width: 90, editable: false },
  ];

  return (
    <Grid container spacing={2}>
      <Box
        sx={{
          height: 440,
          width: '250%',
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
          processRowUpdate={processRowUpdate}
          slotProps={{ toolbar: { setRows, setRowModesModel } }}
        />
      </Box>
    </Grid>
  );
}

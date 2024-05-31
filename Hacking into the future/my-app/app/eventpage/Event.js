import * as React from 'react';
import Grid from '@mui/material/Grid';
import { useSearchParams } from 'next/navigation';
import Box from '@mui/material/Box';
import axios from 'axios'; // Import Axios


import {
  DataGrid,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';


export default function AddressForm() {

  const searchParams = useSearchParams();
  const creatorEmail = searchParams.get("email");

  const [rows, setRows] = React.useState([]);

  // Fetch event details by email when the component mounts
  React.useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/events`);
        console.log('Fetched event data:', response.data);
      
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };
  
    fetchEventData();
  }, [creatorEmail]);

  const [rowModesModel, setRowModesModel] = React.useState({});

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
    {
      field: 'eventDescription',
      headerName: 'Event Description',
      type: 'text',
      width: 180,
      align: 'left',
      headerAlign: 'left',
      editable: false,
    },

    {
      field: 'eventVenue',
      headerName: 'Event Venue',
      width: 220,
      editable: false,
      type: 'singleSelect',

    },    
    {
      field: 'eventDate',
      headerName: 'Event date',
      type: 'text',
      width: 100,
      editable: false,
    },
    {
      field: 'eventTime',
      headerName: 'Event Time',
      type: 'time',
      width: 90,
      editable: false,
    },
    {
      field: 'creatorEmail',
      headerName: 'Creator',
      type: 'time',
      width: 150,
      editable: false,
    },
    
  ];

  return (

    <Grid container spacing={2}>
      <Box
        sx={{
          height: 440,
          width: '200%',
          '& .actions': {
            color: 'text.secondary',
          },
          '& .textPrimary': {
            color: 'text.primary',
          },
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
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </Box>

    </Grid>
  )
}

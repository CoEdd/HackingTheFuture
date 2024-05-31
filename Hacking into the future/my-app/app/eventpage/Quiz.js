import * as React from 'react';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Box from '@mui/material/Box';

import {
  DataGrid,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';

export default function Review() {

  const searchParams = useSearchParams();
  const creatorEmail = searchParams.get("email");

  const [rows, setRows] = React.useState([]);

  // Fetch event details by email when the component mounts
  React.useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/quizzes`);
        console.log('Fetched event data:', response.data);
        // Filter event data based on creatorEmail before setting to rows
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
    { field: 'quizTitle', headerName: 'Quiz Title', width: 180, editable: false },
    {
      field: 'quizDescription',
      headerName: 'Quiz Description',
      type: 'text',
      width: 180,
      align: 'left',
      headerAlign: 'left',
      editable: false,
    },

    {
      field: 'quizTheme',
      headerName: 'Quiz Theme',
      width: 150,
      editable: false,
      type: 'singleSelect',
      valueOptions: ['Science', 'Mathematics', 'Engineering','Technology'],
    },    
    {
      field: 'quizContent',
      headerName: 'Quiz Content',
      type: 'text',
      width: 190,
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

  const [formData, setFormData] = React.useState({
    quizTitle: '',
    quizDescription: '',
    quizcontent: '',
    quizTheme: '',
    // eventTime: '',
    creatorEmail
  });

  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:8080/api/v1/quizzes', formData)
      .then(response => {
        console.log('Event posted successfully:', response.data);
        // Reset form fields if needed
        setFormData({
          quizTitle: '',
          quizDescription: '',
          quizContent: '',
          quizTheme: ''
        });

        // Show success alert
        setShowSuccessAlert(true);

      })
      .catch(error => {
        console.error('Error posting event:', error);
      });
  };

  return (

    <form onSubmit={handleSubmit}>
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
      {showSuccessAlert && (
      <Link href={`/studentpage?Name=${Name}&email=${creatorEmail}`}>
      {/* <a> */}
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity="success"
          onClose={() => setShowSuccessAlert(false) }
          sx={{ position: 'fixed', bottom: 355, right: 600 }}
        >
          Your quiz was succesfully created.
        </Alert>
        </Link>
      )}
    </form>
  );
}

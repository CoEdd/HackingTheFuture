import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import {
  DataGrid,
  GridToolbarContainer,
  GridRowModes,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';

function randomId() {
  return Math.floor(Math.random() * 1000000);
}

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = Math.random().toString(36).substr(2, 9); // Generate a random unique ID
    setRows((oldRows) => [...oldRows, { id, quizTitle: '', quizDescription: '', quizTheme: '', quizContent: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'quizTitle' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function Quiz() {
  const searchParams = useSearchParams();
  const creatorEmail = searchParams.get("email");

  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [formData, setFormData] = useState({
    quizTitle: '',
    quizDescription: '',
    quizContent: '',
    quizTheme: '',
    creatorEmail
  });

  React.useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/programJoins');
        console.log('Fetched event data:', response.data);

        const filteredEventData = response.data
          .filter(event => event.emailRegister === creatorEmail)
          .filter(event => event.quizTitle && event.quizDescription && event.quizTheme && event.quizContent );

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
    { field: 'quizTitle', headerName: 'Quiz Title', width: 180, editable: false },
    { field: 'quizDescription', headerName: 'Quiz Description', width: 180, editable: false },
    { field: 'quizTheme', headerName: 'Quiz Theme', width: 220, editable: false },
    { field: 'quizContent', headerName: 'Quiz Content', width: 220, editable: false },
  ];


  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/api/v1/quizzes', formData)
      .then(response => {
        console.log('Quiz posted successfully:', response.data);
        setFormData({
          quizTitle: '',
          quizDescription: '',
          quizContent: '',
          quizTheme: '',
          creatorEmail
        });
        setShowSuccessAlert(true);
      })
      .catch(error => {
        console.error('Error posting quiz:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
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
            components={{ Toolbar: EditToolbar }}
            componentsProps={{ toolbar: { setRows, setRowModesModel } }}
          />
        </Box>
      </Grid>
      {showSuccessAlert && (
        <Link href={`/educatorpage?Name=${searchParams.get("Name")}&email=${creatorEmail}`} passHref>
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            severity="success"
            onClose={() => setShowSuccessAlert(false)}
            sx={{ position: 'fixed', bottom: 20, right: 20 }}
          >
            Your quiz was successfully created.
          </Alert>
        </Link>
      )}
    </form>
  );
}

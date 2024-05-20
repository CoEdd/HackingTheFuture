import * as React from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  return randomArrayItem(roles);
};

const initialRows = [
  {
    id: randomId(),
    event: "effsf",
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    eventTime: 1800,
    role: randomRole(),
  },

];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  // return (
  //   <GridToolbarContainer>
  //     <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
  //       Add record
  //     </Button>
  //   </GridToolbarContainer>
  // );
}

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function Review() {

  const searchParams = useSearchParams();
  const creatorEmail = searchParams.get("email");

  const [rows, setRows] = React.useState([]);

  // Fetch event details by email when the component mounts
  React.useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/quizzes?email=${creatorEmail}`);
        console.log('Fetched event data:', response.data);
        // Filter event data based on creatorEmail before setting to rows
        const filteredEventData = response.data.filter(event => event.creatorEmail === creatorEmail);
        setRows(filteredEventData);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };
  
    fetchEventData();
  }, [creatorEmail]);


  // const searchParams = useSearchParams();
  // const Name = searchParams.get("Name");
  // const creatorEmail = searchParams.get("email");

  // const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => async () => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/quizzes/${id}`);
      setRows(rows.filter((row) => row.id !== id));
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
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
      width: 220,
      editable: false,
      type: 'singleSelect',
      valueOptions: ['Science', 'Mathematics', 'Engineering','Technology'],
    },    
    {
      field: 'quizContent',
      headerName: 'Quiz Content',
      type: 'text',
      width: 100,
      editable: false,
    },
    // {
    //   field: 'eventTime',
    //   headerName: 'Event Time',
    //   type: 'time',
    //   width: 90,
    //   editable: true,
    // },
    
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 80,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
        return [
          // <GridActionsCellItem
          //   icon={<EditIcon />}
          //   label="Edit"
          //   className="textPrimary"
          //   onClick={handleEditClick(id)}
          //   color="inherit"
          // />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const [quizTheme, setquizTheme] = React.useState('');

  const handleChange = (event) => {
    setquizTheme(event.target.value);
    setFormData({ ...formData, quizTheme: event.target.value });
  };


  // const searchParams = useSearchParams();
  // const Name = searchParams.get("Name");
  // const creatorEmail = searchParams.get("email");

  const [formData, setFormData] = React.useState({
    quizTitle: '',
    quizDescription: '',
    quizcontent: '',
    quizTheme: '',
    // eventTime: '',
    creatorEmail
  });

  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

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
          // eventTime: ''

          
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
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </Box>

    </Grid>
      {showSuccessAlert && (
      <Link href={`/educatorpage?Name=${Name}&email=${creatorEmail}`}>
      {/* <a> */}
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity="success"
          onClose={() => setShowSuccessAlert(false) }
          sx={{ position: 'fixed', bottom: 355, right: 600 }}
        >
          Your quiz was succesfully created.
        </Alert>
        {/* </a> */}
        </Link>
      )}

    </form>
    
  );
}

import * as React from 'react';

import Grid from '@mui/material/Grid';
import { useSearchParams } from 'next/navigation';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import axios from 'axios'; // Import Axios


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

// const initialRows = [
//   {
//     id: randomId(),
//     event: "effsf",
//     name: randomTraderName(),
//     age: 25,
//     joinDate: randomCreatedDate(),
//     eventTime: 1800,
//     role: randomRole(),
//   },

// ];

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

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
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
    
    // {
    //   field: 'actions',
    //   type: 'actions',
    //   headerName: 'Actions',
    //   width: 80,
    //   cellClassName: 'actions',
    //   getActions: ({ id }) => {
    //     const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

    //     if (isInEditMode) {
    //       return [
    //         <GridActionsCellItem
    //           icon={<SaveIcon />}
    //           label="Save"
    //           sx={{
    //             color: 'primary.main',
    //           }}
    //           onClick={handleSaveClick(id)}
    //         />,
    //         <GridActionsCellItem
    //           icon={<CancelIcon />}
    //           label="Cancel"
    //           className="textPrimary"
    //           onClick={handleCancelClick(id)}
    //           color="inherit"
    //         />,
    //       ];
    //     }
    //     // return [
    //     //   // <GridActionsCellItem
    //     //   //   icon={<EditIcon />}
    //     //   //   label="Edit"
    //     //   //   className="textPrimary"
    //     //   //   onClick={handleEditClick(id)}
    //     //   //   color="inherit"
    //     //   // />,
    //     //   <GridActionsCellItem
    //     //     icon={<DeleteIcon />}
    //     //     label="Delete"
    //     //     onClick={handleDeleteClick(id)}
    //     //     color="inherit"
    //     //   />,
    //     // ];
    //   },
    // },
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
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </Box>

    </Grid>
  )
}

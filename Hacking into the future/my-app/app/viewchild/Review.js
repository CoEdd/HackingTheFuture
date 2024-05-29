import * as React from 'react';
import Grid from '@mui/material/Grid';
import { useSearchParams } from 'next/navigation';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Button from '@mui/material/Button';

export default function AddressForm() {
  const searchParams = useSearchParams();
  const creatorEmail = searchParams.get("email");

  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleApprove = async (row) => {
    try {
      await axios.put(`http://localhost:8080/api/v1/relations/status/${row.id}`, 'friend', {
        headers: {
          'Content-Type': 'text/plain'
        }
      });
  
      // Remove the approved row from the DataGrid
      setRows((prevRows) => prevRows.filter((r) => r.id !== row.id));
    } catch (error) {
      console.error('Error updating relation status:', error);
    }
  };

  React.useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/relations/pending/${creatorEmail}`);
        const pendingRelations = response.data;

        const fetchUserDetails = async (useremail) => {
          const userResponse = await axios.get(`http://localhost:8080/api/v1/users/email/${useremail}`);
          return userResponse.data;
        };

        const rowsWithFriendNames = await Promise.all(pendingRelations.map(async (relation) => {
          const userDetails = await fetchUserDetails(relation.useremail);
          return {
            ...relation,
            friendname: `${userDetails.firstName} ${userDetails.lastName}`,
            friendemail: relation.useremail // Ensure friendemail is correctly mapped
          };
        }));

        setRows(rowsWithFriendNames);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };
    
    if (creatorEmail) {
      fetchEventData();
    }
  }, [creatorEmail]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === 'rowFocusOut') {
      event.defaultMuiPrevented = true;
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'friendname', headerName: 'Friend Name', type: 'text', width: 200, align: 'left', headerAlign: 'left', editable: false },
    { field: 'friendemail', headerName: 'Friend Email', type: 'text', width: 180, align: 'left', headerAlign: 'left', editable: false },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleApprove(params.row)}
        >
          Approve
        </Button>
      ),
    },
  ];

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

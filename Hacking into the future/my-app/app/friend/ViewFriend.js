import * as React from 'react';
import Grid from '@mui/material/Grid';
import { useSearchParams } from 'next/navigation';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

export default function ViewFriend() {
  const searchParams = useSearchParams();
  const creatorEmail = searchParams.get("email");

  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  React.useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/relations/friend/${creatorEmail}`);
        const friendRelations = response.data.filter(relation => relation.status === 'friend');

        const fetchUserDetails = async (email) => {
          const userResponse = await axios.get(`http://localhost:8080/api/v1/users/email/${email}`);
          return userResponse.data;
        };

        const rowsWithFriendNames = await Promise.all(friendRelations.map(async (relation) => {
          let userDetails;
          if (relation.useremail === creatorEmail) {
            userDetails = await fetchUserDetails(relation.friendemail);
            return {
              ...relation,
              friendname: `${userDetails.firstName} ${userDetails.lastName}`,
              friendemail: relation.friendemail
            };
          } else if (relation.friendemail === creatorEmail) {
            userDetails = await fetchUserDetails(relation.useremail);
            return {
              ...relation,
              friendname: `${userDetails.firstName} ${userDetails.lastName}`,
              friendemail: relation.useremail
            };
          }
          return null;
        }));

        setRows(rowsWithFriendNames.filter(row => row !== null));
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
    { field: 'friendemail', headerName: 'Friend Email', type: 'text', width: 180, align: 'left', headerAlign: 'left', editable: false }
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

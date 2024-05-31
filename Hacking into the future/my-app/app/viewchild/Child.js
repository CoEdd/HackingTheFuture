import * as React from 'react';
import Grid from '@mui/material/Grid';
import { useSearchParams } from 'next/navigation';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

export default function Child() {
  const searchParams = useSearchParams();
  const creatorEmail = searchParams.get("email");

  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  React.useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/relations/child/${creatorEmail}`);
        const childRelations = response.data.filter(relation => relation.status === 'childpending');
        console.log(childRelations);
    
        const fetchUserDetails = async (childmail) => {
          const userResponse = await axios.get(`http://localhost:8080/api/v1/users/email/${childmail}`);
          return userResponse.data;
        };

        const rowsWithChildNames = await Promise.all(childRelations.map(async (relation) => {
          const userDetails = await fetchUserDetails(relation.childmail); // Corrected variable name
          return {
            ...relation,
            childname: `${userDetails.firstName} ${userDetails.lastName}`,
            childemail: relation.childmail // Corrected variable name
          };
        }));

        setRows(rowsWithChildNames);
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
    { field: 'childname', headerName: 'Child Name', type: 'text', width: 200, align: 'left', headerAlign: 'left', editable: false },
    { field: 'childemail', headerName: 'Child Email', type: 'text', width: 250, align: 'left', headerAlign: 'left', editable: false },
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

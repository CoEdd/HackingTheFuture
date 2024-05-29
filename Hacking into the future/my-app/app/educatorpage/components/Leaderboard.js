import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const columns = [
  { field: 'id', headerName: 'Ranking No.', sortable: false, width: 130 },
  { field: 'username', headerName: 'User Name', sortable: false, width: 500 },
  {
    field: 'email',
    headerName: 'Email',
    description: 'This column ',
    sortable: false,
    width: 350,
  },  
  { field: 'studentPoint', headerName: 'Current Point', sortable: false, width: 110 },
];

export default function Leaderboard() {
  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);

  const handleClickOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const [rows, setRows] = useState([]);
  useEffect(() => {
    const fetchRankedUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/users/ranked');
        if (!response.ok) {
          throw new Error('Failed to fetch ranked users');
        }
        const data = await response.json();
        setRows(data);
      } catch (error) {
        console.error('Error fetching ranked users:', error);
      }
    };

    fetchRankedUsers();
  }, []);

  const handleRowClick = (params) => {
    handleClickOpen(params.row);
  };

  return (
    <Container
      id="leaderboard"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          Global Leaderboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
        🌟 Ready to showcase your brilliance?
        Introducing our dynamic leaderboard, where every point earned is a testament to your knowledge and engagement! 
        Participate in quizzes, dive into events, and watch your points soar as you outsmart the competition.
        Join our vibrant community of thinkers and doers, where your contributions are celebrated and rewarded. 
        Are you ready to take the lead? The leaderboard awaits your next move! 🏆✨
        </Typography>
      </Box>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10]}
          onRowClick={handleRowClick}
        />
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here are the details of the selected user:
          </DialogContentText>
          {selectedUser && (
            <>
              <Typography variant="h6">Name: {selectedUser.username}</Typography>
              <Typography variant="body1">Email: {selectedUser.email}</Typography>
              <Typography variant="body1">Current Point: {selectedUser.studentPoint}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

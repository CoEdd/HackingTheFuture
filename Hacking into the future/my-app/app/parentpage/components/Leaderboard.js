import * as React from 'react';
import {
  Container, Box, Typography, Button, Dialog,
  DialogActions, DialogContent, DialogContentText,
  DialogTitle
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

const columns = [
  { field: 'id', headerName: 'Ranking No.', sortable: false, width: 130 },
  { field: 'username', headerName: 'User Name', sortable: false, width: 500 },
  { field: 'email', headerName: 'Email', sortable: false, width: 350 },
  { field: 'studentPoint', headerName: 'Current Point', sortable: false, width: 110 },
];

export default function Leaderboard() {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const searchParams = useSearchParams();
  const creatorEmail = searchParams.get("email");
  const [rows, setRows] = useState([]);

  const handleClickOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    const fetchRankedUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/users/ranked');
        if (!response.ok) throw new Error('Failed to fetch ranked users');
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

  const addChild = async () => {
    if (selectedUser) {
      try {
        const checkResponse = await axios.get('http://localhost:8080/api/v1/relations/check', {
          params: { useremail: creatorEmail, friendemail: selectedUser.email }
        });

        if (checkResponse.data) {
          alert('This user is already added or request is pending');
        } else {
          const checkChildResponse = await axios.get('http://localhost:8080/api/v1/relations/child/check', {
            params: { childemail: selectedUser.email }
          });

          if (checkChildResponse.data) {
            alert('This child belongs to another user.');
          } else {
            const response = await axios.post('http://localhost:8080/api/v1/relations', {
              useremail: creatorEmail,
              childemail: selectedUser.email,
              status: 'childpending',
            });
            alert("Your request is still in process. Ask your child to approve you as a parent.");
            console.log('Child request sent:', response.data);
          }
        }
        handleClose();
      } catch (error) {
        console.error('Error sending child request:', error);
      }
    }
  };

  return (
    <Container
      id="Leaderboard"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box sx={{ width: { sm: '100%', md: '60%' }, textAlign: { sm: 'left', md: 'center' } }}>
        <Typography component="h2" variant="h4" color="text.primary">
          Global Leaderboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          🌟 Ready to showcase your brilliance? Introducing our dynamic leaderboard, where every point earned is a testament to your knowledge and engagement!
          Participate in quizzes, dive into events, and watch your points soar as you outsmart the competition. Join our vibrant community of thinkers and doers, where your contributions are celebrated and rewarded. Are you ready to take the lead? The leaderboard awaits your next move! 🏆✨
        </Typography>
      </Box>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 10 } },
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
            addChild();
          },
        }}
      >
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          <DialogContentText>Here are the details of the selected user:</DialogContentText>
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
          <Button type="submit">Add Child</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

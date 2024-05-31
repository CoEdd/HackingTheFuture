import * as React from 'react';
import Grid from '@mui/material/Grid';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Event() {
  const [open, setOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [rows, setRows] = React.useState([]);
  const [existingRegistrations, setExistingRegistrations] = React.useState([]);
  const searchParams = useSearchParams();
  const creatorEmail = searchParams.get("email");

  React.useEffect(() => {
    const fetchEventData = async () => {
      try {
        const [eventsResponse, registrationsResponse] = await Promise.all([
          axios.get('http://localhost:8080/api/v1/events'),
          axios.get(`http://localhost:8080/api/v1/programJoins?emailRegister=${creatorEmail}`)
        ]);
        console.log('Fetched event data:', eventsResponse.data);
        console.log('Fetched registration data:', registrationsResponse.data);
        setRows(eventsResponse.data);
        setExistingRegistrations(registrationsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchEventData();
  }, [creatorEmail]);

  const handleRowClick = (params) => {
    setSelectedEvent(params.row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  const handleRegister = () => {
    if (!selectedEvent) return;

    const isClashing = existingRegistrations.some(registration =>
      registration.eventDate === selectedEvent.eventDate &&
      // registration.eventTime === selectedEvent.eventTime &&
      registration.emailRegister === creatorEmail
    );

    if (isClashing) {
      alert('There is a clash with another event on the same date.');
      return;
    }

    const eventData = {
      emailRegister: creatorEmail,
      eventTitle: selectedEvent.eventTitle,
      eventDescription: selectedEvent.eventDescription,
      eventVenue: selectedEvent.eventVenue,
      eventDate: selectedEvent.eventDate,
      eventTime: selectedEvent.eventTime,
    };

    axios.post('http://localhost:8080/api/v1/programJoins', eventData)
      .then(response => {
        console.log('Event registered:', response.data);
        alert('Event registered successfully!');
        setExistingRegistrations([...existingRegistrations, eventData]);  // Update the state with the new registration
      })
      .catch(error => {
        console.error('Error registering event:', error);
        alert('Failed to register the event.');
      });

    handleClose();
  };

  const columns = [
    { field: 'eventTitle', headerName: 'Event Title', width: 180 },
    { field: 'eventDescription', headerName: 'Event Description', width: 180 },
    { field: 'eventVenue', headerName: 'Event Venue', width: 220 },
    { field: 'eventDate', headerName: 'Event Date', width: 100 },
    { field: 'eventTime', headerName: 'Event Time', width: 90 },
    { field: 'creatorEmail', headerName: 'Creator', width: 150 },
  ];

  return (
    <Grid container spacing={2}>
      <Box
        sx={{
          height: 440,
          width: '250%',
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
          pageSize={5}
          onRowClick={handleRowClick}
        />
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Event Details</DialogTitle>
          <DialogContent>
            <DialogContentText>Here are the details of the selected event:</DialogContentText>
            {selectedEvent && (
              <>
                <Typography variant="h6">Event Title: {selectedEvent.eventTitle}</Typography>
                <Typography variant="h6">Event Description: {selectedEvent.eventDescription}</Typography>
                <Typography variant="body1">Event Venue: {selectedEvent.eventVenue}</Typography>
                <Typography variant="body1">Event Date: {selectedEvent.eventDate}</Typography>
                <Typography variant="body1">Event Time: {selectedEvent.eventTime}</Typography>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleRegister}>Register</Button>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Grid>
  );
}

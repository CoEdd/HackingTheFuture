import * as React from 'react';

import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
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

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function AddressForm() {

  const [eventVenue, setquizTheme] = React.useState('');

  const handleChange = (event) => {
    setquizTheme(event.target.value);
    setFormData({ ...formData, eventVenue: event.target.value });
  };

  const searchParams = useSearchParams();
  const Name = searchParams.get("Name");
  const creatorEmail = searchParams.get("email");

  const [formData, setFormData] = React.useState({
    eventTitle: '',
    eventDescription: '',
    eventVenue: '',
    eventDate: '',
    eventTime: '',
    creatorEmail
  });

  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:8080/api/v1/events', formData)
      .then(response => {
        console.log('Event posted successfully:', response.data);
        // Reset form fields if needed
        setFormData({
          eventTitle: '',
          eventDescription: '',
          eventVenue: '',
          eventDate: '',
          eventTime: ''

          
        });

        // Show success alert
        setShowSuccessAlert(true);

        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
        Here is a gentle confirmation that your action was successful.
      </Alert>

      })
      .catch(error => {
        console.error('Error posting event:', error);
      });
  };

  return (

    <form onSubmit={handleSubmit}>
    <Grid container spacing={2}>
      <FormGrid item xs={12} md={6}>
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="eventtitle" required>
          Event Title
        </FormLabel>
        <OutlinedInput
          id="eventtitle"
          name="eventTitle" // Note the capitalization here
          type="text" // type should be 'text' for a regular input field
          placeholder="Title Of Your Event"
          autoComplete="Event Title"
          value={formData.eventTitle}
          onChange={handleInputChange}
          required
        />  
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="eventdescription">Event Description</FormLabel>
        <OutlinedInput
          id="eventdescription"
          name="eventDescription"
          type="text"
          placeholder="Put the description of your event"
          autoComplete="shipping address-line2"
          value={formData.eventDescription}
          onChange={handleInputChange}
          required
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="eventdate" required>
          Event Venue
        </FormLabel>
        <OutlinedInput
          id="eventvenue"
          name="eventVenue"
          type="text"
          placeholder="Put Event Venue Here"
          autoComplete="shipping address-line2"
          value={formData.eventVenue}
          onChange={handleInputChange}
          required
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="eventdate" required>
          Event Date
        </FormLabel>
        <OutlinedInput
          id="eventdate"
          name="eventDate"
          type="date"
          placeholder="03/31/2024 (mm/dd/yyyy)"
          autoComplete="State"
          value={formData.eventDate}
          onChange={handleInputChange}
          required
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="eventtime" required>
          Event Time
        </FormLabel>
        <OutlinedInput
          id="eventtime"
          name="eventTime"
          type="type"
          placeholder="1300"
          autoComplete="shipping postal-code"
          value={formData.eventTime}
          onChange={handleInputChange}
          required
        />
      </FormGrid>
      
    </Grid>
    <Stack direction="row" spacing={2} sx={{ position: 'fixed', bottom: 60, left: 592 }}>
        <Button variant="contained" type="submit" >Create Event</Button>
      </Stack>

      {showSuccessAlert && (
      <Link href={`/educatorpage?Name=${Name}&email=${creatorEmail}`}>
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity="success"
          onClose={() => setShowSuccessAlert(false) }
          sx={{ position: 'fixed', bottom: 355, right: 600 }}
        >
          Your event was succesfully created.
        </Alert>
        </Link>
      )}

    </form>
    
  );
}

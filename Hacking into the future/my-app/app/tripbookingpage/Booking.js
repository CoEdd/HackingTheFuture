import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { styled } from '@mui/system';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Link from 'next/link';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const venues = [
  { name: "Petrosains Science Discovery Centre" },
  { name: "Tech Dome Penang" },
  { name: "Agro Technology Park in MARDI" },
  { name: "National Science Centre" },
  { name: "Marine Aquarium and Museum" },
  { name: "Pusat Sains & Kreativiti Terengganu" },
  { name: "Biomedical Museum" },
  { name: "Telegraph Museum" },
  { name: "Penang Science Cluster" },
];

export default function Booking() {
  const searchParams = useSearchParams();
  const creatorEmail = searchParams.get("email");
  const Name = searchParams.get("Name");

  const [childEmails, setChildEmails] = React.useState([]);
  const [selectedChildEmail, setSelectedChildEmail] = React.useState('');
  const [eventVenue, setEventVenue] = React.useState('');
  const [distance, setDistance] = React.useState('');
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);

  const [formData, setFormData] = React.useState({
    emailRegister: '',
    eventVenue: '',
    eventDate: '',
    bookedByParent: creatorEmail,
  });

  React.useEffect(() => {
    const fetchChildEmails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/relations/child/${creatorEmail}`);
        const childRelations = response.data;
        setChildEmails(childRelations.map(relation => relation.childmail));
      } catch (error) {
        console.error('Error fetching child emails:', error);
      }
    };

    if (creatorEmail) {
      fetchChildEmails();
    }
  }, [creatorEmail]);

  React.useEffect(() => {
    const fetchDistance = async () => {
      if (selectedChildEmail && eventVenue) {
        try {
          const response = await axios.get(`http://localhost:8080/api/v1/distance`, {
            params: {
              email: selectedChildEmail,
              venueName: eventVenue
            }
          });
          setDistance(response.data.toFixed(2));
        } catch (error) {
          console.error('Error fetching distance:', error);
        }
      }
    };

    fetchDistance();
  }, [selectedChildEmail, eventVenue]);

  const handleChildEmailChange = (event) => {
    setSelectedChildEmail(event.target.value);
    setFormData({ ...formData, emailRegister: event.target.value });
  };

  const handleEventVenueChange = (event) => {
    setEventVenue(event.target.value);
    setFormData({ ...formData, eventVenue: event.target.value });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:8080/api/v1/program_join', formData)
      .then(response => {
        setFormData({
          emailRegister: '',
          eventVenue: '',
          eventDate: '',
          bookedByParent: creatorEmail,
        });
        setShowSuccessAlert(true);
      })
      .catch(error => {
        console.error('Error posting event:', error);
        alert("There is clash event registered for your children.")
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <FormGrid item xs={12}>
          <FormLabel htmlFor="child-email" required>
            Child Email
          </FormLabel>
          <Box sx={{ minWidth: 600 }}>
            <FormControl fullWidth>
              <InputLabel id="child-email-select-label">Child Email</InputLabel>
              <Select
                labelId="child-email-select-label"
                id="child-email-select"
                value={selectedChildEmail}
                label="Child Email"
                onChange={handleChildEmailChange}
                required
              >
                {childEmails.map((email, index) => (
                  <MenuItem key={index} value={email}>
                    {email}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel htmlFor="eventVenue" required>
            Trip Venue
          </FormLabel>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="venue-select-label">Trip Venue</InputLabel>
              <Select
                labelId="venue-select-label"
                id="venue-select"
                value={eventVenue}
                label="Trip Venue"
                onChange={handleEventVenueChange}
                required
              >
                {venues.map((venue, index) => (
                  <MenuItem key={index} value={venue.name}>
                    {venue.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel htmlFor="eventDate" required>
            Trip Date
          </FormLabel>
          <OutlinedInput
            id="eventDate"
            name="eventDate"
            type="date"
            value={formData.eventDate}
            onChange={handleInputChange}
            required
          />
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel htmlFor="distance" required>
            Trip Distance
          </FormLabel>
          <OutlinedInput
            id="distance"
            name="distance"
            value={distance}
            readOnly
            required
          />
        </FormGrid>
      </Grid>
      <Stack direction="row" spacing={2} sx={{ position: 'fixed', bottom: 60, left: 592 }}>
        <Button variant="contained" type="submit">
          Make A Book
        </Button>
      </Stack>
      {showSuccessAlert && (
        <Link href={`/parentpage?Name=${Name}&email=${creatorEmail}`}>
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            severity="success"
            onClose={() => setShowSuccessAlert(false)}
            sx={{ position: 'fixed', bottom: 355, right: 600 }}
          >
            Your Booking Was Successfully Made.
          </Alert>
        </Link>
      )}
    </form>
  );
}

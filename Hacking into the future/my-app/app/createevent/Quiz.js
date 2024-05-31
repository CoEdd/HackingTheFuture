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

export default function Review() {

  const [quizTheme, setquizTheme] = React.useState('');

  const handleChange = (event) => {
    setquizTheme(event.target.value);
    setFormData({ ...formData, quizTheme: event.target.value });
  };


  const searchParams = useSearchParams();
  const Name = searchParams.get("Name");
  const creatorEmail = searchParams.get("email");

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
      <FormGrid item xs={12} md={6}>
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="quiztitle" required>
          Quiz Title
        </FormLabel>
        <OutlinedInput
          id="quiztitle"
          name="quizTitle" // Note the capitalization here
          type="text" // type should be 'text' for a regular input field
          placeholder="Title Of Your Quizz"
          autoComplete="Quiz Title"
          value={formData.quizTitle}
          onChange={handleInputChange}
          required
        />  
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="eventdescription">Quiz Description</FormLabel>
        <OutlinedInput
          id="quizdescription"
          name="quizDescription"
          type="text"
          placeholder="Put the description of your quiz"
          autoComplete="shipping address-line2"
          value={formData.quizDescription}
          onChange={handleInputChange}
          required
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="quizcontent" required>
          Quiz Content
        </FormLabel>
        <OutlinedInput
          id="quizcontent"
          name="quizContent"
          type="text"
          placeholder="link url"
          autoComplete="City"
          value={formData.quizContent}
          onChange={handleInputChange}
          required
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="eventdate" required>
          Quiz Theme
        </FormLabel>
        <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={quizTheme}
          label="quizTheme"
          onChange={handleChange}
        >
          <MenuItem value={"Science"}>Science</MenuItem>
          <MenuItem value={"Technology"}>Technology</MenuItem>
          <MenuItem value={"Mathematics"}>Mathematics</MenuItem>
          <MenuItem value={"Engineering"}>Engineering</MenuItem>
        </Select>
      </FormControl>
    </Box>
      </FormGrid>
    </Grid>
    <Stack direction="row" spacing={2} sx={{ position: 'fixed', bottom: 60, right: 350, zIndex: 9999 }}>
  <Button variant="contained" type="submit" >Create Quizz</Button>
</Stack>

      {showSuccessAlert && (
      <Link href={`/educatorpage?Name=${Name}&email=${creatorEmail}`}>
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity="success"
          onClose={() => setShowSuccessAlert(false) }
          sx={{ position: 'fixed', bottom: 355, right: 600 }}
        >
          Your quiz was succesfully created.
        </Alert>
        </Link>
      )}

    </form>
    
  );
}

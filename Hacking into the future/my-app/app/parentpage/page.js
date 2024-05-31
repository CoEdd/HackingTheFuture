'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AppAppBar from '../parentpage/components/AppAppBar';
import Hero from './components/Welcome';
import Discussions from './components/Discussions';
import ParentAccess from './components/ParentAccess';
import Testimonials from './components/Leaderboard';
import FAQ from '../parentpage/components/FAQ';
import Footer from '../parentpage/components/Footer';
import getLPTheme from '../parentpage/getLPTheme';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useSearchParams } from 'next/navigation';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const [eventDetail, setEventDetail] = useState(null);
  const [open, setOpen] = useState(true);
  const [studentData, setStudentData] = useState({
    studentCoordinate: '',
    studentPoint: 0,
    ranking: 0,
  });

  const searchParams = useSearchParams();
  const Name = searchParams.get("Name");
  const email = searchParams.get("email");

  useEffect(() => {
    fetchEventDetail();
    fetchUserDetails();
  }, [email]);

  const fetchEventDetail = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/events`);
      if (response.ok) {
        const data = await response.json();
        const event = data.find(event => event.eventDate === '2024-08-31');
        if (event) {
          setEventDetail(event);
        } else {
          console.error('No event found for the specified date');
        }
      } else {
        console.error('Failed to fetch event detail');
      }
    } catch (error) {
      console.error('Error fetching event detail:', error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const userResponse = await fetch(`http://localhost:8080/api/v1/users/email/${email}`);
      if (userResponse.ok) {
        const userData = await userResponse.json();
      } else {
        console.error('Failed to fetch user details');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 30, fontWeight: 'bold' }} color="text.secondary" gutterBottom>
          Profile 
        </Typography>
        <Typography variant="h5" sx={{ mb: 1.5 }} component="div">
          Name = {Name}
        </Typography>
        <Typography sx={{ mb: 1 }} >
          Email = {email}
        </Typography>
      </CardContent>
    </React.Fragment>
  );

  const [mode, setMode] = useState('light');
  const [showCustomTheme, setShowCustomTheme] = useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Hero />
      <Box sx={{ bgcolor: 'background.default' }}>
        <Box sx={{ bgcolor: 'background.default', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ width: '50%', textAlign: 'center' }}>
            <Collapse in={open}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {eventDetail ? (
                  <div>
                    <strong>{eventDetail.eventTitle}</strong> is happening today at {eventDetail.eventTime} in {eventDetail.eventVenue}.
                  </div>
                ) : (
                  <div>No event details available for today.</div>
                )}
              </Alert>
            </Collapse>
          </Box>
        </Box>

        <div style={{ display: 'flex', justifyContent: 'center', padding: '0 20px' }}>
          <Box sx={{ minWidth: 600 }}>
            <Card variant="outlined">{card}</Card>
          </Box>
        </div>

        <ParentAccess />
        <Divider />
        <Testimonials />
        <Divider />
        <Discussions />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </Box>
      <ToggleCustomTheme
        showCustomTheme={showCustomTheme}
        toggleCustomTheme={toggleCustomTheme}
      />
    </ThemeProvider>
  );
}

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100dvw',
        position: 'fixed',
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Platform"
        sx={{
          backgroundColor: 'background.default',
          '& .Mui-selected': {
            pointerEvents: 'none',
          },
        }}
      >
        {/* <ToggleButton value>
          <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
          Custom theme
        </ToggleButton> */}
        {/* <ToggleButton value={false}>Material Design 2</ToggleButton> */}
      </ToggleButtonGroup>
    </Box>
  );
}

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.bool.isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

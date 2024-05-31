import * as React from 'react';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import {
  DataGrid,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';

export default function Quiz() {
  const [open, setOpen] = React.useState(false);
  const [selectedQuiz, setSelectedQuiz] = React.useState(null);
  const searchParams = useSearchParams();
  const creatorEmail = searchParams.get("email");
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [quizzesResponse, programJoinsResponse] = await Promise.all([
          axios.get('http://localhost:8080/api/v1/quizzes'),
          axios.get(`http://localhost:8080/api/v1/programJoins?email=${creatorEmail}`)
        ]);

        const joinedQuizzesTitles = programJoinsResponse.data.map(join => join.quizTitle);
        const filteredQuizzes = quizzesResponse.data.filter(quiz => !joinedQuizzesTitles.includes(quiz.quizTitle));
        
        setRows(filteredQuizzes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [creatorEmail]);

  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleClickOpen = (quiz) => {
    setSelectedQuiz(quiz);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedQuiz(null);
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'quizTitle', headerName: 'Quiz Title', width: 180, editable: false },
    {
      field: 'quizDescription',
      headerName: 'Quiz Description',
      type: 'text',
      width: 180,
      align: 'left',
      headerAlign: 'left',
      editable: false,
    },
    {
      field: 'quizTheme',
      headerName: 'Quiz Theme',
      width: 150,
      editable: false,
      type: 'singleSelect',
      valueOptions: ['Science', 'Mathematics', 'Engineering', 'Technology'],
    },
    {
      field: 'quizContent',
      headerName: 'Quiz Content',
      type: 'text',
      width: 190,
      editable: false,
    },
    {
      field: 'creatorEmail',
      headerName: 'Creator',
      type: 'text',
      width: 150,
      editable: false,
    },
  ];

  const [formData, setFormData] = React.useState({
    quizTitle: '',
    quizDescription: '',
    quizContent: '',
    quizTheme: '',
    creatorEmail,
  });

  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/api/v1/quizzes', formData)
      .then(response => {
        console.log('Quiz posted successfully:', response.data);
        setFormData({
          quizTitle: '',
          quizDescription: '',
          quizContent: '',
          quizTheme: '',
        });
        setShowSuccessAlert(true);
      })
      .catch(error => {
        console.error('Error posting quiz:', error);
      });
  };

  const handleRowClick = (params) => {
    const selectedQuiz = rows.find(row => row.id === params.id);
    handleClickOpen(selectedQuiz);
  };

  const handleAttemptQuiz = async () => {
    if (selectedQuiz) {
      try {
        await axios.post('http://localhost:8080/api/v1/programJoins', {
          emailRegister: creatorEmail,
          quizTitle: selectedQuiz.quizTitle,
          quizTheme: selectedQuiz.quizTheme,
          quizDescription: selectedQuiz.quizDescription,
          quizContent: selectedQuiz.quizContent,
        });
        console.log('Quiz details posted to program_join table');
        window.open(selectedQuiz.quizContent, '_blank');
      } catch (error) {
        console.error('Error posting to program_join:', error);
      }
    }
    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit}>
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
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            onRowClick={handleRowClick}
            slotProps={{
              toolbar: { setRows, setRowModesModel },
            }}
          />

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Quiz Details</DialogTitle>
            <DialogContent>
              <DialogContentText>Here are the details of the selected quiz:</DialogContentText>
              {selectedQuiz && (
                <>
                  <Typography variant="h6">Quiz Title: {selectedQuiz.quizTitle}</Typography>
                  <Typography variant="h6">Quiz Description: {selectedQuiz.quizDescription}</Typography>
                  <Typography variant="body1">Quiz Theme: {selectedQuiz.quizTheme}</Typography>
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
              <Button onClick={handleAttemptQuiz}>
                Attempt Quiz
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Grid>
      {showSuccessAlert && (
        <Link href={`/studentpage?Name=${Name}&email=${creatorEmail}`}>
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            severity="success"
            onClose={() => setShowSuccessAlert(false)}
            sx={{ position: 'fixed', bottom: 355, right: 600 }}
          >
            Your quiz was successfully created.
          </Alert>
        </Link>
      )}
    </form>
  );
}

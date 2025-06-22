import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import heLocale from 'date-fns/locale/he';

function App() {
  const [targetDate, setTargetDate] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!targetDate) return;
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'linear-gradient(135deg, #e0f7fa 0%, #fff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={6} sx={{ p: 5, borderRadius: 5, minWidth: 350, maxWidth: 420, textAlign: 'center', bgcolor: '#f8fffa' }}>
        <Typography variant="h3" fontWeight={700} color="#00b894" mb={3}>
          <AccessTimeIcon sx={{ fontSize: 40, verticalAlign: 'middle', mr: 1 }} />
          טיימר עד תאריך עתידי
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={heLocale}>
          <DateTimePicker
            label="בחר תאריך ושעה"
            value={targetDate}
            onChange={setTargetDate}
            renderInput={(params) => <TextField {...params} sx={{ mb: 4, width: '100%' }} />}
            ampm={false}
          />
        </LocalizationProvider>
        {targetDate && (
          <Box>
            <Typography variant="h5" color="#009e6e" fontWeight={600} mb={2}>
              נותרו:
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Paper elevation={2} sx={{ p: 2, borderRadius: 3, minWidth: 70, bgcolor: '#eafff3' }}>
                  <Typography variant="h4" color="#00b894" fontWeight={700}>{timeLeft.days}</Typography>
                  <Typography color="#009e6e">ימים</Typography>
                </Paper>
              </Grid>
              <Grid item>
                <Paper elevation={2} sx={{ p: 2, borderRadius: 3, minWidth: 70, bgcolor: '#eafff3' }}>
                  <Typography variant="h4" color="#00b894" fontWeight={700}>{timeLeft.hours}</Typography>
                  <Typography color="#009e6e">שעות</Typography>
                </Paper>
              </Grid>
              <Grid item>
                <Paper elevation={2} sx={{ p: 2, borderRadius: 3, minWidth: 70, bgcolor: '#eafff3' }}>
                  <Typography variant="h4" color="#00b894" fontWeight={700}>{timeLeft.minutes}</Typography>
                  <Typography color="#009e6e">דקות</Typography>
                </Paper>
              </Grid>
              <Grid item>
                <Paper elevation={2} sx={{ p: 2, borderRadius: 3, minWidth: 70, bgcolor: '#eafff3' }}>
                  <Typography variant="h4" color="#00b894" fontWeight={700}>{timeLeft.seconds}</Typography>
                  <Typography color="#009e6e">שניות</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default App

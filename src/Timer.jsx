import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import LinearProgress from '@mui/material/LinearProgress'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'

function Timer({ id, name, targetDate, startDate, onDelete, onRename }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [timePassed, setTimePassed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [progress, setProgress] = useState(0)
  const [editMode, setEditMode] = useState(false)
  const [editedName, setEditedName] = useState(name)

  useEffect(() => {
    setEditedName(name)
  }, [name])

  useEffect(() => {
    if (!targetDate || !startDate) return

    const update = () => {
      const now = new Date()
      const diff = targetDate - now

      const total = targetDate - startDate
      const passed = now - startDate
      const progressValue = Math.min(100, Math.max(0, (passed / total) * 100))
      setProgress(progressValue)

      const daysPassed = Math.floor(passed / (1000 * 60 * 60 * 24))
      const hoursPassed = Math.floor((passed / (1000 * 60 * 60)) % 24)
      const minutesPassed = Math.floor((passed / (1000 * 60)) % 60)
      const secondsPassed = Math.floor((passed / 1000) % 60)
      setTimePassed({
        days: daysPassed,
        hours: hoursPassed,
        minutes: minutesPassed,
        seconds: secondsPassed,
      })

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((diff / (1000 * 60)) % 60)
        const seconds = Math.floor((diff / 1000) % 60)
        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        setProgress(100)
      }
    }

    update()
    const interval = setInterval(update, 1000)

    return () => clearInterval(interval)
  }, [targetDate, startDate])

  if (!targetDate) return null

  return (
    <Paper elevation={6} sx={{ p: 5, borderRadius: 5, bgcolor: 'background.paper', mb: 3, textAlign: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        {editMode ? (
          <>
            <TextField
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              size="small"
              sx={{ flexGrow: 1, ml: 1 }}
            />
            <IconButton
              color="primary"
              onClick={() => {
                onRename(id, editedName)
                setEditMode(false)
              }}
            >
              <SaveIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                setEditMode(false)
                setEditedName(name)
              }}
            >
              <CloseIcon />
            </IconButton>
          </>
        ) : (
          <>
            <Typography variant="h3" fontWeight={700} color="primary.main">
              {name}
            </Typography>
            <Box>
              <IconButton onClick={() => setEditMode(true)} sx={{ mr: 1 }}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => onDelete(id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </>
        )}
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary" mb={1} margin={2}>
          {progress.toFixed(0)}%
        </Typography>
        <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 5, mb: 2, marginBottom: 2 }} />
        <Typography variant="body2" color="text.secondary" mb={1}>
          הוגדר ב: {startDate.toLocaleString('he-IL')}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          עברו: {timePassed.days} ימים {timePassed.hours} שעות {timePassed.minutes} דקות {timePassed.seconds} שניות
        </Typography>

        <Typography variant="h5" color="secondary.main" fontWeight={600} mb={2}>
          נותרו:
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Paper elevation={2} sx={{ p: 2, borderRadius: 3, minWidth: 70, bgcolor: 'primary' }}>
              <Typography variant="h4" color="primary.main" fontWeight={700}>{timeLeft.days}</Typography>
              <Typography color="secondary.main">ימים</Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Paper elevation={2} sx={{ p: 2, borderRadius: 3, minWidth: 70, bgcolor: 'primary' }}>
              <Typography variant="h4" color="primary.main" fontWeight={700}>{timeLeft.hours}</Typography>
              <Typography color="secondary.main">שעות</Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Paper elevation={2} sx={{ p: 2, borderRadius: 3, minWidth: 70, bgcolor: 'primary' }}>
              <Typography variant="h4" color="primary.main" fontWeight={700}>{timeLeft.minutes}</Typography>
              <Typography color="secondary.main">דקות</Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Paper elevation={2} sx={{ p: 2, borderRadius: 3, minWidth: 70, bgcolor: 'primary' }}>
              <Typography variant="h4" color="primary.main" fontWeight={700}>{timeLeft.seconds}</Typography>
              <Typography color="secondary.main">שניות</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default Timer

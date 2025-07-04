import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import heLocale from 'date-fns/locale/he'
import Timer from './Timer.jsx'

function App() {
  const [timers, setTimers] = useState([])
  const [newName, setNewName] = useState('')
  const [newTarget, setNewTarget] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('timers')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        const restored = parsed.map((t) => ({ ...t, targetDate: new Date(t.targetDate), startDate: new Date(t.startDate) }))
        setTimers(restored)
      } catch {
        // ignore parse errors
      }
    }
  }, [])

  useEffect(() => {
    const toStore = timers.map((t) => ({ ...t, targetDate: t.targetDate.toISOString(), startDate: t.startDate.toISOString() }))
    localStorage.setItem('timers', JSON.stringify(toStore))
  }, [timers])

  const handleAdd = () => {
    if (!newName || !newTarget) return
    const now = new Date()
    setTimers([...timers, { id: Date.now(), name: newName, targetDate: newTarget, startDate: now }])
    setNewName('')
    setNewTarget(null)
  }

  const handleDelete = (id) => {
    setTimers(timers.filter((t) => t.id !== id))
  }

  const handleRename = (id, name) => {
    setTimers(timers.map((t) => (t.id === id ? { ...t, name } : t)))
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'linear-gradient(135deg, #e0f7fa 0%, #fff 100%)', p: 2 }}>
      <Container maxWidth="sm">
        <Box sx={{ p: 5, mb: 4, borderRadius: 5, bgcolor: 'background.paper', textAlign: 'center' }}>
          <Typography variant="h4" fontWeight={700} color="primary.main" mb={3}>
            הוסף טיימר חדש
          </Typography>
          <TextField label="שם הטיימר" value={newName} onChange={(e) => setNewName(e.target.value)} fullWidth sx={{ mb: 2 }} />
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={heLocale}>
            <DateTimePicker
              value={newTarget}
              onChange={(value) => setNewTarget(value)}
              renderInput={(params) => <TextField {...params} sx={{ mb: 2, width: '100%' }} />}
              ampm={false}
            />
          </LocalizationProvider>
          <Button variant="contained" onClick={handleAdd} sx={{ mt: 2, margin: 2 }} disabled={!newName || !newTarget}>
            הוסף
          </Button>
        </Box>
        {timers.map((t) => (
          <Timer
            key={t.id}
            id={t.id}
            name={t.name}
            targetDate={t.targetDate}
            startDate={t.startDate}
            onDelete={handleDelete}
            onRename={handleRename}
          />
        ))}
      </Container>
    </Box>
  )
}

export default App

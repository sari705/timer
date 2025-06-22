import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import './index.css'
import App from './App.jsx'

const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#2b4a6f',
      light: '#e0eafc',
    },
    secondary: {
      main: '#22334a',
    },
    background: {
      paper: '#fff',
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)

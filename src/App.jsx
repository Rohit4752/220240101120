import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material'
import Home from './pages/Home'
import Stats from './pages/Stats'
import Terms from './pages/Terms'
import Deliverables from './pages/Deliverables'
import RedirectHandler from './pages/RedirectHandler'

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            URL Shortener
          </Typography>
          <Button color="inherit" component={Link} to="/">Shorten</Button>
          <Button color="inherit" component={Link} to="/stats">Statistics</Button>
          <Button color="inherit" component={Link} to="/terms">Terms</Button>
          <Button color="inherit" component={Link} to="/deliverables">Deliverables</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/deliverables" element={<Deliverables />} />
          <Route path="/:code" element={<RedirectHandler />} />
        </Routes>
      </Container>
    </>
  )
}

export default App

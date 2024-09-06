import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import GemstoneList from './components/GemstoneList';
import AddGemstone from './components/AddGemstone';
import GemstoneDetails from './components/GemstoneDetails';

const App: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GemScape
          </Typography>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '20px' }}>
            Home
          </Link>
          <Link to="/add" style={{ color: 'white', textDecoration: 'none' }}>
            Add Gemstone
          </Link>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<GemstoneList />} />
          <Route path="/add" element={<AddGemstone />} />
          <Route path="/gemstone/:id" element={<GemstoneDetails />} />
        </Routes>
      </Container>
    </Box>
  );
};

export default App;

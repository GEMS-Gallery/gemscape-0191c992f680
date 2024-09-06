import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import { backend } from '../../declarations/backend';

const AddGemstone: React.FC = () => {
  const [name, setName] = useState('');
  const [gemType, setGemType] = useState('');
  const [color, setColor] = useState('');
  const [rarity, setRarity] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await backend.addGemstone(name, gemType, color, BigInt(rarity));
      if ('ok' in result) {
        navigate('/');
      } else {
        console.error('Error adding gemstone:', result.err);
      }
    } catch (error) {
      console.error('Error adding gemstone:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add New Gemstone
      </Typography>
      <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Type"
        value={gemType}
        onChange={(e) => setGemType(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Rarity (1-10)"
        type="number"
        value={rarity}
        onChange={(e) => setRarity(e.target.value)}
        inputProps={{ min: 1, max: 10 }}
        margin="normal"
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Add Gemstone'}
      </Button>
    </Box>
  );
};

export default AddGemstone;

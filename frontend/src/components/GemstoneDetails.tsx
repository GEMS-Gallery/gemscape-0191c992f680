import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Rating, CircularProgress } from '@mui/material';
import { backend } from '../../declarations/backend';

interface Gemstone {
  id: bigint;
  name: string;
  gemType: string;
  color: string;
  rarity: bigint;
  rating: number;
}

const GemstoneDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [gemstone, setGemstone] = useState<Gemstone | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchGemstone = async () => {
      try {
        if (id) {
          const result = await backend.getGemstone(BigInt(id));
          if (result.length > 0) {
            setGemstone(result[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching gemstone:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGemstone();
  }, [id]);

  const handleRating = async (newValue: number | null) => {
    if (newValue !== null && id) {
      try {
        await backend.rateGemstone(BigInt(id), newValue);
        setUserRating(newValue);
        // Optionally, you can fetch the updated gemstone data here
      } catch (error) {
        console.error('Error rating gemstone:', error);
      }
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!gemstone) {
    return <Typography>Gemstone not found</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {gemstone.name}
      </Typography>
      <Typography variant="body1">Type: {gemstone.gemType}</Typography>
      <Typography variant="body1">Color: {gemstone.color}</Typography>
      <Typography variant="body1">Rarity: {Number(gemstone.rarity)}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <Typography variant="body1" sx={{ mr: 1 }}>
          Rating:
        </Typography>
        <Rating
          value={userRating !== null ? userRating : gemstone.rating}
          onChange={(event, newValue) => handleRating(newValue)}
          precision={0.5}
        />
      </Box>
    </Box>
  );
};

export default GemstoneDetails;

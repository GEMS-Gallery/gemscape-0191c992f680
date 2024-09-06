import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Rating, CircularProgress } from '@mui/material';
import { backend } from '../../declarations/backend';

interface Gemstone {
  id: bigint;
  name: string;
  gemType: string;
  color: string;
  rarity: bigint;
  rating: number;
}

const GemstoneList: React.FC = () => {
  const [gemstones, setGemstones] = useState<Gemstone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGemstones = async () => {
      try {
        const result = await backend.getAllGemstones();
        setGemstones(result);
      } catch (error) {
        console.error('Error fetching gemstones:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGemstones();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={3}>
      {gemstones.map((gemstone) => (
        <Grid item xs={12} sm={6} md={4} key={Number(gemstone.id)}>
          <Card className="gemstone-card">
            <CardContent>
              <Typography variant="h5" component="div">
                {gemstone.name}
              </Typography>
              <Typography color="text.secondary">
                Type: {gemstone.gemType}
              </Typography>
              <Typography color="text.secondary">
                Color: {gemstone.color}
              </Typography>
              <Typography color="text.secondary">
                Rarity: {Number(gemstone.rarity)}
              </Typography>
              <Rating value={gemstone.rating} readOnly precision={0.5} />
              <Link to={`/gemstone/${gemstone.id}`}>View Details</Link>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default GemstoneList;

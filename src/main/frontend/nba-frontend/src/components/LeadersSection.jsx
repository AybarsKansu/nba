import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Box, Avatar, CircularProgress } from '@mui/material';
import { getPointsLeaders, getReboundsLeaders, getAssistsLeaders } from '../services/api';

const LeaderCard = ({ title, leaders, valueKey, loading }) => (
  <Paper sx={{ p: 2, height: '100%' }}>
    <Typography variant="h6" color="primary" gutterBottom>
      {title}
    </Typography>
    {loading ? (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <CircularProgress size={24} />
      </Box>
    ) : (
      <Box>
        {leaders.map((player, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1.5, pb: 1, borderBottom: index < leaders.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
            <Typography variant="h5" sx={{ width: 30, color: 'text.secondary', fontWeight: 'bold' }}>
              {index + 1}
            </Typography>
            <Box sx={{ flexGrow: 1, ml: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                {player.playerName} {player.playerSurname}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {player.season}
              </Typography>
            </Box>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
              {player[valueKey]}
            </Typography>
          </Box>
        ))}
        {leaders.length === 0 && <Typography variant="body2">No data available</Typography>}
      </Box>
    )}
  </Paper>
);

const LeadersSection = ({ seasonId }) => {
  const [pointsLeaders, setPointsLeaders] = useState([]);
  const [reboundsLeaders, setReboundsLeaders] = useState([]);
  const [assistsLeaders, setAssistsLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!seasonId) return;

    const fetchLeaders = async () => {
      setLoading(true);
      try {
        const [points, rebounds, assists] = await Promise.all([
          getPointsLeaders(seasonId, 5),
          getReboundsLeaders(seasonId, 5),
          getAssistsLeaders(seasonId, 5)
        ]);
        setPointsLeaders(points);
        setReboundsLeaders(rebounds);
        setAssistsLeaders(assists);
      } catch (error) {
        console.error("Failed to fetch leaders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaders();
  }, [seasonId]);

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} md={4}>
        <LeaderCard title="Points Leaders" leaders={pointsLeaders} valueKey="avgPoints" loading={loading} />
      </Grid>
      <Grid item xs={12} md={4}>
        <LeaderCard title="Rebounds Leaders" leaders={reboundsLeaders} valueKey="avgRebounds" loading={loading} />
      </Grid>
      <Grid item xs={12} md={4}>
        <LeaderCard title="Assists Leaders" leaders={assistsLeaders} valueKey="avgAssists" loading={loading} />
      </Grid>
    </Grid>
  );
};

export default LeadersSection;

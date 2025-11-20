import React, { useEffect, useState } from 'react';
import { 
  Container, Grid, Paper, Typography, Box, Card, CardContent, CircularProgress, Alert 
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getStandings, getRecentGames } from '../services/api';

const Dashboard = () => {
  const [standings, setStandings] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [standingsData, gamesData] = await Promise.all([
          getStandings(),
          getRecentGames()
        ]);
        setStandings(standingsData);
        setGames(gamesData);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: 'teamName', headerName: 'Team', width: 200 },
    { field: 'wins', headerName: 'W', type: 'number', width: 90 },
    { field: 'losses', headerName: 'L', type: 'number', width: 90 },
    { field: 'winPct', headerName: 'Pct', type: 'number', width: 90, valueFormatter: (params) => `${(params.value * 100).toFixed(1)}%` },
  ];

  // Add unique ID for DataGrid if not present in data
  const rows = standings.map((team, index) => ({ id: team.teamId || index, ...team }));

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Recent Games Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Recent Games
            </Typography>
            <Grid container spacing={2}>
              {games.map((game) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={game.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" component="div" align="center">
                        {game.date}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                        <Typography variant="h6">{game.homeTeam}</Typography>
                        <Typography variant="h6">{game.homeScore}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" color="text.secondary">{game.awayTeam}</Typography>
                        <Typography variant="h6" color="text.secondary">{game.awayScore}</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              {games.length === 0 && (
                <Typography variant="body1" sx={{ p: 2 }}>No recent games found.</Typography>
              )}
            </Grid>
          </Paper>
        </Grid>

        {/* Standings Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Standings
            </Typography>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
              />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;

import React, { useEffect, useState } from 'react';
import {
  Container, Grid, Typography, Box, Card, CardContent, CardActions, Button, CircularProgress, Alert, IconButton
} from '@mui/material';
import { Link } from 'react-router-dom';
import { getAllTeams, addFavoriteTeam, removeFavoriteTeam, getMyProfile } from '../services/api';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useAuth } from '../context/AuthContext';

import { getTeamLogo } from '../utils/logoMapper';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsData = await getAllTeams();
        setTeams(teamsData);
      } catch (err) {
        setError('Failed to load teams');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

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

  // Group teams by division
  const teamsByDivision = teams.reduce((acc, team) => {
    const division = team.divisionName || 'Other';
    if (!acc[division]) acc[division] = [];
    acc[division].push(team);
    return acc;
  }, {});

  // Define conference structure
  const conferences = {
    East: ['Atlantic', 'Central', 'Southeast'],
    West: ['Northwest', 'Pacific', 'Southwest']
  };

  const renderDivision = (divisionName) => {
    const divisionTeams = teamsByDivision[divisionName] || [];
    return (
      <Box key={divisionName} sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', textTransform: 'uppercase', color: '#444', borderBottom: '1px solid #ddd', pb: 1, mb: 2 }}>
          {divisionName}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {divisionTeams.map((team) => (
            <Link key={team.id} to={`/teams/${team.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1,
                borderRadius: 1,
                transition: 'background-color 0.2s',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.04)', cursor: 'pointer' }
              }}>
                <img
                  src={getTeamLogo(team.abbreviation)}
                  alt={team.name}
                  style={{ width: 30, height: 30, objectFit: 'contain', marginRight: 12 }}
                  onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
                />
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                  {team.name}
                </Typography>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" color="primary" sx={{ mb: 4, fontWeight: 'bold' }}>
        Teams
      </Typography>

      <Grid container spacing={6}>
        {/* Eastern Conference */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: '900', color: '#1d428a', textTransform: 'uppercase' }}>
            Eastern Conference
          </Typography>
          {conferences.East.map(division => renderDivision(division))}
        </Grid>

        {/* Western Conference */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: '900', color: '#c8102e', textTransform: 'uppercase' }}>
            Western Conference
          </Typography>
          {conferences.West.map(division => renderDivision(division))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Teams;

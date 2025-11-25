import React, { useEffect, useState } from 'react';
import {
  Container, Grid, Paper, Typography, Box, Card, CardContent, CardActions, Button, CircularProgress, Alert,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { Link } from 'react-router-dom';
import { getAllTeams, createTeam, getAllDivisions } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [openAdd, setOpenAdd] = useState(false);
  const [newTeam, setNewTeam] = useState({ name: '', city: '', abbreviation: '', division: '' });
  const [divisions, setDivisions] = useState([]);

  useEffect(() => {
    getAllDivisions().then(setDivisions).catch(console.error);
  }, []);

  const handleAddTeam = async () => {
    try {
      const teamToSend = {
        ...newTeam,
        division: { id: newTeam.division }
      };
      await createTeam(teamToSend);
      setOpenAdd(false);
      setNewTeam({ name: '', city: '', abbreviation: '', division: '' });
      const data = await getAllTeams();
      setTeams(data);
    } catch (e) {
      console.error(e);
      alert('Failed to add team');
    }
  };

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await getAllTeams();
        setTeams(data);
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

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" color="primary">
          Teams
        </Typography>
        {user?.role === 'ADMIN' && (
          <Button variant="contained" onClick={() => setOpenAdd(true)}>
            Add Team
          </Button>
        )}
      </Box>

      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add New Team</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1, minWidth: 300 }}>
            <TextField label="Name" value={newTeam.name} onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })} fullWidth />
            <TextField label="City" value={newTeam.city} onChange={(e) => setNewTeam({ ...newTeam, city: e.target.value })} fullWidth />
            <TextField label="Abbreviation" value={newTeam.abbreviation} onChange={(e) => setNewTeam({ ...newTeam, abbreviation: e.target.value })} fullWidth />
            <FormControl fullWidth>
              <InputLabel id="division-label">Division</InputLabel>
              <Select
                labelId="division-label"
                value={newTeam.division}
                label="Division"
                onChange={(e) => setNewTeam({ ...newTeam, division: e.target.value })}
              >
                {divisions.map((div) => (
                  <MenuItem key={div.id} value={div.id}>{div.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
          <Button onClick={handleAddTeam} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
      <Grid container spacing={3}>
        {teams.map((team) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={team.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {team.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {team.city}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Abbreviation: {team.abbreviation}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/teams/${team.id}`}>View Details</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Teams;

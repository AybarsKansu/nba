import React, { useEffect, useState } from 'react';
import {
  Container, Grid, Typography, Box, Card, CardContent, CardActions, Button, CircularProgress, Alert, TextField, IconButton
} from '@mui/material';
import { Link } from 'react-router-dom';
import { getAllPlayers, addFavoritePlayer, removeFavoritePlayer, getMyProfile } from '../services/api';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useAuth } from '../context/AuthContext';

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState(new Set());
  const { user } = useAuth();

  // Verileri çekme (Fetch) işlemi
  useEffect(() => {
    const fetchPlayersAndFavorites = async () => {
      try {
        const [playersData, profileData] = await Promise.all([
          getAllPlayers(),
          user ? getMyProfile().catch(() => null) : Promise.resolve(null)
        ]);
        setPlayers(playersData);

        if (profileData && profileData.favoritePlayers) {
          const favIds = new Set(profileData.favoritePlayers.map(f => f.playerId));
          setFavorites(favIds);
        }
      } catch (err) {
        setError('Failed to load data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayersAndFavorites();
  }, [user]);

  // Arama filtresi
  const filteredPlayers = players.filter(player =>
    player.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (player.playerSurname && player.playerSurname.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleToggleFavorite = async (playerId) => {
    if (!user) return; // Kullanıcı giriş yapmamışsa işlem yapma

    try {
      if (favorites.has(playerId)) {
        await removeFavoritePlayer(playerId);
        setFavorites(prev => {
          const newFavs = new Set(prev);
          newFavs.delete(playerId);
          return newFavs;
        });
      } else {
        await addFavoritePlayer(playerId);
        setFavorites(prev => {
          const newFavs = new Set(prev);
          newFavs.add(playerId);
          return newFavs;
        });
      }
    } catch (err) {
      console.error("Failed to toggle favorite", err);
    }
  };

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
          Players
        </Typography>
        <TextField
          label="Search Players"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 300 }}
        />
      </Box>

      {/* Grid ve Kartlar (Liste) */}
      <Grid container spacing={3}>
        {filteredPlayers.map((player) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={player.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2, transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
              {/* Player Image */}
              <Box sx={{ height: 200, overflow: 'hidden', bgcolor: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', pt: 2 }}>
                <img
                  src={`/nba_players/${player.playerName}_${player.playerSurname}.png`}
                  alt={`${player.playerName} ${player.playerSurname}`}
                  style={{ height: '100%', objectFit: 'contain' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMjAwIDIwMCI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNlZWVlZWUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM5OTk5OTkiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                  }}
                />
              </Box>

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                  {player.playerName} {player.playerSurname}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {player.teamName || 'NBA Team'}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  <Typography variant="caption" sx={{ bgcolor: '#e3f2fd', color: '#1976d2', px: 1, py: 0.5, borderRadius: 1, fontWeight: 'bold' }}>
                    {player.position || 'POS'}
                  </Typography>
                  <Typography variant="caption" sx={{ bgcolor: '#f5f5f5', color: '#666', px: 1, py: 0.5, borderRadius: 1, fontWeight: 'bold' }}>
                    #{player.jerseyNumber || '00'}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Button size="small" variant="contained" component={Link} to={`/players/${player.id}`}>View Profile</Button>
                {user && (
                  <IconButton onClick={() => handleToggleFavorite(player.id)} color="secondary" size="small">
                    {favorites.has(player.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                )}
              </CardActions>
            </Card></Grid>
        ))}
        {filteredPlayers.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ p: 2 }}>No players found matching "{searchTerm}".</Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Players;
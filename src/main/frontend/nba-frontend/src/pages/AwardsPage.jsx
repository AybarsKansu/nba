import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAwardWinners } from '../services/api';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const AwardsPage = () => {
  const { type } = useParams();
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWinners = async () => {
      setLoading(true);
      try {
        const data = await getAwardWinners(type);
        setWinners(data);
      } catch (error) {
        console.error("Error fetching award winners:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWinners();
  }, [type]);

  const getTitle = () => {
    switch (type) {
      case 'MVP': return 'MVP Winners';
      case 'DPOY': return 'Defensive Player of the Year Winners';
      case 'FMVP': return 'Finals MVP Winners';
      default: return `${type} Winners`;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1a202c' }}>
        {getTitle()}
      </Typography>

      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: '#64748b' }}>Season</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#64748b' }}>Player</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={2} align="center" sx={{ py: 4 }}>Loading...</TableCell>
              </TableRow>
            ) : winners.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} align="center" sx={{ py: 4 }}>No winners found for this award.</TableCell>
              </TableRow>
            ) : (
              winners.map((winner, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontWeight: 'bold' }}>{winner.seasonName}</TableCell>
                  <TableCell>{winner.playerName} {winner.playerSurname}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AwardsPage;

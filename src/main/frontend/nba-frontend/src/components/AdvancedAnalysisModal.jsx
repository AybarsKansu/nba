import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  FormControl, InputLabel, Select, MenuItem, Box, CircularProgress, Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  getSeasonStats, getTripleDoubles, getConsistency, getEfficiency, getShootingEfficiency
} from '../services/api';

const ANALYSIS_TYPES = [
  { id: 'seasonStats', label: 'Season Stats (Sorted by Points)' },
  { id: 'tripleDoubles', label: 'Triple Double Players' },
  { id: 'consistency', label: 'Most Consistent Players' },
  { id: 'efficiency', label: 'Player Efficiency Rating' },
  { id: 'shootingEfficiency', label: 'Shooting Efficiency Analysis' },
];

const AdvancedAnalysisModal = ({ open, onClose, seasonId }) => {
  const [analysisType, setAnalysisType] = useState('seasonStats');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && seasonId) {
      fetchData();
    }
  }, [open, seasonId, analysisType]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let result = [];
      switch (analysisType) {
        case 'seasonStats':
          result = await getSeasonStats();
          break;
        case 'tripleDoubles':
          result = await getTripleDoubles(seasonId);
          break;
        case 'consistency':
          result = await getConsistency(seasonId);
          break;
        case 'efficiency':
          result = await getEfficiency(seasonId);
          break;
        case 'shootingEfficiency':
          result = await getShootingEfficiency(seasonId);
          break;
        default:
          break;
      }
      setData(result);
    } catch (error) {
      console.error("Failed to fetch analysis data", error);
    } finally {
      setLoading(false);
    }
  };

  const getColumns = () => {
    const common = [
      { field: 'playerName', headerName: 'Name', width: 130 },
      { field: 'playerSurname', headerName: 'Surname', width: 130 },
    ];

    switch (analysisType) {
      case 'seasonStats':
        return [
          ...common,
          { field: 'season', headerName: 'Season', width: 100 },
          { field: 'gamesPlayed', headerName: 'GP', type: 'number', width: 70 },
          { field: 'avgPoints', headerName: 'PPG', type: 'number', width: 90 },
          { field: 'avgRebounds', headerName: 'RPG', type: 'number', width: 90 },
          { field: 'avgAssists', headerName: 'APG', type: 'number', width: 90 },
          { field: 'fgPercentage', headerName: 'FG%', type: 'number', width: 90 },
          { field: 'maxPoints', headerName: 'Max Pts', type: 'number', width: 90 },
        ];
      case 'tripleDoubles':
        return [
          ...common,
          { field: 'date', headerName: 'Date', width: 110 },
          { field: 'teamName', headerName: 'Team', width: 150 },
          { field: 'points', headerName: 'Pts', type: 'number', width: 80 },
          { field: 'rebounds', headerName: 'Reb', type: 'number', width: 80 },
          { field: 'assists', headerName: 'Ast', type: 'number', width: 80 },
        ];
      case 'consistency':
        return [
          ...common,
          { field: 'avgPoints', headerName: 'Avg Pts', type: 'number', width: 100 },
          { field: 'pointsStddev', headerName: 'Std Dev', type: 'number', width: 100 },
          { field: 'gamesPlayed', headerName: 'GP', type: 'number', width: 80 },
          { field: 'consistencyScore', headerName: 'Score', type: 'number', width: 100 },
        ];
      case 'efficiency':
        return [
          ...common,
          { field: 'efficiency', headerName: 'EFF', type: 'number', width: 100 },
          { field: 'games', headerName: 'GP', type: 'number', width: 80 },
          { field: 'ppg', headerName: 'PPG', type: 'number', width: 90 },
          { field: 'rpg', headerName: 'RPG', type: 'number', width: 90 },
          { field: 'apg', headerName: 'APG', type: 'number', width: 90 },
        ];
      case 'shootingEfficiency':
        return [
          ...common,
          { field: 'totalFgm', headerName: 'FGM', type: 'number', width: 80 },
          { field: 'totalFga', headerName: 'FGA', type: 'number', width: 80 },
          { field: 'fgPct', headerName: 'FG%', type: 'number', width: 90 },
          { field: 'total3pm', headerName: '3PM', type: 'number', width: 80 },
          { field: 'total3pa', headerName: '3PA', type: 'number', width: 80 },
          { field: 'threePct', headerName: '3P%', type: 'number', width: 90 },
          { field: 'tsPct', headerName: 'TS%', type: 'number', width: 90 },
        ];
      default:
        return [];
    }
  };

  const rows = data.map((row, index) => ({ id: index, ...row }));

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Advanced Analysis</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3, mt: 1 }}>
          <FormControl fullWidth>
            <InputLabel>Analysis Type</InputLabel>
            <Select
              value={analysisType}
              label="Analysis Type"
              onChange={(e) => setAnalysisType(e.target.value)}
            >
              {ANALYSIS_TYPES.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <div style={{ height: 500, width: '100%' }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress />
            </Box>
          ) : (
            <DataGrid
              rows={rows}
              columns={getColumns()}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              disableSelectionOnClick
            />
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdvancedAnalysisModal;

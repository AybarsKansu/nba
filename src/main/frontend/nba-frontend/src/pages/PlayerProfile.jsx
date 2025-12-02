import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPlayerById, getPlayerStats, getGameLog, getAllSeasons, getPlayerAwards } from '../services/api';
import { Box, Typography, Grid, Paper } from '@mui/material';

const PlayerProfile = () => {
    const { id } = useParams();
    const [player, setPlayer] = useState(null);
    const [stats, setStats] = useState(null);
    const [gameLog, setGameLog] = useState([]);
    const [loading, setLoading] = useState(true);
    const [seasons, setSeasons] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [awards, setAwards] = useState([]);

    useEffect(() => {
        const fetchSeasons = async () => {
            try {
                const data = await getAllSeasons();
                setSeasons(data);
                if (data.length > 0) {
                    const latest = data.reduce((prev, curr) => prev.id > curr.id ? prev : curr);
                    setSelectedSeason(latest.id);
                }
            } catch (error) {
                console.error("Error fetching seasons:", error);
            }
        };
        fetchSeasons();
    }, []);

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const playerRes = await getPlayerById(id);
                setPlayer(playerRes);

                // Fetch awards
                try {
                    const awardsRes = await getPlayerAwards(id);
                    setAwards(awardsRes);
                } catch (e) {
                    console.warn("Awards fetch failed", e);
                }
            } catch (error) {
                console.error("Error fetching player:", error);
                setPlayer(null);
            } finally {
                setLoading(false);
            }
        };
        fetchPlayer();
    }, [id]);

    useEffect(() => {
        if (!selectedSeason) return;

        const fetchStats = async () => {
            try {
                try {
                    const statsRes = await getPlayerStats(id, selectedSeason);
                    setStats(statsRes);
                } catch (e) {
                    console.warn("Stats not found for season", selectedSeason);
                    setStats(null);
                }

                try {
                    const logRes = await getGameLog(id, selectedSeason);
                    setGameLog(logRes);
                } catch (e) {
                    console.warn("Game log not found for season", selectedSeason);
                    setGameLog([]);
                }
            } catch (error) {
                console.error("Error fetching player stats:", error);
            }
        };
        fetchStats();
    }, [id, selectedSeason]);

    if (loading) return (
        <div className="flex justify-center items-center h-screen text-slate-500">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    if (!player) return <div className="text-center p-10 text-slate-500">Player not found</div>;

    return (
        <div className="container mx-auto p-6 space-y-8 font-sans text-slate-800">
            {/* Back Button */}
            <div className="mb-4">
                <a href="/players" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center transition-colors">
                    <span className="mr-1">←</span> Back to Players
                </a>
            </div>

            {/* 1. Profile Card & Stats Bar */}
            <Box sx={{ mb: 4 }}>
                <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        p: { xs: 3, md: 4 },
                        gap: 4
                    }}>
                        {/* Player Image - Left */}
                        <Box sx={{
                            flexShrink: 0,
                            width: '100%',
                            maxWidth: '200px',
                            mx: { xs: 'auto', md: 0 } // Center on mobile
                        }}>
                            <Box sx={{ position: 'relative' }}>
                                <img
                                    src={`/nba_players/${player.playerName}_${player.playerSurname}.png`}
                                    alt={`${player.playerName} ${player.playerSurname}`}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        objectFit: 'contain',
                                        borderRadius: '8px',
                                        border: '2px solid #f1f5f9'
                                    }}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMjAwIDIwMCI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNlZWVlZWUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM5OTk5OTkiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                                    }}
                                />
                            </Box>
                        </Box>

                        {/* Player Info - Right */}
                        <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
                            {/* Name */}
                            <Typography variant="h3" component="h1" sx={{ fontWeight: 900, mb: 2, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '-0.025em' }}>
                                {player.playerName} <span style={{ color: '#2563eb' }}>{player.playerSurname}</span>
                            </Typography>

                            {/* Info Grid */}
                            <Grid container spacing={2}>
                                {/* Team */}
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', display: 'block', mb: 0.5 }}>Team</Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#334155' }}>{player.teamName || 'NBA Team'}</Typography>
                                </Grid>

                                {/* Position */}
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', display: 'block', mb: 0.5 }}>Position</Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#334155' }}>{player.position || 'N/A'}</Typography>
                                </Grid>

                                {/* Number */}
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', display: 'block', mb: 0.5 }}>Number</Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#334155' }}>#{player.jerseyNumber || '00'}</Typography>
                                </Grid>

                                {/* Height */}
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', display: 'block', mb: 0.5 }}>Height</Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#334155' }}>{player.height ? `${player.height} cm` : 'N/A'}</Typography>
                                </Grid>


                                {/* Weight */}
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', display: 'block', mb: 0.5 }}>Weight</Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#334155' }}>{player.weight ? `${player.weight} kg` : 'N/A'}</Typography>
                                </Grid>

                                {/* Country */}
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', display: 'block', mb: 0.5 }}>Country</Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#334155' }}>{player.nationality || 'N/A'}</Typography>
                                </Grid>

                                {/* Draft Year */}
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', display: 'block', mb: 0.5 }}>Draft Year</Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#334155' }}>{player.draftYear || 'Undrafted'}</Typography>
                                </Grid>

                                {/* Birth Date */}
                                {player.birthDay && (
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', display: 'block', mb: 0.5 }}>Birth Date</Typography>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#334155' }}>{player.birthDay}</Typography>
                                    </Grid>
                                )}
                            </Grid>
                        </Box>
                    </Box>
                </Paper>
            </Box>

            {/* Stats & Info Bar */}
            <div className="bg-white border-x border-b border-slate-200 rounded-b-2xl shadow-sm">
                <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-200">
                    {/* Left: Key Stats */}
                    <div className="flex justify-around md:justify-start md:space-x-16 px-8 py-6 md:w-5/12 bg-slate-50 rounded-bl-2xl">
                        <div className="text-center">
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">PPG</div>
                            <div className="text-3xl font-black text-slate-800">{stats?.pointsPerGame || '-'}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">RPG</div>
                            <div className="text-3xl font-black text-slate-800">{stats?.reboundsPerGame || '-'}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">APG</div>
                            <div className="text-3xl font-black text-slate-800">{stats?.assistsPerGame || '-'}</div>
                        </div>
                    </div>

                    {/* Right: Bio Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-8 py-6 md:w-7/12">
                        <div>
                            <div className="text-xs font-bold text-slate-400 uppercase mb-1">Height</div>
                            <div className="font-bold text-slate-700">{player.height ? `${player.height} cm` : '-'}</div>
                        </div>
                        <div>
                            <div className="text-xs font-bold text-slate-400 uppercase mb-1">Weight</div>
                            <div className="font-bold text-slate-700">{player.weight ? `${player.weight} kg` : '-'}</div>
                        </div>
                        <div>
                            <div className="text-xs font-bold text-slate-400 uppercase mb-1">Country</div>
                            <div className="font-bold text-slate-700">{player.nationality || '-'}</div>
                        </div>
                        <div>
                            <div className="text-xs font-bold text-slate-400 uppercase mb-1">Draft</div>
                            <div className="font-bold text-slate-700">{player.draftYear || 'Undrafted'}</div>
                        </div>
                        {/* Add more fields if available in the future */}
                    </div>
                </div>
            </div>


            {/* Season Selector */}
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-700">Season Statistics</h3>
                <select
                    value={selectedSeason || ''}
                    onChange={(e) => setSelectedSeason(Number(e.target.value))}
                    className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 min-w-[150px]"
                >
                    {seasons.map(season => (
                        <option key={season.id} value={season.id}>{season.name}</option>
                    ))}
                </select>
            </div>

            {/* 2. Stats Summary (Cards) */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                <StatCard label="GP" value={stats?.gamesPlayed || gameLog.length} />
                <StatCard label="PPG" value={stats?.pointsPerGame} highlight />
                <StatCard label="RPG" value={stats?.reboundsPerGame} />
                <StatCard label="APG" value={stats?.assistsPerGame} />
                <StatCard label="SPG" value={stats?.stealsPerGame} />
                <StatCard label="BPG" value={stats?.blocksPerGame} />
                <StatCard label="FG%" value={stats?.fieldGoalPercentage ? `${(stats.fieldGoalPercentage * 100).toFixed(1)}%` : '-'} />
                <StatCard label="3P%" value={stats?.threePointPercentage ? `${(stats.threePointPercentage * 100).toFixed(1)}%` : '-'} />
            </div>

            {/* Career Awards */}
            {
                awards.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                            <span className="mr-2">🏆</span> Career Awards
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {awards.map((award, index) => (
                                <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 flex items-center space-x-2 shadow-sm">
                                    <span className="font-bold text-yellow-700">{award.seasonName}</span>
                                    <span className="text-yellow-900 font-semibold">| {award.awardType}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }

            {/* 3. Game Log Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800">Game Log</h3>
                    <span className="text-xs font-medium text-slate-500 bg-slate-200 px-2 py-1 rounded">Last {gameLog.length} Games</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200 text-sm">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-5 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Date</th>
                                <th className="px-5 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Opponent</th>
                                <th className="px-5 py-3 text-center font-bold text-slate-500 uppercase tracking-wider">MIN</th>
                                <th className="px-5 py-3 text-center font-bold text-slate-500 uppercase tracking-wider">PTS</th>
                                <th className="px-5 py-3 text-center font-bold text-slate-500 uppercase tracking-wider">REB</th>
                                <th className="px-5 py-3 text-center font-bold text-slate-500 uppercase tracking-wider">AST</th>
                                <th className="px-5 py-3 text-center font-bold text-slate-500 uppercase tracking-wider">STL</th>
                                <th className="px-5 py-3 text-center font-bold text-slate-500 uppercase tracking-wider">BLK</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {gameLog.length > 0 ? gameLog.map((game) => (
                                <tr key={game.id} className="hover:bg-blue-50 transition-colors duration-150">
                                    <td className="px-5 py-4 whitespace-nowrap text-slate-600 font-medium">{game.gameDate}</td>
                                    <td className="px-5 py-4 whitespace-nowrap font-semibold text-slate-800">
                                        vs {game.homeTeamId === game.teamId ? game.awayTeamAbbreviation : game.homeTeamAbbreviation}
                                    </td>
                                    <td className="px-5 py-4 whitespace-nowrap text-center text-slate-600">{game.minutes}</td>
                                    <td className="px-5 py-4 whitespace-nowrap text-center font-bold text-slate-900 bg-slate-50">{game.points}</td>
                                    <td className="px-5 py-4 whitespace-nowrap text-center text-slate-600">{game.rebounds}</td>
                                    <td className="px-5 py-4 whitespace-nowrap text-center text-slate-600">{game.assists}</td>
                                    <td className="px-5 py-4 whitespace-nowrap text-center text-slate-600">{game.steals}</td>
                                    <td className="px-5 py-4 whitespace-nowrap text-center text-slate-600">{game.blocks}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="8" className="px-6 py-10 text-center text-slate-400 italic">
                                        No game data available for this season.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
};

const StatCard = ({ label, value, highlight = false }) => (
    <div className={`bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col items-center justify-center transition-transform hover:-translate-y-1 ${highlight ? 'ring-2 ring-blue-100' : ''}`}>
        <span className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{label}</span>
        <span className={`text-2xl font-black ${highlight ? 'text-blue-600' : 'text-slate-800'}`}>{value !== undefined ? value : '-'}</span>
    </div>
);

export default PlayerProfile;

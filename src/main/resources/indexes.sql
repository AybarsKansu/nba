CREATE INDEX idx_game_team_season_home ON GAME(home_id, season_id);
CREATE INDEX idx_game_team_season_away ON GAME(away_id, season_id);

CREATE INDEX idx_stats_player_season ON STATS(player_id, game_id);

CREATE INDEX idx_stats_points ON STATS(points DESC);

CREATE INDEX idx_team_city ON TEAM(city);

CREATE INDEX idx_player_search ON PLAYER(player_name, player_surname);

CREATE INDEX idx_stats_rebounds ON STATS(rebounds DESC);
CREATE INDEX idx_stats_assists ON STATS(assists DESC);

CREATE INDEX idx_game_date ON GAME(date DESC);
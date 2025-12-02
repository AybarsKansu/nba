package com.nba.nba.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nba.nba.entity.Stats;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface StatsRepository extends JpaRepository<Stats, Integer> {
        @org.springframework.data.jpa.repository.EntityGraph(attributePaths = { "player", "game", "game.homeTeam",
                        "game.awayTeam", "game.season" })
        @Query("SELECT s FROM Stats s JOIN s.game g WHERE s.player.id = :playerId AND g.season.id = :seasonId")
        List<Stats> findByPlayerIdAndSeasonId(Integer playerId, Integer seasonId);

        @org.springframework.data.jpa.repository.EntityGraph(attributePaths = { "player", "game", "game.homeTeam",
                        "game.awayTeam", "game.season", "team" })
        List<Stats> findByGameId(Integer gameId);

        // 1. Season Stats (Sorted by Points)
        @Query(value = "SELECT " +
                        "player_name as playerName, " +
                        "player_surname as playerSurname, " +
                        "season_name AS season, " +
                        "games_played AS gamesPlayed, " +
                        "avg_points AS avgPoints, " +
                        "avg_rebounds AS avgRebounds, " +
                        "avg_assists AS avgAssists, " +
                        "fg_percentage AS fgPercentage, " +
                        "max_points AS maxPoints " +
                        "FROM VIEW_PLAYER_SEASON_STATS " +
                        "ORDER BY season_name DESC, avg_points DESC", nativeQuery = true)
        List<com.nba.nba.dto.AnalysisDTOs.PlayerSeasonStatsProjection> findAllPlayerSeasonStats();

        // 2. Triple Doubles (Updated to include Steals and Blocks)
        @Query(value = "SELECT " +
                        "p.player_name as playerName, " +
                        "p.player_surname as playerSurname, " +
                        "g.date as date, " +
                        "st.points as points, " +
                        "st.rebounds as rebounds, " +
                        "st.assists as assists, " +
                        "st.steals as steals, " +
                        "st.blocks as blocks, " +
                        "t.name as teamName " +
                        "FROM STATS st " +
                        "JOIN PLAYER p ON st.player_id = p.id " +
                        "JOIN GAME g ON st.game_id = g.id " +
                        "JOIN TEAM t ON st.team_id = t.id " +
                        "WHERE g.season_id = :seasonId " +
                        "AND (" +
                        "(CASE WHEN st.points >= 10 THEN 1 ELSE 0 END) + " +
                        "(CASE WHEN st.rebounds >= 10 THEN 1 ELSE 0 END) + " +
                        "(CASE WHEN st.assists >= 10 THEN 1 ELSE 0 END) + " +
                        "(CASE WHEN st.steals >= 10 THEN 1 ELSE 0 END) + " +
                        "(CASE WHEN st.blocks >= 10 THEN 1 ELSE 0 END) " +
                        ") >= 3 " +
                        "ORDER BY g.date DESC", nativeQuery = true)
        List<com.nba.nba.dto.AnalysisDTOs.TripleDoubleProjection> findTripleDoubles(Integer seasonId);

        // Double Doubles
        @Query(value = "SELECT " +
                        "p.player_name as playerName, " +
                        "p.player_surname as playerSurname, " +
                        "g.date as date, " +
                        "st.points as points, " +
                        "st.rebounds as rebounds, " +
                        "st.assists as assists, " +
                        "st.steals as steals, " +
                        "st.blocks as blocks, " +
                        "t.name as teamName " +
                        "FROM STATS st " +
                        "JOIN PLAYER p ON st.player_id = p.id " +
                        "JOIN GAME g ON st.game_id = g.id " +
                        "JOIN TEAM t ON st.team_id = t.id " +
                        "WHERE g.season_id = :seasonId " +
                        "AND (" +
                        "(CASE WHEN st.points >= 10 THEN 1 ELSE 0 END) + " +
                        "(CASE WHEN st.rebounds >= 10 THEN 1 ELSE 0 END) + " +
                        "(CASE WHEN st.assists >= 10 THEN 1 ELSE 0 END) + " +
                        "(CASE WHEN st.steals >= 10 THEN 1 ELSE 0 END) + " +
                        "(CASE WHEN st.blocks >= 10 THEN 1 ELSE 0 END) " +
                        ") >= 2 " +
                        "ORDER BY g.date DESC", nativeQuery = true)
        List<com.nba.nba.dto.AnalysisDTOs.TripleDoubleProjection> findDoubleDoubles(Integer seasonId);

        // Leaders - Blocks
        @Query(value = "SELECT " +
                        "player_name as playerName, " +
                        "player_surname as playerSurname, " +
                        "season_name AS season, " +
                        "games_played AS gamesPlayed, " +
                        "avg_blocks AS avgValue " +
                        "FROM VIEW_PLAYER_SEASON_STATS " +
                        "WHERE season_id = :seasonId " +
                        "ORDER BY avg_blocks DESC " +
                        "LIMIT :limit", nativeQuery = true)
        List<com.nba.nba.dto.AnalysisDTOs.DefensiveLeadersProjection> findBlocksLeaders(Integer seasonId,
                        Integer limit);

        // Leaders - Steals
        @Query(value = "SELECT " +
                        "player_name as playerName, " +
                        "player_surname as playerSurname, " +
                        "season_name AS season, " +
                        "games_played AS gamesPlayed, " +
                        "avg_steals AS avgValue " +
                        "FROM VIEW_PLAYER_SEASON_STATS " +
                        "WHERE season_id = :seasonId " +
                        "ORDER BY avg_steals DESC " +
                        "LIMIT :limit", nativeQuery = true)
        List<com.nba.nba.dto.AnalysisDTOs.DefensiveLeadersProjection> findStealsLeaders(Integer seasonId,
                        Integer limit);

        // Team Season Performance
        @Query(value = "SELECT " +
                        "team_name AS teamName, " +
                        "season_name AS season, " +
                        "games_played AS gamesPlayed, " +
                        "avg_points_scored AS avgPointsScored, " +
                        "avg_points_allowed AS avgPointsAllowed, " +
                        "wins AS wins " +
                        "FROM VIEW_TEAM_SEASON_PERFORMANCE " +
                        "WHERE season_id = :seasonId " +
                        "ORDER BY wins DESC", nativeQuery = true)
        List<com.nba.nba.dto.AnalysisDTOs.TeamSeasonPerformanceProjection> findTeamSeasonPerformance(Integer seasonId);

        // 5. Shooting Efficiency
        @Query(value = "SELECT " +
                        "player_name as playerName, " +
                        "player_surname as playerSurname, " +
                        "total_fgm as totalFgm, " +
                        "total_fga as totalFga, " +
                        "fg_pct as fgPct, " +
                        "total_3pm as total3pm, " +
                        "total_3pa as total3pa, " +
                        "three_pct as threePct, " +
                        "ts_pct as tsPct " +
                        "FROM VIEW_SHOOTING_EFFICIENCY " +
                        "WHERE season_id = :seasonId " +
                        "AND total_fga >= 50 " +
                        "ORDER BY ts_pct DESC", nativeQuery = true)
        List<com.nba.nba.dto.AnalysisDTOs.ShootingEfficiencyProjection> findShootingEfficiency(Integer seasonId);

        // Leaders - Points
        @Query(value = "SELECT " +
                        "player_name as playerName, " +
                        "player_surname as playerSurname, " +
                        "season_name AS season, " +
                        "games_played AS gamesPlayed, " +
                        "avg_points AS avgPoints, " +
                        "avg_rebounds AS avgRebounds, " +
                        "avg_assists AS avgAssists, " +
                        "fg_percentage AS fgPercentage, " +
                        "max_points AS maxPoints " +
                        "FROM VIEW_PLAYER_SEASON_STATS " +
                        "WHERE season_id = :seasonId " +
                        "ORDER BY avg_points DESC " +
                        "LIMIT :limit", nativeQuery = true)
        List<com.nba.nba.dto.AnalysisDTOs.PlayerSeasonStatsProjection> findPointsLeaders(Integer seasonId,
                        Integer limit);

        // Leaders - Rebounds
        @Query(value = "SELECT " +
                        "player_name as playerName, " +
                        "player_surname as playerSurname, " +
                        "season_name AS season, " +
                        "games_played AS gamesPlayed, " +
                        "avg_points AS avgPoints, " +
                        "avg_rebounds AS avgRebounds, " +
                        "avg_assists AS avgAssists, " +
                        "fg_percentage AS fgPercentage, " +
                        "max_points AS maxPoints " +
                        "FROM VIEW_PLAYER_SEASON_STATS " +
                        "WHERE season_id = :seasonId " +
                        "ORDER BY avg_rebounds DESC " +
                        "LIMIT :limit", nativeQuery = true)
        List<com.nba.nba.dto.AnalysisDTOs.PlayerSeasonStatsProjection> findReboundsLeaders(Integer seasonId,
                        Integer limit);

        // Leaders - Assists
        @Query(value = "SELECT " +
                        "player_name as playerName, " +
                        "player_surname as playerSurname, " +
                        "season_name AS season, " +
                        "games_played AS gamesPlayed, " +
                        "avg_points AS avgPoints, " +
                        "avg_rebounds AS avgRebounds, " +
                        "avg_assists AS avgAssists, " +
                        "fg_percentage AS fgPercentage, " +
                        "max_points AS maxPoints " +
                        "FROM VIEW_PLAYER_SEASON_STATS " +
                        "WHERE season_id = :seasonId " +
                        "ORDER BY avg_assists DESC " +
                        "LIMIT :limit", nativeQuery = true)
        List<com.nba.nba.dto.AnalysisDTOs.PlayerSeasonStatsProjection> findAssistsLeaders(Integer seasonId,
                        Integer limit);
}

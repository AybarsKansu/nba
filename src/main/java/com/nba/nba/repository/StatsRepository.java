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
            "p.player_name as playerName, " +
            "p.player_surname as playerSurname, " +
            "s.name AS season, " +
            "COUNT(st.id) AS gamesPlayed, " +
            "ROUND(AVG(st.points), 2) AS avgPoints, " +
            "ROUND(AVG(st.rebounds), 2) AS avgRebounds, " +
            "ROUND(AVG(st.assists), 2) AS avgAssists, " +
            "ROUND(AVG(st.field_goals_made * 100.0 / NULLIF(st.field_goals_attempted, 0)), 2) AS fgPercentage, " +
            "MAX(st.points) AS maxPoints " +
            "FROM PLAYER p " +
            "JOIN STATS st ON p.id = st.player_id " +
            "JOIN GAME g ON st.game_id = g.id " +
            "JOIN SEASON s ON g.season_id = s.id " +
            "GROUP BY p.id, s.id, p.player_name, p.player_surname, s.name " +
            "ORDER BY s.name DESC, avgPoints DESC", nativeQuery = true)
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
            "p.player_name as playerName, " +
            "p.player_surname as playerSurname, " +
            "s.name AS season, " +
            "COUNT(st.id) AS gamesPlayed, " +
            "ROUND(AVG(st.blocks), 2) AS avgValue " +
            "FROM PLAYER p " +
            "JOIN STATS st ON p.id = st.player_id " +
            "JOIN GAME g ON st.game_id = g.id " +
            "JOIN SEASON s ON g.season_id = s.id " +
            "WHERE s.id = :seasonId " +
            "GROUP BY p.id, s.id, p.player_name, p.player_surname, s.name " +
            "ORDER BY avgValue DESC " +
            "LIMIT :limit", nativeQuery = true)
    List<com.nba.nba.dto.AnalysisDTOs.DefensiveLeadersProjection> findBlocksLeaders(Integer seasonId, Integer limit);

    // Leaders - Steals
    @Query(value = "SELECT " +
            "p.player_name as playerName, " +
            "p.player_surname as playerSurname, " +
            "s.name AS season, " +
            "COUNT(st.id) AS gamesPlayed, " +
            "ROUND(AVG(st.steals), 2) AS avgValue " +
            "FROM PLAYER p " +
            "JOIN STATS st ON p.id = st.player_id " +
            "JOIN GAME g ON st.game_id = g.id " +
            "JOIN SEASON s ON g.season_id = s.id " +
            "WHERE s.id = :seasonId " +
            "GROUP BY p.id, s.id, p.player_name, p.player_surname, s.name " +
            "ORDER BY avgValue DESC " +
            "LIMIT :limit", nativeQuery = true)
    List<com.nba.nba.dto.AnalysisDTOs.DefensiveLeadersProjection> findStealsLeaders(Integer seasonId, Integer limit);

    // Team Season Performance
    @Query(value = "SELECT " +
            "t.name AS teamName, " +
            "s.name AS season, " +
            "COUNT(g.id) AS gamesPlayed, " +
            "ROUND(AVG(CASE WHEN g.home_id = t.id THEN g.home_score ELSE g.away_score END), 2) AS avgPointsScored, " +
            "ROUND(AVG(CASE WHEN g.home_id = t.id THEN g.away_score ELSE g.home_score END), 2) AS avgPointsAllowed, " +
            "SUM(CASE WHEN (g.home_id = t.id AND g.home_score > g.away_score) OR (g.away_id = t.id AND g.away_score > g.home_score) THEN 1 ELSE 0 END) AS wins "
            +
            "FROM TEAM t " +
            "JOIN GAME g ON t.id = g.home_id OR t.id = g.away_id " +
            "JOIN SEASON s ON g.season_id = s.id " +
            "WHERE s.id = :seasonId " +
            "GROUP BY t.id, t.name, s.name " +
            "ORDER BY wins DESC", nativeQuery = true)
    List<com.nba.nba.dto.AnalysisDTOs.TeamSeasonPerformanceProjection> findTeamSeasonPerformance(Integer seasonId);

    // 5. Shooting Efficiency
    @Query(value = "SELECT " +
            "p.player_name as playerName, " +
            "p.player_surname as playerSurname, " +
            "SUM(st.field_goals_made) as totalFgm, " +
            "SUM(st.field_goals_attempted) as totalFga, " +
            "ROUND(SUM(st.field_goals_made) * 100.0 / NULLIF(SUM(st.field_goals_attempted), 0), 1) as fgPct, " +
            "SUM(st.three_pointers_made) as total3pm, " +
            "SUM(st.three_pointers_attempted) as total3pa, " +
            "ROUND(SUM(st.three_pointers_made) * 100.0 / NULLIF(SUM(st.three_pointers_attempted), 0), 1) as threePct, "
            +
            "ROUND(SUM(st.points) * 100.0 / NULLIF(2 * (SUM(st.field_goals_attempted) + 0.44 * SUM(st.free_throws_attempted)), 0), 1) as tsPct "
            +
            "FROM STATS st " +
            "JOIN PLAYER p ON st.player_id = p.id " +
            "JOIN GAME g ON st.game_id = g.id " +
            "WHERE g.season_id = :seasonId " +
            "GROUP BY p.id, p.player_name, p.player_surname " +
            "HAVING SUM(st.field_goals_attempted) >= 50 " +
            "ORDER BY tsPct DESC", nativeQuery = true)
    List<com.nba.nba.dto.AnalysisDTOs.ShootingEfficiencyProjection> findShootingEfficiency(Integer seasonId);

    // Leaders - Points
    @Query(value = "SELECT " +
            "p.player_name as playerName, " +
            "p.player_surname as playerSurname, " +
            "s.name AS season, " +
            "COUNT(st.id) AS gamesPlayed, " +
            "ROUND(AVG(st.points), 2) AS avgPoints, " +
            "ROUND(AVG(st.rebounds), 2) AS avgRebounds, " +
            "ROUND(AVG(st.assists), 2) AS avgAssists, " +
            "ROUND(AVG(st.field_goals_made * 100.0 / NULLIF(st.field_goals_attempted, 0)), 2) AS fgPercentage, " +
            "MAX(st.points) AS maxPoints " +
            "FROM PLAYER p " +
            "JOIN STATS st ON p.id = st.player_id " +
            "JOIN GAME g ON st.game_id = g.id " +
            "JOIN SEASON s ON g.season_id = s.id " +
            "WHERE s.id = :seasonId " +
            "GROUP BY p.id, s.id, p.player_name, p.player_surname, s.name " +
            "ORDER BY avgPoints DESC " +
            "LIMIT :limit", nativeQuery = true)
    List<com.nba.nba.dto.AnalysisDTOs.PlayerSeasonStatsProjection> findPointsLeaders(Integer seasonId, Integer limit);

    // Leaders - Rebounds
    @Query(value = "SELECT " +
            "p.player_name as playerName, " +
            "p.player_surname as playerSurname, " +
            "s.name AS season, " +
            "COUNT(st.id) AS gamesPlayed, " +
            "ROUND(AVG(st.points), 2) AS avgPoints, " +
            "ROUND(AVG(st.rebounds), 2) AS avgRebounds, " +
            "ROUND(AVG(st.assists), 2) AS avgAssists, " +
            "ROUND(AVG(st.field_goals_made * 100.0 / NULLIF(st.field_goals_attempted, 0)), 2) AS fgPercentage, " +
            "MAX(st.points) AS maxPoints " +
            "FROM PLAYER p " +
            "JOIN STATS st ON p.id = st.player_id " +
            "JOIN GAME g ON st.game_id = g.id " +
            "JOIN SEASON s ON g.season_id = s.id " +
            "WHERE s.id = :seasonId " +
            "GROUP BY p.id, s.id, p.player_name, p.player_surname, s.name " +
            "ORDER BY avgRebounds DESC " +
            "LIMIT :limit", nativeQuery = true)
    List<com.nba.nba.dto.AnalysisDTOs.PlayerSeasonStatsProjection> findReboundsLeaders(Integer seasonId, Integer limit);

    // Leaders - Assists
    @Query(value = "SELECT " +
            "p.player_name as playerName, " +
            "p.player_surname as playerSurname, " +
            "s.name AS season, " +
            "COUNT(st.id) AS gamesPlayed, " +
            "ROUND(AVG(st.points), 2) AS avgPoints, " +
            "ROUND(AVG(st.rebounds), 2) AS avgRebounds, " +
            "ROUND(AVG(st.assists), 2) AS avgAssists, " +
            "ROUND(AVG(st.field_goals_made * 100.0 / NULLIF(st.field_goals_attempted, 0)), 2) AS fgPercentage, " +
            "MAX(st.points) AS maxPoints " +
            "FROM PLAYER p " +
            "JOIN STATS st ON p.id = st.player_id " +
            "JOIN GAME g ON st.game_id = g.id " +
            "JOIN SEASON s ON g.season_id = s.id " +
            "WHERE s.id = :seasonId " +
            "GROUP BY p.id, s.id, p.player_name, p.player_surname, s.name " +
            "ORDER BY avgAssists DESC " +
            "LIMIT :limit", nativeQuery = true)
    List<com.nba.nba.dto.AnalysisDTOs.PlayerSeasonStatsProjection> findAssistsLeaders(Integer seasonId, Integer limit);
}

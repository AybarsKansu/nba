package com.nba.nba.repository;

import com.nba.nba.entity.SeasonAwards;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SeasonAwardsRepository extends JpaRepository<SeasonAwards, Integer> {
  List<SeasonAwards> findBySeasonId(Integer seasonId);

  List<SeasonAwards> findByPlayerId(Integer playerId);

  @org.springframework.data.jpa.repository.Query("SELECT s.name AS seasonName, sa.awardType AS awardType FROM SeasonAwards sa JOIN sa.season s WHERE sa.player.id = :playerId ORDER BY s.name DESC")
  List<com.nba.nba.dto.AwardsDTOs.PlayerAwardProjection> findPlayerAwards(Integer playerId);

  @org.springframework.data.jpa.repository.Query("SELECT p.playerName AS playerName, p.playerSurname AS playerSurname, s.name AS seasonName FROM SeasonAwards sa JOIN sa.season s JOIN sa.player p WHERE sa.awardType = :awardType ORDER BY s.name DESC")
  List<com.nba.nba.dto.AwardsDTOs.AwardWinnerProjection> findAwardWinners(String awardType);
}

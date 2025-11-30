package com.nba.nba.dto;

import java.time.LocalDate;

public class AnalysisDTOs {

  public interface PlayerSeasonStatsProjection {
    String getPlayerName();

    String getPlayerSurname();

    String getSeason();

    Long getGamesPlayed();

    Double getAvgPoints();

    Double getAvgRebounds();

    Double getAvgAssists();

    Double getFgPercentage();

    Integer getMaxPoints();
  }

  public interface TripleDoubleProjection {
    String getPlayerName();

    String getPlayerSurname();

    LocalDate getDate();

    Integer getPoints();

    Integer getRebounds();

    Integer getAssists();

    Integer getSteals();

    Integer getBlocks();

    String getTeamName();
  }

  public interface ShootingEfficiencyProjection {
    String getPlayerName();

    String getPlayerSurname();

    Long getTotalFgm();

    Long getTotalFga();

    Double getFgPct();

    Long getTotal3pm();

    Long getTotal3pa();

    Double getThreePct();

    Double getTsPct();
  }

  public interface DefensiveLeadersProjection {
    String getPlayerName();

    String getPlayerSurname();

    String getSeason();

    Long getGamesPlayed();

    Double getAvgValue();
  }

  public interface TeamSeasonPerformanceProjection {
    String getTeamName();

    String getSeason();

    Long getGamesPlayed();

    Double getAvgPointsScored();

    Double getAvgPointsAllowed();

    Long getWins();
  }
}

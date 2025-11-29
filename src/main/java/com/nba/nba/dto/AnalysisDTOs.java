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

    String getTeamName();
  }

  public interface ConsistencyProjection {
    String getPlayerName();

    String getPlayerSurname();

    Double getAvgPoints();

    Double getPointsStddev();

    Long getGamesPlayed();

    Double getConsistencyScore();
  }

  public interface EfficiencyProjection {
    String getPlayerName();

    String getPlayerSurname();

    Long getGames();

    Double getEfficiency();

    Double getPpg();

    Double getRpg();

    Double getApg();
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
}

package com.nba.nba.dto;

public class AwardsDTOs {

  public interface PlayerAwardProjection {
    String getSeasonName();

    String getAwardType();
  }

  public interface AwardWinnerProjection {
    String getPlayerName();

    String getPlayerSurname();

    String getSeasonName();
  }
}

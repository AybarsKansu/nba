package com.nba.nba.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class GameDTO {
  private Integer id;
  private LocalDate date;
  private Integer homeScore;
  private Integer awayScore;
  private String gameType;
  private Integer homeTeamId;
  private String homeTeamName;
  private Integer awayTeamId;
  private String awayTeamName;
  private Integer seasonId;
  private String seasonName;
}

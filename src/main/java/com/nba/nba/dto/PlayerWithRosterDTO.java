package com.nba.nba.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlayerWithRosterDTO {
  private Integer id;
  private String playerName;
  private String playerSurname;
  private LocalDate birthDay;
  private Integer height;
  private Integer weight;
  private Integer draftYear;
  private Integer draftOrder;
  private String nationality;

  private String teamName;
  private Byte jerseyNumber;
  private String position;
}

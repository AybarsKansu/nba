package com.nba.nba.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeamDTO {
  private Integer id;
  private String name;
  private String abbreviation;
  private String city;
  private Integer divisionId;
  private String divisionName;
}

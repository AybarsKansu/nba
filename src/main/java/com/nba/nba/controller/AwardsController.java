package com.nba.nba.controller;

import com.nba.nba.dto.AwardsDTOs;
import com.nba.nba.repository.SeasonAwardsRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AwardsController {

  private final SeasonAwardsRepository seasonAwardsRepository;

  public AwardsController(SeasonAwardsRepository seasonAwardsRepository) {
    this.seasonAwardsRepository = seasonAwardsRepository;
  }

  @GetMapping("/players/{id}/awards")
  public ResponseEntity<List<AwardsDTOs.PlayerAwardProjection>> getPlayerAwards(@PathVariable Integer id) {
    return ResponseEntity.ok(seasonAwardsRepository.findPlayerAwards(id));
  }

  @GetMapping("/awards/{type}")
  public ResponseEntity<List<AwardsDTOs.AwardWinnerProjection>> getAwardWinners(@PathVariable String type) {
    return ResponseEntity.ok(seasonAwardsRepository.findAwardWinners(type));
  }
}

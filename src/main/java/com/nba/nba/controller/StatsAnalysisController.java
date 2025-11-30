package com.nba.nba.controller;

import com.nba.nba.dto.AnalysisDTOs.*;
import com.nba.nba.repository.StatsRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analysis")
public class StatsAnalysisController {

  private final StatsRepository statsRepository;

  public StatsAnalysisController(StatsRepository statsRepository) {
    this.statsRepository = statsRepository;
  }

  @GetMapping("/season-stats")
  public ResponseEntity<List<PlayerSeasonStatsProjection>> getSeasonStats() {
    return ResponseEntity.ok(statsRepository.findAllPlayerSeasonStats());
  }

  @GetMapping("/triple-doubles")
  public ResponseEntity<List<TripleDoubleProjection>> getTripleDoubles(@RequestParam Integer seasonId) {
    return ResponseEntity.ok(statsRepository.findTripleDoubles(seasonId));
  }

  @GetMapping("/double-doubles")
  public ResponseEntity<List<TripleDoubleProjection>> getDoubleDoubles(@RequestParam Integer seasonId) {
    return ResponseEntity.ok(statsRepository.findDoubleDoubles(seasonId));
  }

  @GetMapping("/shooting-efficiency")
  public ResponseEntity<List<ShootingEfficiencyProjection>> getShootingEfficiency(@RequestParam Integer seasonId) {
    return ResponseEntity.ok(statsRepository.findShootingEfficiency(seasonId));
  }

  @GetMapping("/leaders/points")
  public ResponseEntity<List<PlayerSeasonStatsProjection>> getPointsLeaders(
      @RequestParam Integer seasonId,
      @RequestParam(defaultValue = "5") Integer limit) {
    return ResponseEntity.ok(statsRepository.findPointsLeaders(seasonId, limit));
  }

  @GetMapping("/leaders/rebounds")
  public ResponseEntity<List<PlayerSeasonStatsProjection>> getReboundsLeaders(
      @RequestParam Integer seasonId,
      @RequestParam(defaultValue = "5") Integer limit) {
    return ResponseEntity.ok(statsRepository.findReboundsLeaders(seasonId, limit));
  }

  @GetMapping("/leaders/assists")
  public ResponseEntity<List<PlayerSeasonStatsProjection>> getAssistsLeaders(
      @RequestParam Integer seasonId,
      @RequestParam(defaultValue = "5") Integer limit) {
    return ResponseEntity.ok(statsRepository.findAssistsLeaders(seasonId, limit));
  }

  @GetMapping("/leaders/blocks")
  public ResponseEntity<List<DefensiveLeadersProjection>> getBlocksLeaders(
      @RequestParam Integer seasonId,
      @RequestParam(defaultValue = "5") Integer limit) {
    return ResponseEntity.ok(statsRepository.findBlocksLeaders(seasonId, limit));
  }

  @GetMapping("/leaders/steals")
  public ResponseEntity<List<DefensiveLeadersProjection>> getStealsLeaders(
      @RequestParam Integer seasonId,
      @RequestParam(defaultValue = "5") Integer limit) {
    return ResponseEntity.ok(statsRepository.findStealsLeaders(seasonId, limit));
  }

  @GetMapping("/team-performance")
  public ResponseEntity<List<TeamSeasonPerformanceProjection>> getTeamSeasonPerformance(
      @RequestParam Integer seasonId) {
    return ResponseEntity.ok(statsRepository.findTeamSeasonPerformance(seasonId));
  }
}

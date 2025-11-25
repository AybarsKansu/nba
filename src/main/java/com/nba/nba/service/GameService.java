package com.nba.nba.service;

import com.nba.nba.dto.StandingsDTO;
import com.nba.nba.config.entity.Game;
import com.nba.nba.config.entity.Team;
import com.nba.nba.repository.GameRepository;
import com.nba.nba.repository.TeamRepository;
import com.nba.nba.repository.SeasonRepository;
import com.nba.nba.repository.StatsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class GameService {

  @Autowired
  private GameRepository gameRepository;

  @Autowired
  private TeamRepository teamRepository;

  @Autowired
  private SeasonRepository seasonRepository;

  @Autowired
  private StatsRepository statsRepository;

  @Autowired
  private com.nba.nba.mapper.GameMapper gameMapper;

  @Autowired
  private com.nba.nba.mapper.SeasonMapper seasonMapper;

  @Autowired
  private com.nba.nba.mapper.StatsMapper statsMapper;

  public List<com.nba.nba.dto.GameDTO> getRecentGames() {
    return gameRepository.findTop10ByOrderByDateDesc().stream()
        .map(gameMapper::toDTO)
        .collect(Collectors.toList());
  }

  public List<StandingsDTO> getStandings(Integer seasonId) {
    List<Game> games = gameRepository.findAll().stream()
        .filter(g -> g.getSeason().getId().equals(seasonId))
        .collect(Collectors.toList());

    Map<Integer, StandingsDTO> standingsMap = new HashMap<>();
    List<Team> teams = teamRepository.findAll();

    for (Team team : teams) {
      StandingsDTO dto = new StandingsDTO();
      dto.setTeamId(team.getId());
      dto.setTeamName(team.getName());
      dto.setTeamAbbreviation(team.getAbbreviation());
      if (team.getDivision() != null && team.getDivision().getConference() != null) {
        dto.setConference(team.getDivision().getConference().getConferenceName());
      }
      dto.setWins(0);
      dto.setLosses(0);
      standingsMap.put(team.getId(), dto);
    }

    for (Game game : games) {
      if (game.getHomeScore() == null || game.getAwayScore() == null)
        continue;

      StandingsDTO homeDto = standingsMap.get(game.getHomeTeam().getId());
      StandingsDTO awayDto = standingsMap.get(game.getAwayTeam().getId());

      if (homeDto == null || awayDto == null)
        continue;

      if (game.getHomeScore() > game.getAwayScore()) {
        homeDto.setWins(homeDto.getWins() + 1);
        awayDto.setLosses(awayDto.getLosses() + 1);
      } else {
        awayDto.setWins(awayDto.getWins() + 1);
        homeDto.setLosses(homeDto.getLosses() + 1);
      }
    }

    return standingsMap.values().stream()
        .peek(dto -> {
          int total = dto.getWins() + dto.getLosses();
          dto.setWinPercentage(total > 0 ? (double) dto.getWins() / total : 0.0);
        })
        .sorted(Comparator.comparing(StandingsDTO::getWinPercentage).reversed())
        .collect(Collectors.toList());
  }

  public Optional<com.nba.nba.dto.GameDTO> getGameById(Integer id) {
    return gameRepository.findById(id).map(gameMapper::toDTO);
  }

  public List<com.nba.nba.dto.GameDTO> getTeamGames(Integer teamId) {
    return gameRepository.findAll().stream()
        .filter(g -> g.getHomeTeam().getId().equals(teamId) || g.getAwayTeam().getId().equals(teamId))
        .sorted(Comparator.comparing(Game::getDate))
        .map(gameMapper::toDTO)
        .collect(Collectors.toList());
  }

  public List<com.nba.nba.dto.GameDTO> getAllGames(Integer seasonId, Integer teamId) {
    List<Game> games;
    if (seasonId != null && teamId != null) {
      games = gameRepository.findBySeasonIdAndHomeTeamIdOrSeasonIdAndAwayTeamId(seasonId, teamId, seasonId, teamId);
    } else if (seasonId != null) {
      games = gameRepository.findBySeasonId(seasonId);
    } else if (teamId != null) {
      games = gameRepository.findByHomeTeamIdOrAwayTeamId(teamId, teamId);
    } else {
      games = gameRepository.findAll();
    }

    return games.stream()
        .sorted(Comparator.comparing(Game::getDate).reversed())
        .map(gameMapper::toDTO)
        .collect(Collectors.toList());
  }

  public List<com.nba.nba.dto.SeasonDTO> getAllSeasons() {
    return seasonRepository.findAll().stream()
        .map(seasonMapper::toDTO)
        .collect(Collectors.toList());
  }
}

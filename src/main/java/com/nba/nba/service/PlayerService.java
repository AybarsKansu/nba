package com.nba.nba.service;

import com.nba.nba.dto.PlayerStatsDTO;
import com.nba.nba.dto.PlayerWithRosterDTO;
import com.nba.nba.entity.Player;
import com.nba.nba.entity.Roster;
import com.nba.nba.entity.Stats;
import com.nba.nba.repository.PlayerRepository;
import com.nba.nba.repository.RosterRepository;
import com.nba.nba.repository.StatsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PlayerService {

  @Autowired
  private PlayerRepository playerRepository;

  @Autowired
  private StatsService statsService;

  @Autowired
  private StatsRepository statsRepository;

  @Autowired
  private RosterRepository rosterRepository;

  public List<PlayerWithRosterDTO> getAllPlayersWithRoster() {
    List<Player> players = playerRepository.findAll();
    return players.stream().map(player -> {
      PlayerWithRosterDTO dto = new PlayerWithRosterDTO();
      dto.setId(player.getId());
      dto.setPlayerName(player.getPlayerName());
      dto.setPlayerSurname(player.getPlayerSurname());
      dto.setBirthDay(player.getBirthDay());
      dto.setHeight(player.getHeight());
      dto.setWeight(player.getWeight());
      dto.setDraftYear(player.getDraftYear());
      dto.setDraftOrder(player.getDraftOrder());
      dto.setNationality(player.getNationality());

      // Get the most recent roster entry for this player
      List<Roster> rosters = rosterRepository.findByPlayerId(player.getId());
      if (!rosters.isEmpty()) {
        // Get the most recent roster (assuming last in list or we can sort by season)
        Roster latestRoster = rosters.get(rosters.size() - 1);
        dto.setTeamName(latestRoster.getTeam().getName());
        dto.setJerseyNumber(latestRoster.getJerseyNumber());
        dto.setPosition(latestRoster.getPosition());
      }

      return dto;
    }).collect(Collectors.toList());
  }

  public PlayerWithRosterDTO getPlayerWithRosterById(Integer id) {
    Optional<Player> playerOpt = playerRepository.findById(id);
    if (playerOpt.isEmpty()) {
      return null;
    }

    Player player = playerOpt.get();
    PlayerWithRosterDTO dto = new PlayerWithRosterDTO();
    dto.setId(player.getId());
    dto.setPlayerName(player.getPlayerName());
    dto.setPlayerSurname(player.getPlayerSurname());
    dto.setBirthDay(player.getBirthDay());
    dto.setHeight(player.getHeight());
    dto.setWeight(player.getWeight());
    dto.setDraftYear(player.getDraftYear());
    dto.setDraftOrder(player.getDraftOrder());
    dto.setNationality(player.getNationality());

    // Get the most recent roster entry for this player
    List<Roster> rosters = rosterRepository.findByPlayerId(player.getId());
    if (!rosters.isEmpty()) {
      Roster latestRoster = rosters.get(rosters.size() - 1);
      dto.setTeamName(latestRoster.getTeam().getName());
      dto.setJerseyNumber(latestRoster.getJerseyNumber());
      dto.setPosition(latestRoster.getPosition());
    }

    return dto;
  }

  public List<Player> getAllPlayers() {
    return playerRepository.findAll();
  }

  public Optional<Player> getPlayerById(Integer id) {
    return playerRepository.findById(id);
  }

  public PlayerStatsDTO getSeasonStats(Integer playerId, Integer seasonId) {
    return statsService.calculateSeasonStats(playerId, seasonId);
  }

  public List<Stats> getGameLog(Integer playerId, Integer seasonId) {
    return statsRepository.findByPlayerIdAndSeasonId(playerId, seasonId);
  }

  public Player savePlayer(Player player) {
    return playerRepository.save(player);
  }

  public void deletePlayer(Integer id) {
    playerRepository.deleteById(id);
  }
}

package com.nba.nba.service;

import com.nba.nba.config.entity.Roster;
import com.nba.nba.config.entity.Team;
import com.nba.nba.repository.RosterRepository;
import com.nba.nba.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeamService {

  @Autowired
  private TeamRepository teamRepository;

  @Autowired
  private RosterRepository rosterRepository;

  @Autowired
  private com.nba.nba.mapper.TeamMapper teamMapper;

  public List<com.nba.nba.dto.TeamDTO> getAllTeams() {
    return teamRepository.findAll().stream()
        .map(teamMapper::toDTO)
        .collect(java.util.stream.Collectors.toList());
  }

  public Optional<com.nba.nba.dto.TeamDTO> getTeamById(Integer id) {
    return teamRepository.findById(id).map(teamMapper::toDTO);
  }

  public List<Roster> getRoster(Integer teamId, Integer seasonId) {
    return rosterRepository.findByTeamIdAndSeasonId(teamId, seasonId);
  }

  public com.nba.nba.dto.TeamDTO saveTeam(Team team) {
    Team savedTeam = teamRepository.save(team);
    return teamMapper.toDTO(savedTeam);
  }

  public void deleteTeam(Integer id) {
    teamRepository.deleteById(id);
  }

  @Autowired
  private com.nba.nba.repository.DivisionRepository divisionRepository;

  @Autowired
  private com.nba.nba.mapper.DivisionMapper divisionMapper;

  public List<com.nba.nba.dto.DivisionDTO> getAllDivisions() {
    return divisionRepository.findAll().stream()
        .map(divisionMapper::toDTO)
        .collect(java.util.stream.Collectors.toList());
  }
}

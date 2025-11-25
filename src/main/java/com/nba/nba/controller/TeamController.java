package com.nba.nba.controller;

import com.nba.nba.config.entity.Game;
import com.nba.nba.config.entity.Roster;
import com.nba.nba.config.entity.Team;
import com.nba.nba.service.GameService;
import com.nba.nba.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

	@Autowired
	private TeamService teamService;

	@Autowired
	private GameService gameService;

	@GetMapping
	public List<com.nba.nba.dto.TeamDTO> getAllTeams() {
		return teamService.getAllTeams();
	}

	@GetMapping("/{id}")
	public ResponseEntity<com.nba.nba.dto.TeamDTO> getTeamById(@PathVariable Integer id) {
		return teamService.getTeamById(id)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@GetMapping("/{id}/roster")
	public List<Roster> getRoster(@PathVariable Integer id, @RequestParam Integer seasonId) {
		return teamService.getRoster(id, seasonId);
	}

	@GetMapping("/{id}/games")
	public List<com.nba.nba.dto.GameDTO> getTeamGames(@PathVariable Integer id) {
		return gameService.getTeamGames(id);
	}

	@Autowired
	private com.nba.nba.service.AuditLogService auditLogService;

	@PostMapping
	@com.nba.nba.security.RequireRole("ADMIN")
	public ResponseEntity<com.nba.nba.dto.TeamDTO> createTeam(@RequestBody Team team,
			jakarta.servlet.http.HttpServletRequest request) {
		com.nba.nba.dto.TeamDTO savedTeam = teamService.saveTeam(team);

		Integer userId = Integer.parseInt(request.getHeader("X-User-Id"));
		auditLogService.logAction(userId, "INSERT_TEAM", "TEAM", savedTeam.getId(),
				"Created team: " + savedTeam.getName());

		return ResponseEntity.ok(savedTeam);
	}

	@DeleteMapping("/{id}")
	@com.nba.nba.security.RequireRole("ADMIN")
	public ResponseEntity<?> deleteTeam(@PathVariable Integer id, jakarta.servlet.http.HttpServletRequest request) {
		teamService.deleteTeam(id);

		Integer userId = Integer.parseInt(request.getHeader("X-User-Id"));
		auditLogService.logAction(userId, "DELETE_TEAM", "TEAM", id, "Deleted team with ID: " + id);

		return ResponseEntity.ok().build();
	}

	@Autowired
	private com.nba.nba.repository.DivisionRepository divisionRepository;

	@GetMapping("/divisions")
	public List<com.nba.nba.dto.DivisionDTO> getAllDivisions() {
		return teamService.getAllDivisions();
	}
}

package com.nba.nba.controller;

import com.nba.nba.dto.StandingsDTO;
import com.nba.nba.config.entity.Game;
import com.nba.nba.config.entity.Stats;
import com.nba.nba.repository.StatsRepository;
import com.nba.nba.config.entity.Season;
import com.nba.nba.repository.SeasonRepository;
import com.nba.nba.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
public class GameController {

	@Autowired
	private GameService gameService;

	@Autowired
	private StatsRepository statsRepository;

	@Autowired
	private com.nba.nba.mapper.StatsMapper statsMapper;

	@GetMapping
	public List<com.nba.nba.dto.GameDTO> getAllGames(@RequestParam(required = false) Integer seasonId,
			@RequestParam(required = false) Integer teamId) {
		return gameService.getAllGames(seasonId, teamId);
	}

	@GetMapping("/seasons")
	public List<com.nba.nba.dto.SeasonDTO> getAllSeasons() {
		return gameService.getAllSeasons();
	}

	@GetMapping("/recent")
	public List<com.nba.nba.dto.GameDTO> getRecentGames() {
		return gameService.getRecentGames();
	}

	@GetMapping("/standings")
	public List<StandingsDTO> getStandings(@RequestParam(required = false) Integer seasonId) {
		// Logic to pick latest season if null is handled in Service or here?
		// Service getStandings takes seasonId.
		// I'll keep the logic here to pick default season if needed, or move to
		// service.
		// For now, let's keep it simple and delegate to service.
		// But wait, the service method I wrote expects seasonId.
		// I'll pass null and let service handle? No, service logic I wrote assumes
		// seasonId is passed for filtering.
		// I should fetch seasons here if null.
		if (seasonId == null) {
			List<com.nba.nba.dto.SeasonDTO> seasons = gameService.getAllSeasons();
			if (seasons.isEmpty()) {
				return java.util.Collections.emptyList();
			}
			seasons.sort(java.util.Comparator.comparing(com.nba.nba.dto.SeasonDTO::getId).reversed());
			seasonId = seasons.get(0).getId();
		}
		return gameService.getStandings(seasonId);
	}

	@GetMapping("/{id}")
	public ResponseEntity<com.nba.nba.dto.GameDTO> getGameById(@PathVariable Integer id) {
		return gameService.getGameById(id)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@GetMapping("/{id}/boxscore")
	public List<com.nba.nba.dto.StatsDTO> getBoxScore(@PathVariable Integer id) {
		return statsRepository.findByGameId(id).stream()
				.map(statsMapper::toDTO)
				.collect(java.util.stream.Collectors.toList());
	}
}

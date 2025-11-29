CREATE SCHEMA IF NOT EXISTS nba;
USE nba;

CREATE TABLE IF NOT EXISTS CONFERENCE(
	id INT NOT NULL AUTO_INCREMENT,
	conference_name CHAR(4) CHECK (conference_name IN ('EAST', 'WEST')),
	PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS PLAYER(
	id INT NOT NULL AUTO_INCREMENT,
	player_name VARCHAR(50) NOT NULL,
	player_surname VARCHAR(50),
	birth_day DATE,
	height INT NOT NULL CHECK (height BETWEEN 100 AND 240),
	weight INT NOT NULL CHECK (weight BETWEEN 40 AND 150),
	draft_year INT CHECK (draft_year >= 1949),
	draft_order INT,
	nationality VARCHAR(50),
	PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS SEASON(
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(10) NOT NULL UNIQUE,
	PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS DIVISION(
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(20) NOT NULL UNIQUE,
	conf_id INT NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(conf_id) REFERENCES CONFERENCE(id)
);

CREATE TABLE IF NOT EXISTS TEAM(
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL UNIQUE,
	abbreviation CHAR(3) NOT NULL UNIQUE,
	city VARCHAR(50) NOT NULL,
	division_id INT NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(division_id) REFERENCES DIVISION(id)
);

CREATE TABLE IF NOT EXISTS GAME(
	id INT NOT NULL AUTO_INCREMENT,
	date DATE NOT NULL,

	home_score INT NULL CHECK (home_score >= 0),
	away_score INT NULL CHECK (away_score >= 0),
	game_type VARCHAR(30) NOT NULL CHECK (game_type IN ('Regular Season', 'Playoff', 'Play-In')),
	home_id INT NOT NULL,
	away_id INT NOT NULL,
	season_id INT NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY (home_id) REFERENCES TEAM(id),
	FOREIGN KEY (away_id) REFERENCES TEAM(id),
	FOREIGN KEY (season_id) REFERENCES SEASON(id),
	CONSTRAINT chk_different_teams CHECK (home_id <> away_id)
);

CREATE TABLE IF NOT EXISTS STATS(
    id INT NOT NULL AUTO_INCREMENT,
    player_id INT NOT NULL,
    game_id INT NOT NULL,
    team_id INT NOT NULL,
    
    minutes_played FLOAT NULL DEFAULT 0 CHECK (minutes_played >= 0),

    field_goals_made INT NULL DEFAULT 0 CHECK (field_goals_made >= 0),
    field_goals_attempted INT NULL DEFAULT 0 CHECK (field_goals_attempted >= 0),
    three_pointers_made INT NULL DEFAULT 0 CHECK (three_pointers_made >= 0),
    three_pointers_attempted INT NULL DEFAULT 0 CHECK (three_pointers_attempted >= 0),
    free_throws_made INT NULL DEFAULT 0 CHECK (free_throws_made >= 0),
    free_throws_attempted INT NULL DEFAULT 0 CHECK (free_throws_attempted >= 0),
    
    points INT GENERATED ALWAYS AS (
        (field_goals_made * 2) + three_pointers_made + free_throws_made
    ) STORED,

    rebounds INT NULL DEFAULT 0 CHECK (rebounds >= 0),
    assists INT NULL DEFAULT 0 CHECK (assists >= 0),
    steals INT NULL DEFAULT 0 CHECK (steals >= 0),
    blocks INT NULL DEFAULT 0 CHECK (blocks >= 0),
    turnovers INT NULL DEFAULT 0 CHECK (turnovers >= 0),
    personal_fouls INT NULL DEFAULT 0 CHECK (personal_fouls >= 0 AND personal_fouls <= 6),
    
    PRIMARY KEY(id),
    FOREIGN KEY(player_id) REFERENCES PLAYER(id),
    FOREIGN KEY(game_id) REFERENCES GAME(id),
    FOREIGN KEY(team_id) REFERENCES TEAM(id),
    UNIQUE KEY player_game(player_id, game_id),
    
    CONSTRAINT chk_fg_logic CHECK (field_goals_made <= field_goals_attempted),
    CONSTRAINT chk_3p_logic CHECK (three_pointers_made <= three_pointers_attempted),
    CONSTRAINT chk_ft_logic CHECK (free_throws_made <= free_throws_attempted)
);

CREATE TABLE IF NOT EXISTS SEASON_AWARDS(
	id INT NOT NULL AUTO_INCREMENT,
	season_id INT NOT NULL,
	player_id INT NOT NULL,
	award_type VARCHAR(50) NOT NULL CHECK (award_type IN ('MVP', 'ROY', 'DPOY', 'MIP', '6MOY')),
	
	PRIMARY KEY (id),
    FOREIGN KEY (season_id) REFERENCES SEASON(id),
    FOREIGN KEY (player_id) REFERENCES PLAYER(id),
    UNIQUE KEY unique_award (season_id, award_type)
);

CREATE TABLE IF NOT EXISTS ROSTER(
	id INT NOT NULL AUTO_INCREMENT,
	player_id INT NOT NULL,
	team_id INT NOT NULL,
	season_id INT NOT NULL,
	jersey_number TINYINT CHECK (jersey_number BETWEEN 0 AND 99),
	POSITION VARCHAR(5) CHECK (POSITION IN ('G', 'F', 'C', 'PG', 'SG', 'SF', 'PF', 'G-F', 'F-C')),
	
	PRIMARY KEY(id),
	FOREIGN KEY(player_id) REFERENCES PLAYER(id),
	FOREIGN KEY(team_id) REFERENCES TEAM(id),
	FOREIGN KEY(season_id) REFERENCES SEASON(id),
	UNIQUE KEY player_team_season (player_id, team_id, season_id)
);

CREATE TABLE IF NOT EXISTS APP_USER(
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'USER' CHECK (role IN ('ADMIN', 'USER')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS USER_FAVORITE_TEAM(
    user_id INT NOT NULL,
    team_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY(user_id, team_id), -- Aynı takımı iki kere favorileyemesin
    FOREIGN KEY(user_id) REFERENCES APP_USER(id) ON DELETE CASCADE,
    FOREIGN KEY(team_id) REFERENCES TEAM(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS USER_FAVORITE_PLAYER(
    user_id INT NOT NULL,
    player_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY(user_id, player_id),
    FOREIGN KEY(user_id) REFERENCES APP_USER(id) ON DELETE CASCADE,
    FOREIGN KEY(player_id) REFERENCES PLAYER(id) ON DELETE CASCADE
);

-- 4. (BONUS ÖZELLİK) LOGLAMA / DENETİM TABLOSU
-- Admin veri girişi yapacağı için, kimin ne zaman hangi veriyi değiştirdiğini
-- takip etmek çok önemlidir. Bu tablo güvenlik ve hata takibi sağlar.
CREATE TABLE IF NOT EXISTS AUDIT_LOG(
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    action_type VARCHAR(50) NOT NULL, -- Örn: 'INSERT_GAME', 'UPDATE_STATS', 'DELETE_PLAYER'
    table_name VARCHAR(50),           -- İşlemin yapıldığı tablo
    record_id INT,                    -- Etkilenen kaydın ID'si
    description TEXT,                 -- Detaylı açıklama (Opsiyonel)
    action_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES APP_USER(id)
);

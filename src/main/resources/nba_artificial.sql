-- Oluşturduğunuz şemayı kullan
USE nba;

INSERT INTO CONFERENCE (conference_name) VALUES 
('EAST'), 
('WEST');

-- 2. BÖLGELER (DIVISIONS)
-- ID varsayımı: EAST=1, WEST=2
INSERT INTO DIVISION (name, conf_id) VALUES 
('Atlantic', 1),   -- 1
('Central', 1),    -- 2
('Southeast', 1),  -- 3
('Northwest', 2),  -- 4
('Pacific', 2),    -- 5
('Southwest', 2);  -- 6

-- 3. SEZONLAR
INSERT INTO SEASON (name) VALUES 
('2022-2023'), -- 1
('2023-2024'), -- 2
('2024-2025'); -- 3

INSERT INTO TEAM (name, abbreviation, city, division_id) VALUES 
('Boston Celtics', 'BOS', 'Boston', 1),
('New York Knicks', 'NYK', 'New York', 1),
('Milwaukee Bucks', 'MIL', 'Milwaukee', 2),
('Chicago Bulls', 'CHI', 'Chicago', 2),
('Miami Heat', 'MIA', 'Miami', 3),
('Atlanta Hawks', 'ATL', 'Atlanta', 3),
('Denver Nuggets', 'DEN', 'Denver', 4),
('Oklahoma City Thunder', 'OKC', 'Oklahoma City', 4),
('Golden State Warriors', 'GSW', 'San Francisco', 5),
('Los Angeles Lakers', 'LAL', 'Los Angeles', 5),
('Dallas Mavericks', 'DAL', 'Dallas', 6),
('San Antonio Spurs', 'SAS', 'San Antonio', 6);

-- 5. OYUNCULAR
INSERT INTO PLAYER (player_name, player_surname, birth_day, height, weight, draft_year, draft_order, nationality) VALUES
-- BOS
('Jayson', 'Tatum', '1998-03-03', 203, 95, 2017, 3, 'USA'),      -- 1
('Jaylen', 'Brown', '1996-10-24', 198, 101, 2016, 3, 'USA'),     -- 2
-- NYK
('Jalen', 'Brunson', '1996-08-31', 188, 86, 2018, 33, 'USA'),    -- 3
('Julius', 'Randle', '1994-11-29', 203, 113, 2014, 7, 'USA'),    -- 4
-- MIL
('Giannis', 'Antetokounmpo', '1994-12-06', 211, 110, 2013, 15, 'Greece'), -- 5
('Damian', 'Lillard', '1990-07-15', 188, 88, 2012, 6, 'USA'),    -- 6
-- CHI
('Zach', 'LaVine', '1995-03-10', 196, 91, 2014, 13, 'USA'),      -- 7
('DeMar', 'DeRozan', '1989-08-07', 198, 100, 2009, 9, 'USA'),    -- 8
-- MIA
('Jimmy', 'Butler', '1989-09-14', 201, 104, 2011, 30, 'USA'),    -- 9
('Bam', 'Adebayo', '1997-07-18', 206, 116, 2017, 14, 'USA'),     -- 10
-- ATL
('Trae', 'Young', '1998-09-19', 185, 74, 2018, 5, 'USA'),        -- 11
('Dejounte', 'Murray', '1996-09-19', 196, 82, 2016, 29, 'USA'),  -- 12
-- DEN
('Nikola', 'Jokic', '1995-02-19', 211, 129, 2014, 41, 'Serbia'), -- 13
('Jamal', 'Murray', '1997-02-23', 193, 98, 2016, 7, 'Canada'),   -- 14
-- OKC
('Shai', 'Gilgeous-Alexander', '1998-07-12', 198, 88, 2018, 11, 'Canada'), -- 15
('Chet', 'Holmgren', '2002-05-01', 216, 94, 2022, 2, 'USA'),     -- 16
-- GSW
('Stephen', 'Curry', '1988-03-14', 188, 84, 2009, 7, 'USA'),     -- 17
('Draymond', 'Green', '1990-03-04', 198, 104, 2012, 35, 'USA'),  -- 18
-- LAL
('LeBron', 'James', '1984-12-30', 206, 113, 2003, 1, 'USA'),     -- 19
('Anthony', 'Davis', '1993-03-11', 208, 115, 2012, 1, 'USA'),    -- 20
-- DAL
('Luka', 'Doncic', '1999-02-28', 201, 104, 2018, 3, 'Slovenia'), -- 21
('Kyrie', 'Irving', '1992-03-23', 188, 88, 2011, 1, 'USA'),      -- 22
-- SAS
('Victor', 'Wembanyama', '2004-01-04', 224, 95, 2023, 1, 'France'), -- 23
('Devin', 'Vassell', '2000-08-23', 196, 91, 2020, 11, 'USA');    -- 24


INSERT INTO ROSTER (player_id, team_id, season_id, jersey_number, POSITION) VALUES
(1, 1, 1, 0, 'SF'), (2, 1, 1, 7, 'SG'),   
(3, 2, 1, 11, 'PG'), (4, 2, 1, 30, 'PF'), 
(5, 3, 1, 34, 'PF'), (6, 3, 1, 0, 'PG'),  
(7, 4, 1, 8, 'SG'), (8, 4, 1, 11, 'SF'),  
(9, 5, 1, 22, 'SF'), (10, 5, 1, 13, 'C'), 
(11, 6, 1, 11, 'PG'), (12, 6, 1, 5, 'SG'),
(13, 7, 1, 15, 'C'), (14, 7, 1, 27, 'PG'),
(15, 8, 1, 2, 'PG'), (16, 8, 1, 7, 'C'),  
(17, 9, 1, 30, 'PG'), (18, 9, 1, 23, 'PF'),
(19, 10, 1, 23, 'SF'), (20, 10, 1, 3, 'C'),
(21, 11, 1, 77, 'PG'), (22, 11, 1, 2, 'SG'),
(23, 12, 1, 1, 'C'), (24, 12, 1, 24, 'SG'),
(1, 1, 2, 0, 'SF'), (2, 1, 2, 7, 'SG'),
(3, 2, 2, 11, 'PG'), (4, 2, 2, 30, 'PF'),
(5, 3, 2, 34, 'PF'), (6, 3, 2, 0, 'PG'),
(7, 4, 2, 8, 'SG'), (8, 4, 2, 11, 'SF'),
(9, 5, 2, 22, 'SF'), (10, 5, 2, 13, 'C'),
(11, 6, 2, 11, 'PG'), (12, 6, 2, 5, 'SG'),
(13, 7, 2, 15, 'C'), (14, 7, 2, 27, 'PG'),
(15, 8, 2, 2, 'PG'), (16, 8, 2, 7, 'C'),
(17, 9, 2, 30, 'PG'), (18, 9, 2, 23, 'PF'),
(19, 10, 2, 23, 'SF'), (20, 10, 2, 3, 'C'),
(21, 11, 2, 77, 'PG'), (22, 11, 2, 2, 'SG'),
(23, 12, 2, 1, 'C'), (24, 12, 2, 24, 'SG'),
(1, 1, 3, 0, 'SF'), (2, 1, 3, 7, 'SG'),
(3, 2, 3, 11, 'PG'), (4, 2, 3, 30, 'PF'),
(5, 3, 3, 34, 'PF'), (6, 3, 3, 0, 'PG'),
(7, 4, 3, 8, 'SG'), (8, 4, 3, 11, 'SF'),
(9, 5, 3, 22, 'SF'), (10, 5, 3, 13, 'C'),
(11, 6, 3, 11, 'PG'), (12, 6, 3, 5, 'SG'),
(13, 7, 3, 15, 'C'), (14, 7, 3, 27, 'PG'),
(15, 8, 3, 2, 'PG'), (16, 8, 3, 7, 'C'),
(17, 9, 3, 30, 'PG'), (18, 9, 3, 23, 'PF'),
(19, 10, 3, 23, 'SF'), (20, 10, 3, 3, 'C'),
(21, 11, 3, 77, 'PG'), (22, 11, 3, 2, 'SG'),
(23, 12, 3, 1, 'C'), (24, 12, 3, 24, 'SG');

INSERT INTO GAME (date, home_score, away_score, game_type, home_id, away_id, season_id) VALUES 
('2022-10-18', 126, 117, 'Regular Season', 1, 2, 1),  -- BOS vs NYK (BOS Kazandı)
('2022-10-19', 105, 110, 'Regular Season', 3, 4, 1),  -- MIL vs CHI (CHI Kazandı)
('2022-10-20', 108, 98,  'Regular Season', 5, 6, 1),  -- MIA vs ATL (MIA Kazandı)
('2022-10-21', 120, 122, 'Regular Season', 7, 8, 1),  -- DEN vs OKC (OKC Kazandı)
('2022-10-22', 123, 109, 'Regular Season', 9, 10, 1), -- GSW vs LAL (GSW Kazandı)
('2022-10-23', 115, 112, 'Regular Season', 11, 12, 1); -- DAL vs SAS (DAL Kazandı)

-- SEZON 1 İSTATİSTİKLERİ (Game ID 1-6)
INSERT INTO STATS (player_id, game_id, team_id, minutes_played, points, rebounds, assists, field_goals_made, field_goals_attempted) VALUES
-- Game 1: BOS (1,2) vs NYK (3,4)
(1, 1, 1, 38.5, 35, 12, 4, 13, 22), -- Tatum
(2, 1, 1, 35.0, 28, 6, 3, 10, 19),  -- Brown
(3, 1, 2, 36.0, 25, 3, 8, 9, 18),   -- Brunson
(4, 1, 2, 34.0, 20, 10, 2, 7, 15),  
(5, 2, 3, 36.5, 30, 14, 5, 11, 20), -- Giannis
(6, 2, 3, 35.0, 25, 4, 7, 8, 17),   -- Dame (Simülasyon)
(7, 2, 4, 34.0, 28, 5, 4, 10, 18),  -- LaVine
(8, 2, 4, 35.0, 32, 6, 5, 12, 21),  -- DeRozan
(9, 3, 5, 37.0, 22, 6, 6, 7, 14),   -- Butler
(10, 3, 5, 35.0, 18, 12, 3, 8, 12), -- Adebayo
(11, 3, 6, 36.0, 28, 3, 10, 9, 20), -- Trae
(12, 3, 6, 34.0, 20, 6, 5, 8, 16),  -- Murray
(13, 4, 7, 35.0, 25, 12, 10, 10, 16), -- Jokic (Triple Double)
(14, 4, 7, 34.0, 22, 4, 5, 8, 17),    -- Murray
(15, 4, 8, 36.0, 31, 5, 6, 11, 21),   -- SGA
(16, 4, 8, 30.0, 18, 9, 2, 7, 13),    -- Chet
(17, 5, 9, 34.0, 33, 4, 6, 10, 22),   -- Curry
(18, 5, 9, 30.0, 8, 8, 8, 3, 7),      -- Draymond
(19, 5, 10, 36.0, 28, 9, 7, 11, 20),  -- LeBron
(20, 5, 10, 35.0, 24, 11, 2, 9, 16),  -- Davis
(21, 6, 11, 37.0, 36, 9, 11, 12, 24), -- Luka
(22, 6, 11, 35.0, 25, 4, 5, 10, 19),  -- Kyrie
(23, 6, 12, 30.0, 20, 10, 2, 8, 15),  -- Wemby
(24, 6, 12, 32.0, 18, 5, 3, 7, 14);   -- Vassell


-- ==========================================
-- 2. SEZON MAÇLARI (2023-2024) - SEASON ID: 2
-- ==========================================
INSERT INTO GAME (date, home_score, away_score, game_type, home_id, away_id, season_id) VALUES 
('2023-10-25', 104, 108, 'Regular Season', 2, 1, 2),  -- NYK vs BOS (BOS Kazandı)
('2023-10-26', 118, 110, 'Regular Season', 4, 3, 2),  -- CHI vs MIL (CHI Kazandı)
('2023-10-27', 115, 120, 'Regular Season', 6, 5, 2),  -- ATL vs MIA (MIA Kazandı)
('2023-10-28', 110, 105, 'Regular Season', 8, 7, 2),  -- OKC vs DEN (OKC Kazandı)
('2023-10-29', 115, 125, 'Regular Season', 10, 9, 2), -- LAL vs GSW (GSW Kazandı)
('2023-10-30', 100, 119, 'Regular Season', 12, 11, 2); -- SAS vs DAL (DAL Kazandı)

-- SEZON 2 İSTATİSTİKLERİ (Game ID 7-12)
INSERT INTO STATS (player_id, game_id, team_id, minutes_played, points, rebounds, assists, field_goals_made, field_goals_attempted) VALUES
(3, 7, 2, 38.0, 28, 4, 6, 10, 20), 
(4, 7, 2, 36.0, 22, 11, 4, 8, 18),
(1, 7, 1, 37.0, 30, 10, 5, 11, 21), 
(2, 7, 1, 35.0, 24, 5, 4, 9, 17),
(7, 8, 4, 35.0, 26, 5, 5, 9, 18),
(8, 8, 4, 36.0, 29, 6, 6, 10, 19),
(5, 8, 3, 38.0, 35, 13, 6, 13, 22),
(6, 8, 3, 36.0, 28, 4, 8, 9, 20),
(11, 9, 6, 36.0, 25, 4, 11, 8, 19),
(12, 9, 6, 35.0, 22, 7, 6, 9, 17),
(9, 9, 5, 34.0, 26, 7, 5, 9, 16),
(10, 9, 5, 36.0, 20, 14, 4, 8, 13),
(15, 10, 8, 37.0, 34, 6, 6, 12, 22),
(16, 10, 8, 32.0, 22, 10, 3, 8, 14),
(13, 10, 7, 36.0, 29, 13, 9, 11, 18),
(14, 10, 7, 35.0, 24, 5, 6, 9, 18),
(19, 11, 10, 38.0, 30, 8, 8, 11, 21),
(20, 11, 10, 36.0, 26, 12, 3, 10, 18),
(17, 11, 9, 35.0, 35, 5, 5, 12, 23),
(18, 11, 9, 32.0, 10, 9, 10, 4, 9),
(23, 12, 12, 34.0, 25, 11, 4, 9, 18),
(24, 12, 12, 33.0, 18, 4, 3, 7, 15),
(21, 12, 11, 36.0, 38, 10, 12, 13, 25),
(22, 12, 11, 35.0, 26, 3, 6, 10, 20);


-- ==========================================
-- 3. SEZON MAÇLARI (2024-2025) - SEASON ID: 3
-- ==========================================
INSERT INTO GAME (date, home_score, away_score, game_type, home_id, away_id, season_id) VALUES 
('2024-10-22', 130, 125, 'Regular Season', 1, 2, 3),
('2024-10-23', 112, 115, 'Regular Season', 3, 4, 3),
('2024-10-24', 105, 102, 'Regular Season', 5, 6, 3),
('2024-10-25', 128, 124, 'Regular Season', 7, 8, 3),
('2024-10-26', 118, 110, 'Regular Season', 9, 10, 3),
('2024-10-27', 120, 115, 'Regular Season', 11, 12, 3);

-- SEZON 3 İSTATİSTİKLERİ (Game ID 13-18)
INSERT INTO STATS (player_id, game_id, team_id, minutes_played, points, rebounds, assists, field_goals_made, field_goals_attempted) VALUES
(1, 13, 1, 39.0, 40, 8, 5, 14, 25),
(2, 13, 1, 37.0, 28, 7, 4, 10, 19),
(3, 13, 2, 38.0, 32, 4, 8, 11, 22),
(4, 13, 2, 36.0, 25, 12, 3, 9, 18),
(5, 14, 3, 37.0, 34, 15, 6, 12, 21),
(6, 14, 3, 36.0, 26, 4, 7, 8, 18),
(7, 14, 4, 35.0, 28, 5, 5, 10, 19),
(8, 14, 4, 37.0, 31, 6, 6, 11, 20),
(9, 15, 5, 36.0, 24, 8, 8, 8, 15),
(10, 15, 5, 35.0, 22, 13, 4, 9, 14),
(11, 15, 6, 37.0, 27, 3, 11, 9, 21),
(12, 15, 6, 35.0, 21, 6, 5, 8, 16),
(13, 16, 7, 38.0, 32, 14, 12, 12, 20),
(14, 16, 7, 36.0, 25, 5, 6, 9, 18),
(15, 16, 8, 38.0, 35, 6, 7, 12, 23),
(16, 16, 8, 34.0, 24, 11, 3, 9, 15),
(17, 17, 9, 36.0, 32, 5, 7, 11, 21),
(18, 17, 9, 33.0, 12, 10, 11, 5, 8),
(19, 17, 10, 37.0, 29, 8, 9, 11, 19),
(20, 17, 10, 36.0, 27, 13, 2, 10, 17),
(21, 18, 11, 38.0, 42, 10, 11, 14, 26),
(22, 18, 11, 36.0, 28, 4, 6, 10, 19),
(23, 18, 12, 35.0, 28, 12, 5, 10, 18),
(24, 18, 12, 34.0, 20, 5, 4, 8, 15);
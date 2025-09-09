-- Chess Training Database Backup
-- Created: 2025-08-29T18:24:23.397Z
-- This file contains the complete database schema and data

PRAGMA foreign_keys = ON;

-- Table: achievements
DROP TABLE IF EXISTS achievements;
CREATE TABLE achievements (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          description TEXT,
          category TEXT,
          icon TEXT,
          points INTEGER DEFAULT 0,
          difficulty TEXT,
          requirements TEXT, -- JSON
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

-- Data for achievements (29 records)
INSERT INTO achievements (id, name, description, category, icon, points, difficulty, requirements, created_at) VALUES ('2yyjqxqc7mewklmps', 'Tactical Grandmaster', 'Solve 1000 tactical puzzles', 'Tactical', NULL, 10, 'medium', NULL, '2025-08-29 08:28:01');
INSERT INTO achievements (id, name, description, category, icon, points, difficulty, requirements, created_at) VALUES ('6y5az9ib7mewklmqn', 'Tactical Immortal', '2000', 'general', NULL, 10, 'medium', NULL, '2025-08-29 08:28:02');
INSERT INTO achievements (id, name, description, category, icon, points, difficulty, requirements, created_at) VALUES ('d8g59oxdzmewklmqx', 'First Blood', 'Win your first game', 'Rating', NULL, 10, 'medium', NULL, '2025-08-29 08:28:02');
INSERT INTO achievements (id, name, description, category, icon, points, difficulty, requirements, created_at) VALUES ('71i8h76gzmewklmrl', 'Champion Ascendant', 'Reach 2000 rating', 'Rating', NULL, 10, 'medium', NULL, '2025-08-29 08:28:02');
INSERT INTO achievements (id, name, description, category, icon, points, difficulty, requirements, created_at) VALUES ('qn28dtt4rmewklmrx', 'Chess Champion', '1000', 'general', NULL, 10, 'medium', NULL, '2025-08-29 08:28:02');
INSERT INTO achievements (id, name, description, category, icon, points, difficulty, requirements, created_at) VALUES ('6hidmznspmewklmsu', 'Dedicated Scholar', 'Study for 50 hours total', 'Study', NULL, 10, 'medium', NULL, '2025-08-29 08:28:02');
INSERT INTO achievements (id, name, description, category, icon, points, difficulty, requirements, created_at) VALUES ('67ghvs7h7mewklmtt', 'Zap Reflexes', 'Win a bullet game in under 60 seconds', 'Special', NULL, 10, 'medium', NULL, '2025-08-29 08:28:02');
INSERT INTO achievements (id, name, description, category, icon, points, difficulty, requirements, created_at) VALUES ('8gyusahtqmewklmv2', 'Endgame Surgeon', '600', 'general', NULL, 10, 'medium', NULL, '2025-08-29 08:28:02');
INSERT INTO achievements (id, name, description, category, icon, points, difficulty, requirements, created_at) VALUES ('dbqp6gmwymewklmvd', 'Opening Explorer', 'Study 10 different opening variations', 'Opening', NULL, 10, 'medium', NULL, '2025-08-29 08:28:02');
INSERT INTO achievements (id, name, description, category, icon, points, difficulty, requirements, created_at) VALUES ('4zidnab7rmewklmvt', 'Century Club', 'Play 100 games', 'Milestones', NULL, 10, 'medium', NULL, '2025-08-29 08:28:02');
INSERT INTO achievements (id, name, description, category, icon, points, difficulty, requirements, created_at) VALUES ('vuoos3wwimewklmwf', 'Secret Master', '1500', 'general', NULL, 10, 'medium', NULL, '2025-08-29 08:28:02');
INSERT INTO achievements (id, name, description, category, icon, points, difficulty, requirements, created_at) VALUES ('1xp976sk4mewklmws', 'Tactical Mastery', 'Master the art of tactical calculation', 'general', NULL, 10, 'medium', NULL, '2025-08-29 08:28:02');
INSERT INTO achievements (id, name, description, category, icon, points, difficulty, requirements, created_at) VALUES ('0iteoumiimewklmx4', 'Rating Conquest', 'Climb the rating ladder to greatness', 'general', NULL, 10, 'medium', NULL, '2025-08-29 08:28:02');
INSERT INTO achievements (id, name, description, category, icon, points, difficulty, requirements, created_at) VALUES ('2murpb7l2mewklmxt', 'Study Dedication', 'Dedication to learning brings wisdom', 'general', NULL, 10, 'medium', NULL, '2025-08-29 08:28:02');
INSERT INTO achievements (id, name, description, category, icon, points, difficulty, requirements, created_at) VALUES ('2hx275kxamewklmyj', 'GrandmasterFlash', '', 'general', NULL, 10, 'medium', NULL, '2025-08-29 08:28:02');
INSERT INTO achievements (id, name, description, category, icon, points, difficulty, requirements, created_at) VALUES ('e28lpk0tlmewklmyv', 'You', '', 'general', NULL, 10, 'medium', NULL, '2025-08-29 08:28:02');
INSERT INTO achievements (id, name, description, category, icon, points, difficulty, requirements, created_at) VALUES ('5jbs11gs4mewklmz6', 'TacticalNinja', '', 'general', NULL, 10, 'medium', NULL, '2025-08-29 08:28:02');
INSERT INTO achievements (id, name, description, category, icon, points, difficulty, requirements, created_at) VALUES ('90be3611-4cfa-4cd4-b158-286d89e29aa1', 'First Steps', 'Solve your first puzzle', 'Getting Started', NULL, 10, '1', '{"requirement":"Solve 1 puzzle"}', '2025-08-29 15:57:15');
INSERT INTO achievements (id, name, description, category, icon, points, difficulty, requirements, created_at) VALUES ('bl2klw41nmex21mj3', 'First Strike', 'Solve your first tactical puzzle', 'Tactical', NULL, 10, 'medium', NULL, '2025-08-29 16:36:21');
INSERT INTO achievements (id, name, description, category, icon, points, difficulty, requirements, created_at) VALUES ('6gx3me7xlmex21mjg', 'Tactical Apprentice', 'Solve 100 tactical puzzles', 'Tactical', NULL, 10, 'medium', NULL, '2025-08-29 16:36:21');
INSERT INTO achievements (id, name, description, category, icon, points, difficulty, requirements, created_at) VALUES ('oc7x08ih3mex21mla', 'Rising Warrior', 'Reach 1500 rating', 'Rating', NULL, 10, 'medium', NULL, '2025-08-29 16:36:21');
INSERT INTO achievements (id, name, description, category, icon, points, difficulty, requirements, created_at) VALUES ('a076gcdfvmex21mm6', 'Hot Streak', 'Win 5 games in a row', 'Streaks', NULL, 10, 'medium', NULL, '2025-08-29 16:36:21');
INSERT INTO achievements (id, name, description, category, icon, points, difficulty, requirements, created_at) VALUES ('3udnzuj80mex21mmh', 'Unstoppable Force', 'Win 10 games in a row', 'Streaks', NULL, 10, 'medium', NULL, '2025-08-29 16:36:21');
INSERT INTO achievements (id, name, description, category, icon, points, difficulty, requirements, created_at) VALUES ('elvkt2q71mex21mn2', 'Chess Sage', 'Study for 200 hours total', 'Study', NULL, 10, 'medium', NULL, '2025-08-29 16:36:21');
INSERT INTO achievements (id, name, description, category, icon, points, difficulty, requirements, created_at) VALUES ('g1k3o297ymex21mnx', 'Artist of Perfection', 'Play a game with 100% accuracy', 'Special', NULL, 10, 'medium', NULL, '2025-08-29 16:36:21');
INSERT INTO achievements (id, name, description, category, icon, points, difficulty, requirements, created_at) VALUES ('tw54v9h8dmex21mo8', 'Perfectionist', '2500', 'general', NULL, 10, 'medium', NULL, '2025-08-29 16:36:21');
INSERT INTO achievements (id, name, description, category, icon, points, difficulty, requirements, created_at) VALUES ('uwptvjo13mex21mpq', '???', 'A mysterious achievement awaits...', 'Special', NULL, 10, 'medium', NULL, '2025-08-29 16:36:21');
INSERT INTO achievements (id, name, description, category, icon, points, difficulty, requirements, created_at) VALUES ('6cckwdvpzmex21mr2', 'Streak Domination', 'Dominate your opponents with unstoppable streaks', 'general', NULL, 10, 'medium', NULL, '2025-08-29 16:36:22');
INSERT INTO achievements (id, name, description, category, icon, points, difficulty, requirements, created_at) VALUES ('cr6vpxn1fmex21mrp', 'Opening Mastery', 'Master the opening phase of chess', 'general', NULL, 10, 'medium', NULL, '2025-08-29 16:36:22');

-- Table: ai_opponents
DROP TABLE IF EXISTS ai_opponents;
CREATE TABLE ai_opponents (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          personality TEXT,
          strength_rating INTEGER,
          playing_style TEXT,
          description TEXT,
          avatar_url TEXT,
          is_available BOOLEAN DEFAULT 1,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

-- Data for ai_opponents (25 records)
INSERT INTO ai_opponents (id, name, personality, strength_rating, playing_style, description, avatar_url, is_available, created_at) VALUES ('gsi70sjmhmewklmgh', 'Cyber Pawn', 'Balanced', 800, 'balanced', 'A friendly AI learning the ropes of digital combat', NULL, 1, '2025-08-29 08:28:01');
INSERT INTO ai_opponents (id, name, personality, strength_rating, playing_style, description, avatar_url, is_available, created_at) VALUES ('8t1j2lctimewklmgs', 'Shadow Knight', 'Tactical', 1200, 'balanced', 'Strikes from the shadows with devastating knight forks', NULL, 1, '2025-08-29 08:28:01');
INSERT INTO ai_opponents (id, name, personality, strength_rating, playing_style, description, avatar_url, is_available, created_at) VALUES ('832mgav4nmewklmhe', 'Quantum Storm', 'Unorthodox', 1600, 'balanced', 'Unpredictable moves that defy conventional wisdom', NULL, 1, '2025-08-29 08:28:01');
INSERT INTO ai_opponents (id, name, personality, strength_rating, playing_style, description, avatar_url, is_available, created_at) VALUES ('mqw770xb6mewklmia', 'Titan Prime', 'Balanced', 2200, 'balanced', 'The ultimate AI warrior, master of all chess domains', NULL, 1, '2025-08-29 08:28:01');
INSERT INTO ai_opponents (id, name, personality, strength_rating, playing_style, description, avatar_url, is_available, created_at) VALUES ('43tligv4qmewklmiz', 'Neon Blitz', 'Aggressive', 1650, 'balanced', 'Zap-fast calculations with electric energy', NULL, 1, '2025-08-29 08:28:01');
INSERT INTO ai_opponents (id, name, personality, strength_rating, playing_style, description, avatar_url, is_available, created_at) VALUES ('7jtbojgjfmewklmkz', '15', '', 1500, 'balanced', '15', NULL, 1, '2025-08-29 08:28:01');
INSERT INTO ai_opponents (id, name, personality, strength_rating, playing_style, description, avatar_url, is_available, created_at) VALUES ('ax8db31mcmewklmlb', '30', '', 1500, 'balanced', '30', NULL, 1, '2025-08-29 08:28:01');
INSERT INTO ai_opponents (id, name, personality, strength_rating, playing_style, description, avatar_url, is_available, created_at) VALUES ('a3wf699yxmewklmlm', '60', '', 1500, 'balanced', '1', NULL, 1, '2025-08-29 08:28:01');
INSERT INTO ai_opponents (id, name, personality, strength_rating, playing_style, description, avatar_url, is_available, created_at) VALUES ('ipp1x15domewklmnq', 'Endgame Expert', '', 1500, 'balanced', 'Win 20 endgames from equal positions', NULL, 1, '2025-08-29 08:28:01');
INSERT INTO ai_opponents (id, name, personality, strength_rating, playing_style, description, avatar_url, is_available, created_at) VALUES ('7yva93qxlmewklmoo', 'Chess Master', '', 1500, 'balanced', 'Reach 2000+ rating', NULL, 1, '2025-08-29 08:28:01');
INSERT INTO ai_opponents (id, name, personality, strength_rating, playing_style, description, avatar_url, is_available, created_at) VALUES ('8ye920z7mmex21mb9', 'Iron Fortress', 'Defensive', 1300, 'balanced', 'An impregnable defense that slowly crushes opponents', NULL, 1, '2025-08-29 16:36:21');
INSERT INTO ai_opponents (id, name, personality, strength_rating, playing_style, description, avatar_url, is_available, created_at) VALUES ('wy0c4wmvxmex21mbv', 'Fire Dragon', 'Aggressive', 1700, 'balanced', 'Burns everything in its path with relentless attacks', NULL, 1, '2025-08-29 16:36:21');
INSERT INTO ai_opponents (id, name, personality, strength_rating, playing_style, description, avatar_url, is_available, created_at) VALUES ('j1k1j25awmex21mc7', 'Crystal Sage', 'Positional', 1900, 'balanced', 'Sees deep into the position\', NULL, 1, '2025-08-29 16:36:21');
INSERT INTO ai_opponents (id, name, personality, strength_rating, playing_style, description, avatar_url, is_available, created_at) VALUES ('5q7iuacnfmex21mcs', 'Void Specter', 'Unorthodox', 2000, 'balanced', 'An enigmatic presence that phases between dimensions', NULL, 1, '2025-08-29 16:36:21');
INSERT INTO ai_opponents (id, name, personality, strength_rating, playing_style, description, avatar_url, is_available, created_at) VALUES ('7raj6s1tmmex21mde', 'Golden Phoenix', 'Balanced', 1950, 'balanced', 'Rises from defeat stronger than ever before', NULL, 1, '2025-08-29 16:36:21');
INSERT INTO ai_opponents (id, name, personality, strength_rating, playing_style, description, avatar_url, is_available, created_at) VALUES ('2yj6fjl3fmex21mdp', '3', '', 1500, 'balanced', '3', NULL, 1, '2025-08-29 16:36:21');
INSERT INTO ai_opponents (id, name, personality, strength_rating, playing_style, description, avatar_url, is_available, created_at) VALUES ('0f0kkoxcsmex21me0', '5', '', 1500, 'balanced', '5', NULL, 1, '2025-08-29 16:36:21');
INSERT INTO ai_opponents (id, name, personality, strength_rating, playing_style, description, avatar_url, is_available, created_at) VALUES ('v82266rdomex21meo', '10', '', 1500, 'balanced', '10', NULL, 1, '2025-08-29 16:36:21');
INSERT INTO ai_opponents (id, name, personality, strength_rating, playing_style, description, avatar_url, is_available, created_at) VALUES ('0yony8gwgmex21mfw', '90', '', 1500, 'balanced', '1.5', NULL, 1, '2025-08-29 16:36:21');
INSERT INTO ai_opponents (id, name, personality, strength_rating, playing_style, description, avatar_url, is_available, created_at) VALUES ('n1az9uvxnmex21mg7', 'Unlimited', '', 1500, 'balanced', 'No time limits - Pure chess thinking', NULL, 1, '2025-08-29 16:36:21');
INSERT INTO ai_opponents (id, name, personality, strength_rating, playing_style, description, avatar_url, is_available, created_at) VALUES ('0qbxex47nmex21mgi', 'First Victory', '', 1500, 'balanced', 'Win your first game against an AI opponent', NULL, 1, '2025-08-29 16:36:21');
INSERT INTO ai_opponents (id, name, personality, strength_rating, playing_style, description, avatar_url, is_available, created_at) VALUES ('juqzlqyu7mex21mgt', 'Tactical Genius', '', 1500, 'balanced', 'Win 10 games with tactical combinations', NULL, 1, '2025-08-29 16:36:21');
INSERT INTO ai_opponents (id, name, personality, strength_rating, playing_style, description, avatar_url, is_available, created_at) VALUES ('joj8acp4vmex21mh4', 'Strategic Mastermind', '', 1500, 'balanced', 'Win 15 games through positional play', NULL, 1, '2025-08-29 16:36:21');
INSERT INTO ai_opponents (id, name, personality, strength_rating, playing_style, description, avatar_url, is_available, created_at) VALUES ('7lerpo67bmex21mhw', 'Speed Warrior', '', 1500, 'balanced', 'Win 10 blitz games in a row', NULL, 1, '2025-08-29 16:36:21');
INSERT INTO ai_opponents (id, name, personality, strength_rating, playing_style, description, avatar_url, is_available, created_at) VALUES ('7tldlpv5lmex21mi9', 'Fearless Fighter', '', 1500, 'balanced', 'Win against higher-rated opponents 5 times', NULL, 1, '2025-08-29 16:36:21');

-- Table: analysis_positions
DROP TABLE IF EXISTS analysis_positions;
CREATE TABLE analysis_positions (
          id TEXT PRIMARY KEY,
          fen TEXT NOT NULL,
          name TEXT,
          description TEXT,
          best_moves TEXT, -- JSON array
          evaluation REAL,
          depth INTEGER,
          engine_analysis TEXT, -- JSON
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

-- Data for analysis_positions (46 records)
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('023fcl1cemewkllsk', 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4', 'Greek Gift Sacrifice', 'Classic bishop sacrifice on h7 tactical pattern', '[]', 0, NULL, NULL, '2025-08-29 08:28:00');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('ms1mdxa84mewkllsw', '6', 'Back Rank Mate Threat', 'Simple back rank mate in one', '[]', 0, NULL, NULL, '2025-08-29 08:28:00');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('rapyqz54umewkllt5', 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3', 'Fork Pattern', 'Knight fork opportunity in the center', '[]', 0, NULL, NULL, '2025-08-29 08:28:00');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('yznxlxe8fmewklltg', 'r1bq1rk1/pp2ppbp/3p1np1/8/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQ - 0 9', 'Sicilian Dragon - Yugoslav Attack', 'Sharp line in the Dragon variation leading to opposite-side castling', '[]', 0, NULL, NULL, '2025-08-29 08:28:00');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('lqftft12wmewklltp', 'r1bqkb1r/pp3ppp/2np1n2/1B2p3/2PP4/5N2/PP2PPPP/RNBQK2R b KQkq - 3 6', 'Queen\', 'Classical setup in the Queen\', '[]', 0, NULL, NULL, '2025-08-29 08:28:00');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('ecmi630j9mewklltz', 'rnbq1rk1/pp2ppbp/3p1np1/8/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQ - 0 7', 'King\', 'Hypermodern defense with fianchetto bishop', '[]', 0, NULL, NULL, '2025-08-29 08:28:00');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('a2r56zh69mewkllu9', '1', 'Lucena Position', 'Fundamental rook endgame winning technique', '[]', 0, NULL, NULL, '2025-08-29 08:28:00');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('ga9kfbok2mewklluk', '3', 'Philidor Position', 'Classic defensive setup in rook endgames', '[]', 0, NULL, NULL, '2025-08-29 08:28:00');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('j59iv4mzfmewkllus', '8', 'Opposition in Pawn Endgame', 'Fundamental king and pawn vs king position', '[]', 0, NULL, NULL, '2025-08-29 08:28:00');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('vsl1hpkl1mewkllv2', '8', 'Queen vs Pawn - Stalemate Tricks', 'Tricky defensive resources with advanced pawn', '[]', 0, NULL, NULL, '2025-08-29 08:28:00');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('mzzlx0bg2mewkllve', '4', 'Kasparov vs Deep Blue - Game 6 Critical Position', 'Historic human vs computer endgame position', '[]', 0, NULL, NULL, '2025-08-29 08:28:00');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('mfxzw7vr3mewkllvp', 'r2qkb1r/pp2nppp/3p4/2pNN1B1/2BnP3/3P4/PPP2PPP/R2bK2R w KQkq - 1 11', 'Fischer\', 'Brilliant sacrificial attack by Bobby Fischer', '[]', 0, NULL, NULL, '2025-08-29 08:28:00');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('zuqdgar4fmewkllw1', '4', 'Morphy Opera Box Game', 'Classic mating attack by Paul Morphy', '[]', 0, NULL, NULL, '2025-08-29 08:28:00');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('qj97g7lbnmewklm5i', 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', 'Starting Position', 'Standard chess starting position', '[]', 0, NULL, NULL, '2025-08-29 08:28:01');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('yjjimlo8amewklm5t', '8', 'King vs King', 'Basic endgame practice', '[]', 0, NULL, NULL, '2025-08-29 08:28:01');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('e45908joxmewklm63', 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4', 'Greek Gift Sacrifice', 'Classic Bxh7+ sacrifice pattern', '[]', 0, NULL, NULL, '2025-08-29 08:28:01');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('1mw6lvgx0mewklm6e', '8', 'Queen vs Pawn Endgame', 'Queen vs advanced pawn technique', '[]', 0, NULL, NULL, '2025-08-29 08:28:01');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('4uen71xzjmewklm6o', '8', 'Rook Endgame', 'Rook and king vs king endgame', '[]', 0, NULL, NULL, '2025-08-29 08:28:01');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('46uqy581nmewklm6y', 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPPNPPP/RNBQKB1R b KQkq - 2 2', 'Fork Pattern', 'Knight fork opportunity', '[]', 0, NULL, NULL, '2025-08-29 08:28:01');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('93ztqmas1mewklm79', 'rnbqk2r/pppp1ppp/5n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 4 4', 'Pin Tactic', 'Bishop pin on the knight', '[]', 0, NULL, NULL, '2025-08-29 08:28:01');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('xz7042h0gmewklm7k', '1', 'Lucena Position', 'Famous rook endgame winning technique', '[]', 0, NULL, NULL, '2025-08-29 08:28:01');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('asf3k8fxrmewklm7v', '3', 'Philidor Position', 'Key pawn endgame defensive setup', '[]', 0, NULL, NULL, '2025-08-29 08:28:01');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('zchraludvmewklm87', '6', 'Back Rank Mate', 'Classic back rank mating pattern', '[]', 0, NULL, NULL, '2025-08-29 08:28:01');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('bjg16r8i2mex21lmj', 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4', 'Greek Gift Sacrifice', 'Classic bishop sacrifice on h7 tactical pattern', '[]', 0, NULL, NULL, '2025-08-29 16:36:20');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('nct8ikse8mex21lmv', '6', 'Back Rank Mate Threat', 'Simple back rank mate in one', '[]', 0, NULL, NULL, '2025-08-29 16:36:20');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('umavpa2czmex21ln6', 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3', 'Fork Pattern', 'Knight fork opportunity in the center', '[]', 0, NULL, NULL, '2025-08-29 16:36:20');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('r7j7ymadmmex21lng', 'r1bq1rk1/pp2ppbp/3p1np1/8/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQ - 0 9', 'Sicilian Dragon - Yugoslav Attack', 'Sharp line in the Dragon variation leading to opposite-side castling', '[]', 0, NULL, NULL, '2025-08-29 16:36:20');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('7zv2swp9tmex21lnr', 'r1bqkb1r/pp3ppp/2np1n2/1B2p3/2PP4/5N2/PP2PPPP/RNBQK2R b KQkq - 3 6', 'Queen\', 'Classical setup in the Queen\', '[]', 0, NULL, NULL, '2025-08-29 16:36:20');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('mo7pyb7agmex21lo2', 'rnbq1rk1/pp2ppbp/3p1np1/8/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQ - 0 7', 'King\', 'Hypermodern defense with fianchetto bishop', '[]', 0, NULL, NULL, '2025-08-29 16:36:20');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('yqhwko2q5mex21lod', '1', 'Lucena Position', 'Fundamental rook endgame winning technique', '[]', 0, NULL, NULL, '2025-08-29 16:36:20');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('zteswf7iemex21loo', '3', 'Philidor Position', 'Classic defensive setup in rook endgames', '[]', 0, NULL, NULL, '2025-08-29 16:36:20');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('oqix1b4c2mex21loy', '8', 'Opposition in Pawn Endgame', 'Fundamental king and pawn vs king position', '[]', 0, NULL, NULL, '2025-08-29 16:36:20');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('fyrk6d4hlmex21lp9', '8', 'Queen vs Pawn - Stalemate Tricks', 'Tricky defensive resources with advanced pawn', '[]', 0, NULL, NULL, '2025-08-29 16:36:20');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('grg4dj4pgmex21lpk', '4', 'Kasparov vs Deep Blue - Game 6 Critical Position', 'Historic human vs computer endgame position', '[]', 0, NULL, NULL, '2025-08-29 16:36:20');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('1ybb331kqmex21lpz', 'r2qkb1r/pp2nppp/3p4/2pNN1B1/2BnP3/3P4/PPP2PPP/R2bK2R w KQkq - 1 11', 'Fischer\', 'Brilliant sacrificial attack by Bobby Fischer', '[]', 0, NULL, NULL, '2025-08-29 16:36:20');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('bfvga4rxamex21lqb', '4', 'Morphy Opera Box Game', 'Classic mating attack by Paul Morphy', '[]', 0, NULL, NULL, '2025-08-29 16:36:20');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('gtg5jmrnkmex21m0a', 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', 'Starting Position', 'Standard chess starting position', '[]', 0, NULL, NULL, '2025-08-29 16:36:21');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('480zbhhytmex21m0l', '8', 'King vs King', 'Basic endgame practice', '[]', 0, NULL, NULL, '2025-08-29 16:36:21');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('hfdlo4uepmex21m0w', 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4', 'Greek Gift Sacrifice', 'Classic Bxh7+ sacrifice pattern', '[]', 0, NULL, NULL, '2025-08-29 16:36:21');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('g1jitu1kfmex21m17', '8', 'Queen vs Pawn Endgame', 'Queen vs advanced pawn technique', '[]', 0, NULL, NULL, '2025-08-29 16:36:21');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('29vghwr64mex21m1i', '8', 'Rook Endgame', 'Rook and king vs king endgame', '[]', 0, NULL, NULL, '2025-08-29 16:36:21');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('4ayo7ly6fmex21m1s', 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPPNPPP/RNBQKB1R b KQkq - 2 2', 'Fork Pattern', 'Knight fork opportunity', '[]', 0, NULL, NULL, '2025-08-29 16:36:21');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('frapqfdagmex21m23', 'rnbqk2r/pppp1ppp/5n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 4 4', 'Pin Tactic', 'Bishop pin on the knight', '[]', 0, NULL, NULL, '2025-08-29 16:36:21');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('gdyjs4hy3mex21m2e', '1', 'Lucena Position', 'Famous rook endgame winning technique', '[]', 0, NULL, NULL, '2025-08-29 16:36:21');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('s0bn1puhhmex21m2o', '3', 'Philidor Position', 'Key pawn endgame defensive setup', '[]', 0, NULL, NULL, '2025-08-29 16:36:21');
INSERT INTO analysis_positions (id, fen, name, description, best_moves, evaluation, depth, engine_analysis, created_at) VALUES ('2z93wkq8wmex21m2z', '6', 'Back Rank Mate', 'Classic back rank mating pattern', '[]', 0, NULL, NULL, '2025-08-29 16:36:21');

-- Table: endgame_positions
DROP TABLE IF EXISTS endgame_positions;
CREATE TABLE endgame_positions (
          id TEXT PRIMARY KEY,
          fen TEXT NOT NULL,
          name TEXT,
          category TEXT,
          result TEXT, -- win/draw/loss
          key_concepts TEXT, -- JSON array
          solution_moves TEXT, -- JSON array
          theory TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

-- Data for endgame_positions (36 records)
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('qto0msydimewkllwj', '8', 'King + Pawn vs King', 'Basic Endgames', 'unknown', NULL, '[]', 'The most fundamental pawn endgame. The king must escort his loyal pawn to victory while the opposing monarch seeks to stop the advance.', '2025-08-29 08:28:00');
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('exqa63q59mewkllwv', '8', 'Opposition Mastery', 'Basic Endgames', 'unknown', NULL, '[]', 'Learn the crucial concept of opposition - when kings face each other with one square between them.', '2025-08-29 08:28:00');
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('2ug1wccjamewkllx6', '8', 'The Pawn\', 'Basic Endgames', 'unknown', NULL, '[]', 'Master the square of the pawn - the invisible boundary that determines if a king can catch a passed pawn.', '2025-08-29 08:28:00');
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('55rswkfh7mewkllxg', '1', 'Lucena Position', 'Classical Positions', 'unknown', NULL, '[]', 'The most important theoretical rook endgame position. Master the bridge-building technique to convert your advantage.', '2025-08-29 08:28:00');
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('p7f43r2eomewkllxs', '8', 'Philidor Position', 'Classical Positions', 'unknown', NULL, '[]', 'The cornerstone of rook endgame defense. Learn how to hold seemingly lost positions with precise rook placement.', '2025-08-29 08:28:00');
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('ifvdte0wsmewklly3', '8', 'Rook vs Rook + Pawn', 'Rook Endgames', 'unknown', NULL, '[]', 'Classical rook endgame where precise technique is required to convert or hold the extra pawn.', '2025-08-29 08:28:00');
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('140oxvje7mewkllye', '8', 'Queen vs Pawn on 7th', 'Queen Endgames', 'unknown', NULL, '[]', 'When a pawn reaches the 7th rank, special techniques are needed to stop promotion threats.', '2025-08-29 08:28:00');
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('8rz97zh38mewkllyo', '8', 'Queen vs Queen + Pawn', 'Queen Endgames', 'unknown', NULL, '[]', 'The most complex of all endgames. Queen battles where precise calculation determines the outcome.', '2025-08-29 08:28:01');
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('4w8hfh960mewkllyz', '8', 'Bishop vs Knight', 'Minor Piece Endgames', 'unknown', NULL, '[]', 'The classic minor piece battle. Understanding when each piece excels based on pawn structure.', '2025-08-29 08:28:01');
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('4edmic61nmewkllza', '8', 'Knight vs Pawns', 'Minor Piece Endgames', 'unknown', NULL, '[]', 'Can a single knight hold back multiple pawns? Learn the defensive techniques and breakthrough methods.', '2025-08-29 08:28:01');
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('h8h7fbt8imewkllzk', '8', 'Opposite Colored Bishops', 'Bishop Endgames', 'unknown', NULL, '[]', 'The most drawish of endgames. Learn when extra pawns win and when fortress positions hold.', '2025-08-29 08:28:01');
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('rd1p02jy4mewkllzv', '8', 'Wrong Bishop', 'Bishop Endgames', 'unknown', NULL, '[]', 'When your bishop controls the wrong color squares, even extra pawns may not win.', '2025-08-29 08:28:01');
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('xdq2v0ezhmewklm05', '8', 'Pawn Breakthrough', 'Pawn Endgames', 'unknown', NULL, '[]', 'When pawns storm forward together, breakthrough tactics can create unstoppable passed pawns.', '2025-08-29 08:28:01');
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('7vc3s23yhmewklm0f', '8', 'Triangulation', 'Pawn Endgames', 'unknown', NULL, '[]', 'Master the art of losing a tempo to gain the opposition and win pawn endings.', '2025-08-29 08:28:01');
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('i4wl8o4iemewklm0q', '6', 'Rook + Bishop Fortress', 'Fortress Positions', 'unknown', NULL, '[]', 'Sometimes material is meaningless - learn fortress positions that hold against overwhelming odds.', '2025-08-29 08:28:01');
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('6y210p8eymewklm11', '7', 'Réti Study', 'Theoretical Studies', 'unknown', NULL, '[]', 'One of the most famous endgame studies demonstrating the power of the king\', '2025-08-29 08:28:01');
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('v72owxpkbmewklm1c', '8', 'Knight and Pawn vs Knight', 'endgame', 'unknown', NULL, '[]', '', '2025-08-29 08:28:01');
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('6k61d4mzymewklm1m', '7', 'The Reti Miracle', 'endgame', 'unknown', NULL, '[]', '', '2025-08-29 08:28:01');
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('fwqohcqmnmex21lqt', '8', 'King + Pawn vs King', 'Basic Endgames', 'unknown', NULL, '[]', 'The most fundamental pawn endgame. The king must escort his loyal pawn to victory while the opposing monarch seeks to stop the advance.', '2025-08-29 16:36:20');
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('8cxtv45y1mex21lr6', '8', 'Opposition Mastery', 'Basic Endgames', 'unknown', NULL, '[]', 'Learn the crucial concept of opposition - when kings face each other with one square between them.', '2025-08-29 16:36:20');
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('f59xgz92qmex21lri', '8', 'The Pawn\', 'Basic Endgames', 'unknown', NULL, '[]', 'Master the square of the pawn - the invisible boundary that determines if a king can catch a passed pawn.', '2025-08-29 16:36:20');
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('beu9jeiuzmex21lru', '1', 'Lucena Position', 'Classical Positions', 'unknown', NULL, '[]', 'The most important theoretical rook endgame position. Master the bridge-building technique to convert your advantage.', '2025-08-29 16:36:20');
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('dt0lrtok3mex21ls5', '8', 'Philidor Position', 'Classical Positions', 'unknown', NULL, '[]', 'The cornerstone of rook endgame defense. Learn how to hold seemingly lost positions with precise rook placement.', '2025-08-29 16:36:20');
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('upedz5dv4mex21lsg', '8', 'Rook vs Rook + Pawn', 'Rook Endgames', 'unknown', NULL, '[]', 'Classical rook endgame where precise technique is required to convert or hold the extra pawn.', '2025-08-29 16:36:20');
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('lzo4fnjvwmex21lsr', '8', 'Queen vs Pawn on 7th', 'Queen Endgames', 'unknown', NULL, '[]', 'When a pawn reaches the 7th rank, special techniques are needed to stop promotion threats.', '2025-08-29 16:36:20');
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('9tsiy90v0mex21lt2', '8', 'Queen vs Queen + Pawn', 'Queen Endgames', 'unknown', NULL, '[]', 'The most complex of all endgames. Queen battles where precise calculation determines the outcome.', '2025-08-29 16:36:20');
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('9shcepqz2mex21ltd', '8', 'Bishop vs Knight', 'Minor Piece Endgames', 'unknown', NULL, '[]', 'The classic minor piece battle. Understanding when each piece excels based on pawn structure.', '2025-08-29 16:36:20');
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('a741vxwkhmex21lto', '8', 'Knight vs Pawns', 'Minor Piece Endgames', 'unknown', NULL, '[]', 'Can a single knight hold back multiple pawns? Learn the defensive techniques and breakthrough methods.', '2025-08-29 16:36:20');
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('ostvf7te3mex21lu0', '8', 'Opposite Colored Bishops', 'Bishop Endgames', 'unknown', NULL, '[]', 'The most drawish of endgames. Learn when extra pawns win and when fortress positions hold.', '2025-08-29 16:36:20');
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('af63qhe3qmex21lua', '8', 'Wrong Bishop', 'Bishop Endgames', 'unknown', NULL, '[]', 'When your bishop controls the wrong color squares, even extra pawns may not win.', '2025-08-29 16:36:20');
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('08b5xzdaomex21lum', '8', 'Pawn Breakthrough', 'Pawn Endgames', 'unknown', NULL, '[]', 'When pawns storm forward together, breakthrough tactics can create unstoppable passed pawns.', '2025-08-29 16:36:20');
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('uqhh3ekbmmex21luw', '8', 'Triangulation', 'Pawn Endgames', 'unknown', NULL, '[]', 'Master the art of losing a tempo to gain the opposition and win pawn endings.', '2025-08-29 16:36:20');
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('9v4wu34d5mex21lv7', '6', 'Rook + Bishop Fortress', 'Fortress Positions', 'unknown', NULL, '[]', 'Sometimes material is meaningless - learn fortress positions that hold against overwhelming odds.', '2025-08-29 16:36:20');
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('wqs9crdtomex21lvh', '7', 'Réti Study', 'Theoretical Studies', 'unknown', NULL, '[]', 'One of the most famous endgame studies demonstrating the power of the king\', '2025-08-29 16:36:20');
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('jb9zxrvxdmex21lvr', '8', 'Knight and Pawn vs Knight', 'endgame', 'unknown', NULL, '[]', '', '2025-08-29 16:36:20');
INSERT INTO endgame_positions (id, fen, name, category, result, key_concepts, solution_moves, theory, created_at) VALUES ('x8dha9sdcmex21lw3', '7', 'The Reti Miracle', 'endgame', 'unknown', NULL, '[]', '', '2025-08-29 16:36:20');

-- Table: game_review_moves
DROP TABLE IF EXISTS game_review_moves;
CREATE TABLE game_review_moves (
          id TEXT PRIMARY KEY,
          review_id TEXT NOT NULL,
          move_number INTEGER NOT NULL,
          move_notation TEXT,
          comment TEXT,
          evaluation REAL,
          best_move TEXT,
          annotation_symbols TEXT,
          FOREIGN KEY (review_id) REFERENCES game_reviews(id)
        );

-- No data in game_review_moves

-- Table: game_reviews
DROP TABLE IF EXISTS game_reviews;
CREATE TABLE game_reviews (
          id TEXT PRIMARY KEY,
          game_id TEXT NOT NULL,
          reviewer_id TEXT,
          title TEXT,
          description TEXT,
          key_moments TEXT, -- JSON array
          analysis_depth TEXT,
          review_date DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (game_id) REFERENCES games(id),
          FOREIGN KEY (reviewer_id) REFERENCES users(id)
        );

-- No data in game_reviews

-- Table: games
DROP TABLE IF EXISTS games;
CREATE TABLE games (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        ai_level INTEGER NOT NULL,
        user_color TEXT NOT NULL,
        current_fen TEXT NOT NULL,
        pgn TEXT DEFAULT '',
        status TEXT DEFAULT 'active',
        result TEXT,
        time_control TEXT,
        started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        completed_at DATETIME,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );

-- No data in games

-- Table: help_content
DROP TABLE IF EXISTS help_content;
CREATE TABLE help_content (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          content TEXT NOT NULL,
          category TEXT,
          tags TEXT, -- JSON array
          search_keywords TEXT,
          view_count INTEGER DEFAULT 0,
          helpful_votes INTEGER DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

-- Data for help_content (44 records)
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('e22ee5suemewkln2e', 'Basic Controls', '', 'general', '[]', NULL, 0, 0, '2025-08-29 08:28:02', '2025-08-29 08:28:02');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('a217y9mnkmewkln2q', 'First Steps', '', 'general', '[]', NULL, 0, 0, '2025-08-29 08:28:02', '2025-08-29 08:28:02');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('mviwgmeifmewkln3c', 'Strategy', '', 'general', '[]', NULL, 0, 0, '2025-08-29 08:28:02', '2025-08-29 08:28:02');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('owrgbqyycmewkln3n', 'Tactics', '', 'general', '[]', NULL, 0, 0, '2025-08-29 08:28:02', '2025-08-29 08:28:02');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('4zns36ci3mewkln4a', 'Endgame Puzzles', '', 'general', '[]', NULL, 0, 0, '2025-08-29 08:28:02', '2025-08-29 08:28:02');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('f0ntt033emewkln4l', 'Opening Puzzles', '', 'general', '[]', NULL, 0, 0, '2025-08-29 08:28:02', '2025-08-29 08:28:02');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('9gvmiq4tcmewkln5w', 'Account & Settings', 'Manage your profile, preferences, and account settings', 'general', '[]', NULL, 0, 0, '2025-08-29 08:28:02', '2025-08-29 08:28:02');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('cnkdvzfh6mewkln76', 'Compatibility', '', 'general', '[]', NULL, 0, 0, '2025-08-29 08:28:02', '2025-08-29 08:28:02');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('4h2ql8ps7mewkln7i', 'Optimization', '', 'general', '[]', NULL, 0, 0, '2025-08-29 08:28:02', '2025-08-29 08:28:02');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('4hqyycbjtmewkln89', 'Game Issues', '', 'general', '[]', NULL, 0, 0, '2025-08-29 08:28:02', '2025-08-29 08:28:02');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('88n6vs808mewkln9y', 'Welcome to Chess Training - Your Complete Getting Started Guide', 'Everything you need to know to begin your chess training journey, from creating your account to playing your first game.', 'getting-started', '["welcome","getting-started","guide","setup"]', NULL, 0, 0, '2025-08-29 08:28:02', '2025-08-29 08:28:02');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('3y2wzzndpmewklnaj', 'Advanced Engine Analysis: Unlock the Secrets of Master-Level Play', 'Master the art of computer-assisted analysis to find the best moves and understand complex positions deeply.', 'advanced', '["engine","analysis","advanced","improvement","technique"]', NULL, 0, 0, '2025-08-29 08:28:02', '2025-08-29 08:28:02');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('ps6vosye7mewklnb7', 'Accessing Puzzle Training', 'Learn how to start solving tactical puzzles to improve your game.', 'general', '[]', NULL, 0, 0, '2025-08-29 08:28:02', '2025-08-29 08:28:02');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('5lqbrb1t5mewklnbi', 'Contact Support', 'Get help from our support team', 'general', '[]', NULL, 0, 0, '2025-08-29 08:28:02', '2025-08-29 08:28:02');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('b0sbn5laemewklnc6', 'Request Feature', 'Suggest new features', 'general', '[]', NULL, 0, 0, '2025-08-29 08:28:02', '2025-08-29 08:28:02');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('otzgw8usamewklncg', 'Video Tutorials', 'Watch comprehensive video guides', 'general', '[]', NULL, 0, 0, '2025-08-29 08:28:02', '2025-08-29 08:28:02');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('25g8efsb0mewklncq', 'Live Chat', 'Chat with our support team in real-time', 'general', '[]', NULL, 0, 0, '2025-08-29 08:28:02', '2025-08-29 08:28:02');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('ersjpdbubmewklnd1', 'Email Support', 'Send detailed questions via email', 'general', '[]', NULL, 0, 0, '2025-08-29 08:28:02', '2025-08-29 08:28:02');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('5rwckpoibmewklnrn', 'Chess.com puzzle collections', 'Import puzzle sets and tactical trainer collections from Chess.com', 'import', '[]', NULL, 0, 0, '2025-08-29 08:28:03', '2025-08-29 08:28:03');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('ay7zgko2lmewklns8', 'Chess Training App JSON format', 'Native JSON format for full puzzle metadata and collections', 'both', '[]', NULL, 0, 0, '2025-08-29 08:28:03', '2025-08-29 08:28:03');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('focbpef24mex21mvg', 'Getting Started', 'Essential guides for new players to begin their chess journey', 'general', '[]', NULL, 0, 0, '2025-08-29 16:36:22', '2025-08-29 16:36:22');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('ftpv7xurqmex21mwd', 'Gameplay', 'Master the fundamentals and advanced strategies of chess', 'general', '[]', NULL, 0, 0, '2025-08-29 16:36:22', '2025-08-29 16:36:22');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('fn4ufz22mmex21mxa', 'Puzzle Training', 'Improve your tactical skills with our comprehensive puzzle system', 'general', '[]', NULL, 0, 0, '2025-08-29 16:36:22', '2025-08-29 16:36:22');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('8zlvzuglmmex21my6', 'Training & Study', 'Structured learning paths and advanced training tools', 'general', '[]', NULL, 0, 0, '2025-08-29 16:36:22', '2025-08-29 16:36:22');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('cjkm9eletmex21myh', 'Analysis Tools', '', 'general', '[]', NULL, 0, 0, '2025-08-29 16:36:22', '2025-08-29 16:36:22');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('hhtau5qidmex21myt', 'Game Library', '', 'general', '[]', NULL, 0, 0, '2025-08-29 16:36:22', '2025-08-29 16:36:22');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('51asxx574mex21mze', 'Preferences', '', 'general', '[]', NULL, 0, 0, '2025-08-29 16:36:22', '2025-08-29 16:36:22');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('4p44zuhdamex21mzp', 'Security', '', 'general', '[]', NULL, 0, 0, '2025-08-29 16:36:22', '2025-08-29 16:36:22');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('pt7fseu9rmex21n00', 'Technical Support', 'Technical help and system requirements', 'general', '[]', NULL, 0, 0, '2025-08-29 16:36:22', '2025-08-29 16:36:22');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('7j1aegwz8mex21n0x', 'Troubleshooting', 'Solutions to common problems and error messages', 'general', '[]', NULL, 0, 0, '2025-08-29 16:36:22', '2025-08-29 16:36:22');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('1ro8w11fgmex21n1k', 'Interface Problems', '', 'general', '[]', NULL, 0, 0, '2025-08-29 16:36:22', '2025-08-29 16:36:22');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('crps2rd0cmex21n1v', 'Advanced Features', 'Expert-level features and advanced customization options', 'general', '[]', NULL, 0, 0, '2025-08-29 16:36:22', '2025-08-29 16:36:22');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('d7wcn2uq7mex21n27', 'Customization', '', 'general', '[]', NULL, 0, 0, '2025-08-29 16:36:22', '2025-08-29 16:36:22');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('oyn5wwxa7mex21n2i', 'Integrations', '', 'general', '[]', NULL, 0, 0, '2025-08-29 16:36:22', '2025-08-29 16:36:22');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('mohmdjlrqmex21n3i', 'Mastering Tactical Puzzles: Your Key to Chess Improvement', 'Learn how to effectively use our puzzle system to rapidly improve your tactical vision and calculation skills.', 'puzzles', '["puzzles","tactics","training","improvement"]', NULL, 0, 0, '2025-08-29 16:36:22', '2025-08-29 16:36:22');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('laxkmxo1gmex21n43', 'Platform Interface Walkthrough', 'Take an interactive tour of all the platform features and learn how to navigate efficiently.', 'getting-started', '[]', NULL, 0, 0, '2025-08-29 16:36:22', '2025-08-29 16:36:22');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('4fy12khnimex21n51', 'Report a Bug', 'Report technical issues', 'general', '[]', NULL, 0, 0, '2025-08-29 16:36:22', '2025-08-29 16:36:22');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('i6u44zxuxmex21n6j', 'Phone Support', 'Call our support hotline', 'general', '[]', NULL, 0, 0, '2025-08-29 16:36:22', '2025-08-29 16:36:22');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('8blckk3gwmex21n6u', 'Community Forum', 'Get help from the chess training community', 'general', '[]', NULL, 0, 0, '2025-08-29 16:36:22', '2025-08-29 16:36:22');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('rcz5gnd4dmex21n75', 'New Features Available!', '', 'general', '[]', NULL, 0, 0, '2025-08-29 16:36:22', '2025-08-29 16:36:22');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('ufg4vgz3emex21n7g', 'question', 'answer', 'general', '[]', NULL, 0, 0, '2025-08-29 16:36:22', '2025-08-29 16:36:22');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('fvfhk3zxzmex21n7q', 'title', 'description', 'general', '[]', NULL, 0, 0, '2025-08-29 16:36:22', '2025-08-29 16:36:22');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('qz9o1odubmex21nl1', 'Lichess studies and puzzles', 'Import puzzles from Lichess studies, puzzle collections, and individual positions', 'import', '[]', NULL, 0, 0, '2025-08-29 16:36:23', '2025-08-29 16:36:23');
INSERT INTO help_content (id, title, content, category, tags, search_keywords, view_count, helpful_votes, created_at, updated_at) VALUES ('byj7sjahemex21nlx', 'Standard PGN files with FEN positions', 'Import puzzles from PGN files containing FEN positions and solutions', 'both', '[]', NULL, 0, 0, '2025-08-29 16:36:23', '2025-08-29 16:36:23');

-- Table: historic_games
DROP TABLE IF EXISTS historic_games;
CREATE TABLE historic_games (
  id TEXT PRIMARY KEY,
  white_player TEXT NOT NULL,
  black_player TEXT NOT NULL,
  white_rating INTEGER,
  black_rating INTEGER,
  tournament_name TEXT,
  tournament_year INTEGER,
  opening_name TEXT,
  opening_eco TEXT,
  result TEXT,
  pgn TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Data for historic_games (2 records)
INSERT INTO historic_games (id, white_player, black_player, white_rating, black_rating, tournament_name, tournament_year, opening_name, opening_eco, result, pgn, created_at) VALUES ('f854027b-eee5-4936-bc8e-ab34d5ab399d', 'Garry Kasparov', 'Deep Blue', 2785, 2650, 'IBM Match', 1997, 'Sicilian Defense', 'B44', '0-1', '1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 a6 6.Be2 e6 7.f4 Be7 8.Qd2 Qc7 0-1', '2025-08-29 15:57:15');
INSERT INTO historic_games (id, white_player, black_player, white_rating, black_rating, tournament_name, tournament_year, opening_name, opening_eco, result, pgn, created_at) VALUES ('4936d07f-f0d9-42cf-af97-f6f3f9056245', 'Garry Kasparov', 'Deep Blue', 2785, 2650, 'IBM Match', 1997, 'Sicilian Defense', 'B44', '0-1', '1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 a6 6.Be2 e6 7.f4 Be7 8.Qd2 Qc7 0-1', '2025-08-29 15:59:13');

-- Table: learning_modules
DROP TABLE IF EXISTS learning_modules;
CREATE TABLE learning_modules (
          id TEXT PRIMARY KEY,
          learning_path_id TEXT NOT NULL,
          name TEXT NOT NULL,
          description TEXT,
          order_index INTEGER NOT NULL,
          estimated_hours INTEGER,
          module_type TEXT,
          content TEXT, -- JSON
          FOREIGN KEY (learning_path_id) REFERENCES learning_paths(id)
        );

-- No data in learning_modules

-- Table: learning_paths
DROP TABLE IF EXISTS learning_paths;
CREATE TABLE learning_paths (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          description TEXT,
          skill_level TEXT,
          estimated_hours INTEGER,
          prerequisites TEXT, -- JSON array
          learning_objectives TEXT, -- JSON array
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

-- Data for learning_paths (33 records)
INSERT INTO learning_paths (id, name, description, skill_level, estimated_hours, prerequisites, learning_objectives, created_at, updated_at) VALUES ('nu2i5slg3mewklnfk', 'Controlling the Center', 'Why controlling the center is crucial in chess openings', 'beginner', 10, NULL, NULL, '2025-08-29 08:28:02', '2025-08-29 08:28:02');
INSERT INTO learning_paths (id, name, description, skill_level, estimated_hours, prerequisites, learning_objectives, created_at, updated_at) VALUES ('6g3ua88g6mewklnfv', 'Center Control Practice', '', 'beginner', 10, NULL, NULL, '2025-08-29 08:28:02', '2025-08-29 08:28:02');
INSERT INTO learning_paths (id, name, description, skill_level, estimated_hours, prerequisites, learning_objectives, created_at, updated_at) VALUES ('6kiwv9w64mewklng6', 'Piece Development', 'Learn the optimal order for developing your pieces', 'beginner', 10, NULL, NULL, '2025-08-29 08:28:02', '2025-08-29 08:28:02');
INSERT INTO learning_paths (id, name, description, skill_level, estimated_hours, prerequisites, learning_objectives, created_at, updated_at) VALUES ('ceqvhriw4mewklngg', 'King Safety Basics', 'Ensure your king is safe through proper castling and pawn structure', 'beginner', 10, NULL, NULL, '2025-08-29 08:28:02', '2025-08-29 08:28:02');
INSERT INTO learning_paths (id, name, description, skill_level, estimated_hours, prerequisites, learning_objectives, created_at, updated_at) VALUES ('9kvk8ghifmewklni2', 'French Defense', 'Master this solid defensive system', 'beginner', 10, NULL, NULL, '2025-08-29 08:28:03', '2025-08-29 08:28:03');
INSERT INTO learning_paths (id, name, description, skill_level, estimated_hours, prerequisites, learning_objectives, created_at, updated_at) VALUES ('0h6fmwqhsmewklnin', 'Discovery Attacks', 'Master discovered attacks in the opening phase', 'beginner', 10, NULL, NULL, '2025-08-29 08:28:03', '2025-08-29 08:28:03');
INSERT INTO learning_paths (id, name, description, skill_level, estimated_hours, prerequisites, learning_objectives, created_at, updated_at) VALUES ('l58glwkkemewklniy', 'Pins and Forks in Openings', 'Common pin and fork patterns in chess openings', 'beginner', 10, NULL, NULL, '2025-08-29 08:28:03', '2025-08-29 08:28:03');
INSERT INTO learning_paths (id, name, description, skill_level, estimated_hours, prerequisites, learning_objectives, created_at, updated_at) VALUES ('bbdx1jb9ymewklnj9', 'Sacrificial Attacks', 'Learn when and how to sacrifice material for initiative', 'beginner', 10, NULL, NULL, '2025-08-29 08:28:03', '2025-08-29 08:28:03');
INSERT INTO learning_paths (id, name, description, skill_level, estimated_hours, prerequisites, learning_objectives, created_at, updated_at) VALUES ('hhpn654mhmewklnju', 'Modern Opening Developments', 'Latest theoretical developments in popular openings', 'beginner', 10, NULL, NULL, '2025-08-29 08:28:03', '2025-08-29 08:28:03');
INSERT INTO learning_paths (id, name, description, skill_level, estimated_hours, prerequisites, learning_objectives, created_at, updated_at) VALUES ('157v7sl65mewklnk4', 'Computer-Assisted Analysis', 'Use computer analysis to improve your opening preparation', 'beginner', 10, NULL, NULL, '2025-08-29 08:28:03', '2025-08-29 08:28:03');
INSERT INTO learning_paths (id, name, description, skill_level, estimated_hours, prerequisites, learning_objectives, created_at, updated_at) VALUES ('fm29bc37ymewklnkf', 'Tactical Mastery: Intermediate', 'Sharpen your tactical vision with complex combinations and pattern recognition. Master advanced tactical motifs and calculation techniques.', 'Intermediate', 10, NULL, NULL, '2025-08-29 08:28:03', '2025-08-29 08:28:03');
INSERT INTO learning_paths (id, name, description, skill_level, estimated_hours, prerequisites, learning_objectives, created_at, updated_at) VALUES ('p0ehwu5klmewklnkq', 'Complex Combinations', 'Master multi-move tactical sequences', 'beginner', 10, NULL, NULL, '2025-08-29 08:28:03', '2025-08-29 08:28:03');
INSERT INTO learning_paths (id, name, description, skill_level, estimated_hours, prerequisites, learning_objectives, created_at, updated_at) VALUES ('aq3h2z9nxmewklnl1', 'Endgame Excellence', 'Master essential endgame techniques from basic checkmates to complex theoretical positions. Build endgame intuition and calculation skills.', 'Intermediate', 10, NULL, NULL, '2025-08-29 08:28:03', '2025-08-29 08:28:03');
INSERT INTO learning_paths (id, name, description, skill_level, estimated_hours, prerequisites, learning_objectives, created_at, updated_at) VALUES ('1t854ql4jmewklnlb', 'Strategic Thinking: Advanced', 'Develop deep strategic understanding through positional analysis, planning techniques, and grandmaster game studies.', 'Advanced', 10, NULL, NULL, '2025-08-29 08:28:03', '2025-08-29 08:28:03');
INSERT INTO learning_paths (id, name, description, skill_level, estimated_hours, prerequisites, learning_objectives, created_at, updated_at) VALUES ('7uxbsitiamewklnne', 'Tactical Genius', 'Complete 10 tactical lessons with >90% accuracy', 'beginner', 10, NULL, NULL, '2025-08-29 08:28:03', '2025-08-29 08:28:03');
INSERT INTO learning_paths (id, name, description, skill_level, estimated_hours, prerequisites, learning_objectives, created_at, updated_at) VALUES ('76b7qyxnsmewklnno', 'Consistency Champion', 'Maintain a 7-day study streak', 'beginner', 10, NULL, NULL, '2025-08-29 08:28:03', '2025-08-29 08:28:03');
INSERT INTO learning_paths (id, name, description, skill_level, estimated_hours, prerequisites, learning_objectives, created_at, updated_at) VALUES ('2j47lrrwamewklnnz', 'Endgame Master', 'Complete an entire endgame learning path', 'beginner', 10, NULL, NULL, '2025-08-29 08:28:03', '2025-08-29 08:28:03');
INSERT INTO learning_paths (id, name, description, skill_level, estimated_hours, prerequisites, learning_objectives, created_at, updated_at) VALUES ('2kkfqvyo3mewklno9', 'Chess Scholar', 'Study for 100 total hours', 'beginner', 10, NULL, NULL, '2025-08-29 08:28:03', '2025-08-29 08:28:03');
INSERT INTO learning_paths (id, name, description, skill_level, estimated_hours, prerequisites, learning_objectives, created_at, updated_at) VALUES ('lr9ift4jxmewklnoj', 'Grandmaster Student', 'Complete all available learning paths', 'beginner', 10, NULL, NULL, '2025-08-29 08:28:03', '2025-08-29 08:28:03');
INSERT INTO learning_paths (id, name, description, skill_level, estimated_hours, prerequisites, learning_objectives, created_at, updated_at) VALUES ('o1arenth8mewklnp5', 'Perfectionist', 'Achieve 100% score on any lesson', 'beginner', 10, NULL, NULL, '2025-08-29 08:28:03', '2025-08-29 08:28:03');
INSERT INTO learning_paths (id, name, description, skill_level, estimated_hours, prerequisites, learning_objectives, created_at, updated_at) VALUES ('1yajfws89mewklnpg', 'Dedication', 'Maintain a 30-day study streak', 'beginner', 10, NULL, NULL, '2025-08-29 08:28:03', '2025-08-29 08:28:03');
INSERT INTO learning_paths (id, name, description, skill_level, estimated_hours, prerequisites, learning_objectives, created_at, updated_at) VALUES ('0o0bi4qtfmex21n86', 'Opening Mastery: Beginner Edition', 'Master the fundamental chess openings and principles that every player should know. Learn the Italian Game, Ruy Lopez, and essential opening strategies.', 'Beginner', 10, NULL, NULL, '2025-08-29 16:36:22', '2025-08-29 16:36:22');
INSERT INTO learning_paths (id, name, description, skill_level, estimated_hours, prerequisites, learning_objectives, created_at, updated_at) VALUES ('fmjswsy4zmex21n8i', 'Opening Principles', 'Learn the fundamental principles that guide all good opening play', 'beginner', 10, NULL, NULL, '2025-08-29 16:36:22', '2025-08-29 16:36:22');
INSERT INTO learning_paths (id, name, description, skill_level, estimated_hours, prerequisites, learning_objectives, created_at, updated_at) VALUES ('8owp14e6qmex21na1', 'Common Opening Mistakes', 'Avoid the most frequent beginner opening errors', 'beginner', 10, NULL, NULL, '2025-08-29 16:36:22', '2025-08-29 16:36:22');
INSERT INTO learning_paths (id, name, description, skill_level, estimated_hours, prerequisites, learning_objectives, created_at, updated_at) VALUES ('7xnpvatnxmex21nac', 'Popular Openings', 'Master the most common and effective chess openings', 'beginner', 10, NULL, NULL, '2025-08-29 16:36:22', '2025-08-29 16:36:22');
INSERT INTO learning_paths (id, name, description, skill_level, estimated_hours, prerequisites, learning_objectives, created_at, updated_at) VALUES ('aqcgsha65mex21nao', 'The Italian Game', 'Master one of the oldest and most reliable chess openings', 'beginner', 10, NULL, NULL, '2025-08-29 16:36:22', '2025-08-29 16:36:22');
INSERT INTO learning_paths (id, name, description, skill_level, estimated_hours, prerequisites, learning_objectives, created_at, updated_at) VALUES ('nl5he8b2jmex21naz', 'Ruy Lopez Basics', 'Learn the Spanish Opening fundamentals', 'beginner', 10, NULL, NULL, '2025-08-29 16:36:22', '2025-08-29 16:36:22');
INSERT INTO learning_paths (id, name, description, skill_level, estimated_hours, prerequisites, learning_objectives, created_at, updated_at) VALUES ('8e7551j8vmex21nbl', 'Opening Tactical Combinations', 'Learn common tactical motifs that arise from specific openings', 'beginner', 10, NULL, NULL, '2025-08-29 16:36:22', '2025-08-29 16:36:22');
INSERT INTO learning_paths (id, name, description, skill_level, estimated_hours, prerequisites, learning_objectives, created_at, updated_at) VALUES ('0rvz80dygmex21nd3', 'Advanced Opening Theory', 'Deep dive into complex opening variations and modern theory', 'beginner', 10, NULL, NULL, '2025-08-29 16:36:22', '2025-08-29 16:36:22');
INSERT INTO learning_paths (id, name, description, skill_level, estimated_hours, prerequisites, learning_objectives, created_at, updated_at) VALUES ('v4i1qmuddmex21nfa', 'Attack & Defense Mastery', 'Learn the art of attacking the king while defending your own position. Master sacrificial attacks and defensive techniques.', 'Expert', 10, NULL, NULL, '2025-08-29 16:36:22', '2025-08-29 16:36:22');
INSERT INTO learning_paths (id, name, description, skill_level, estimated_hours, prerequisites, learning_objectives, created_at, updated_at) VALUES ('d9bl9xl6rmex21nfl', 'First Steps', 'Completed your first lesson', 'beginner', 10, NULL, NULL, '2025-08-29 16:36:22', '2025-08-29 16:36:22');
INSERT INTO learning_paths (id, name, description, skill_level, estimated_hours, prerequisites, learning_objectives, created_at, updated_at) VALUES ('be9v7t3pmmex21ngt', 'Opening Explorer', 'Complete 5 opening lessons', 'beginner', 10, NULL, NULL, '2025-08-29 16:36:22', '2025-08-29 16:36:22');
INSERT INTO learning_paths (id, name, description, skill_level, estimated_hours, prerequisites, learning_objectives, created_at, updated_at) VALUES ('iorff6cb2mex21nio', 'Speed Learner', 'Complete 5 lessons in a single day', 'beginner', 10, NULL, NULL, '2025-08-29 16:36:22', '2025-08-29 16:36:22');

-- Table: opening_moves
DROP TABLE IF EXISTS opening_moves;
CREATE TABLE opening_moves (
          id TEXT PRIMARY KEY,
          opening_id TEXT NOT NULL,
          move_number INTEGER NOT NULL,
          move_notation TEXT NOT NULL,
          fen_after_move TEXT,
          theory_explanation TEXT,
          FOREIGN KEY (opening_id) REFERENCES openings(id)
        );

-- No data in opening_moves

-- Table: openings
DROP TABLE IF EXISTS openings;
CREATE TABLE openings (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          eco_code TEXT,
          moves TEXT NOT NULL, -- JSON array of moves
          description TEXT,
          popularity_score INTEGER DEFAULT 0,
          difficulty_level TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

-- Data for openings (11 records)
INSERT INTO openings (id, name, eco_code, moves, description, popularity_score, difficulty_level, created_at) VALUES ('njopjwjczmewklm23', 'Sicilian Defense: Najdorf Variation', 'B92', '["e4","c5","Nf3","d6","d4","cxd4","Nxd4","Nf6","Nc3","a6"]', 'The Najdorf is one of the most complex and theoretically rich openings in chess. Black aims for maximum flexibility while maintaining central tension.', 870, 'Master', '2025-08-29 08:28:01');
INSERT INTO openings (id, name, eco_code, moves, description, popularity_score, difficulty_level, created_at) VALUES ('09q54g08tmewklm2d', 'Sicilian Defense: Najdorf Variation, English Attack', 'B90', '["e4","c5","Nf3","d6","d4","cxd4","Nxd4","Nf6","Nc3","a6","Be3","e5"]', 'The English Attack leads to sharp tactical battles with opposite-side castling.', 630, 'Grandmaster', '2025-08-29 08:28:01');
INSERT INTO openings (id, name, eco_code, moves, description, popularity_score, difficulty_level, created_at) VALUES ('g3foqsapbmewklm2n', 'Italian Game', 'C50', '["e4","e5","Nf3","Nc6","Bc4"]', 'Classical opening focusing on rapid development and central control. One of the oldest chess openings.', 1230, 'Intermediate', '2025-08-29 08:28:01');
INSERT INTO openings (id, name, eco_code, moves, description, popularity_score, difficulty_level, created_at) VALUES ('bp3txz0xumewklm3m', 'Queen\', 'D30', '["d4","d5","c4","e6"]', 'One of the most solid defenses against 1.d4, leading to rich middlegame positions.', 920, 'Intermediate', '2025-08-29 08:28:01');
INSERT INTO openings (id, name, eco_code, moves, description, popularity_score, difficulty_level, created_at) VALUES ('75unlfnz1mex21lxg', 'Italian Game: Classical Variation', 'C53', '["e4","e5","Nf3","Nc6","Bc4","Bc5","d3"]', 'Classical development with solid pawn structure and piece coordination.', 780, 'Advanced', '2025-08-29 16:36:20');
INSERT INTO openings (id, name, eco_code, moves, description, popularity_score, difficulty_level, created_at) VALUES ('9pu5w62ohmex21lxr', 'Queen\', 'D37', '["d4","d5","c4","e6","Nc3","Nf6","Nf3"]', 'Solid positional opening with slight initiative for White. Black maintains central pawn.', 690, 'Advanced', '2025-08-29 16:36:20');
INSERT INTO openings (id, name, eco_code, moves, description, popularity_score, difficulty_level, created_at) VALUES ('2g070zh10mex21lyd', 'King\', 'E94', '["d4","Nf6","c4","g6","Nc3","Bg7","e4","d6","Nf3","O-O","Be2"]', 'Hypermodern defense leading to sharp middlegame battles with pawn breaks.', 420, 'Master', '2025-08-29 16:36:20');
INSERT INTO openings (id, name, eco_code, moves, description, popularity_score, difficulty_level, created_at) VALUES ('2jlvg6yhwmex21lyo', 'English Opening: Symmetrical Variation', 'A30', '["c4","c5"]', 'Flexible opening allowing transpositions to many different pawn structures.', 570, 'Advanced', '2025-08-29 16:36:20');
INSERT INTO openings (id, name, eco_code, moves, description, popularity_score, difficulty_level, created_at) VALUES ('3jgoc502zmex21lz0', 'French Defense: Rubinstein Variation', 'C10', '["e4","e6","d4","d5","Nd2"]', 'Solid defense with characteristic pawn chains and piece maneuvering.', 810, 'Intermediate', '2025-08-29 16:36:20');
INSERT INTO openings (id, name, eco_code, moves, description, popularity_score, difficulty_level, created_at) VALUES ('5nnuiyfhdmex21lzk', 'Caro-Kann Defense: Advance Variation', 'B12', '["e4","c6","d4","d5","e5"]', 'Sharp variation leading to space advantage for White and counterplay for Black.', 390, 'Advanced', '2025-08-29 16:36:21');
INSERT INTO openings (id, name, eco_code, moves, description, popularity_score, difficulty_level, created_at) VALUES ('ftw5a2rn1mex21lzt', 'Ruy Lopez: Closed Variation, Chigorin Defense', 'C96', '["e4","e5","Nf3","Nc6","Bb5","a6","Ba4","Nf6","O-O","Be7","Re1","b5","Bb3","d6","c3","O-O","h3","Na5"]', 'Classical Spanish opening with deep positional understanding required.', 280, 'Master', '2025-08-29 16:36:21');

-- Table: puzzle_attempts
DROP TABLE IF EXISTS puzzle_attempts;
CREATE TABLE puzzle_attempts (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        puzzle_id TEXT NOT NULL,
        moves TEXT NOT NULL,
        correct BOOLEAN NOT NULL,
        time_taken INTEGER NOT NULL,
        hints_used INTEGER DEFAULT 0,
        rating_change INTEGER NOT NULL,
        attempted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (puzzle_id) REFERENCES puzzles(id)
      );

-- No data in puzzle_attempts

-- Table: puzzle_sources
DROP TABLE IF EXISTS puzzle_sources;
CREATE TABLE puzzle_sources (
          id TEXT PRIMARY KEY,
          source_id TEXT UNIQUE NOT NULL,
          name TEXT NOT NULL,
          description TEXT,
          total_puzzles INTEGER DEFAULT 0,
          average_rating INTEGER DEFAULT 1500,
          is_active BOOLEAN DEFAULT 1,
          attribution TEXT, -- JSON
          license TEXT,
          url TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

-- Data for puzzle_sources (6 records)
INSERT INTO puzzle_sources (id, source_id, name, description, total_puzzles, average_rating, is_active, attribution, license, url, created_at, updated_at) VALUES ('wmskrupssmewklm8o', 'lichess-database', 'Lichess Puzzle Database', 'Community-curated tactical puzzles from Lichess', 0, 1850, 1, NULL, NULL, NULL, '2025-08-29 08:28:01', '2025-08-29 08:28:01');
INSERT INTO puzzle_sources (id, source_id, name, description, total_puzzles, average_rating, is_active, attribution, license, url, created_at, updated_at) VALUES ('ar6ryv3jsmewklm90', 'chess-com-puzzles', 'Chess.com Puzzle Collection', 'Curated puzzles from Chess.com platform', 0, 1650, 1, NULL, NULL, NULL, '2025-08-29 08:28:01', '2025-08-29 08:28:01');
INSERT INTO puzzle_sources (id, source_id, name, description, total_puzzles, average_rating, is_active, attribution, license, url, created_at, updated_at) VALUES ('871w34jjimewklnso', 'tactical', 'Tactical Puzzles', 'Master tactical motifs and combinations', 0, 800, 1, NULL, NULL, NULL, '2025-08-29 08:28:03', '2025-08-29 08:28:03');
INSERT INTO puzzle_sources (id, source_id, name, description, total_puzzles, average_rating, is_active, attribution, license, url, created_at, updated_at) VALUES ('iikqizbpomewklnsz', 'opening', 'Opening Puzzles', 'Learn opening traps and principles', 0, 900, 1, NULL, NULL, NULL, '2025-08-29 08:28:03', '2025-08-29 08:28:03');
INSERT INTO puzzle_sources (id, source_id, name, description, total_puzzles, average_rating, is_active, attribution, license, url, created_at, updated_at) VALUES ('bt5tnhc0fmewklnta', 'endgame', 'Endgame Puzzles', 'Perfect your endgame technique', 0, 1000, 1, NULL, NULL, NULL, '2025-08-29 08:28:03', '2025-08-29 08:28:03');
INSERT INTO puzzle_sources (id, source_id, name, description, total_puzzles, average_rating, is_active, attribution, license, url, created_at, updated_at) VALUES ('ezhf76piumewklntl', 'custom', 'Custom Puzzles', 'Create and solve custom puzzle sets', 0, 950, 1, NULL, NULL, NULL, '2025-08-29 08:28:03', '2025-08-29 08:28:03');

-- Table: puzzles
DROP TABLE IF EXISTS puzzles;
CREATE TABLE puzzles (
        id TEXT PRIMARY KEY,
        fen TEXT NOT NULL,
        solution_moves TEXT NOT NULL,
        themes TEXT NOT NULL,
        rating INTEGER NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

-- Data for puzzles (40 records)
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('259923b5-1bd0-4fc9-b784-58b54777d90a', 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2', '["Nf3"]', '["opening", "development"]', 1000, 'Develop the knight to control the center', '2025-08-29 14:21:11');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('829bb000-9cc1-445c-a544-0ec328209ddc', 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3', '["Nxe5"]', '["fork", "tactics"]', 1100, 'White to play and win material', '2025-08-29 14:21:11');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('cfa9fd8d-2541-43ed-b823-f7e625cb74c2', 'rnbqkb1r/pppp1ppp/5n2/4p3/4P3/3P4/PPP2PPP/RNBQKBNR b KQkq - 0 3', '["Bb4+"]', '["check", "pin"]', 1150, 'Find the check that creates problems for White', '2025-08-29 14:21:11');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('f7046ae5-ff73-4ecb-a58f-ed5eab8c7625', 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQ - 0 6', '["Nxe5", "Nxe5", "d4"]', '["fork", "attack"]', 1250, 'White to play and win material with a fork', '2025-08-29 14:21:11');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('1f6121ef-edfd-4985-a004-1d64baf9d5a2', 'r2qkb1r/ppp2ppp/2np1n2/2b1p3/2B1P3/3P1N2/PPP1QPPP/RNB1K2R b KQkq - 2 6', '["Bxf2+"]', '["sacrifice", "attack"]', 1300, 'Black sacrifices the bishop for a strong attack', '2025-08-29 14:21:11');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('6bc73a91-193c-4639-87c7-09a8c7a011f5', 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 4 4', '["Ng5"]', '["attack", "weakSquare"]', 1350, 'Target the weak f7 square', '2025-08-29 14:21:11');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('ce627f96-0f5b-4c73-93ea-9597fe5e4c96', 'r2q1rk1/ppp2ppp/2n1bn2/2bpp3/3PP3/2PB1N2/PP3PPP/RNBQ1RK1 w - - 0 8', '["Bxh7+", "Kxh7", "Ng5+"]', '["sacrifice", "attack", "kingAttack"]', 1450, 'Classic bishop sacrifice on h7', '2025-08-29 14:21:11');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('67bf0091-18a0-4bc8-9265-b081fbb36644', 'r1bq1rk1/pp1n1ppp/2p1pn2/3p4/2PP4/P1N2N2/1P2PPPP/R1BQKB1R b KQ c3 0 7', '["dxc4"]', '["capture", "space"]', 1500, 'Capture to gain space and activity', '2025-08-29 14:21:11');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('1fe93fc4-b4d8-4644-b343-1efb74f8ec75', 'r1bqr1k1/pp1n1ppp/2p1pn2/3p4/2PP4/P1N2N2/1PQ1PPPP/R1B1KB1R w KQ - 1 9', '["Ne4"]', '["centralization", "outpost"]', 1550, 'Centralize the knight to a strong outpost', '2025-08-29 14:21:11');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('7454147b-4097-4ff5-af6f-627e77620b9a', 'r2q1rk1/1pp2ppp/p1np1n2/2b1p3/2B1P3/2NP1N2/PPPQ1PPP/R3K2R w KQ - 0 9', '["Bxf7+", "Rxf7", "Qd8+"]', '["sacrifice", "deflection", "backRank"]', 1650, 'Deflect the rook to exploit the back rank', '2025-08-29 14:21:11');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('ae1ea63f-31b1-4e9d-a5ad-3a025f1ebb7e', '2rq1rk1/1p3ppp/p2p1n2/2pP4/4P3/2P2N2/PP1Q1PPP/R4RK1 w - c6 0 15', '["dxc6"]', '["enPassant", "tactics"]', 1700, 'En passant capture opens lines', '2025-08-29 14:21:11');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('4570ee01-4eb5-4be7-88a5-ac5c7f980955', 'r3k2r/1pp2ppp/p1np1q2/4p3/2B1P3/2NP4/PPP2PPP/R2QK2R b KQkq - 0 10', '["Qf2+"]', '["check", "fork"]', 1750, 'Check and fork the king and rook', '2025-08-29 14:21:11');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('227b9689-d14d-4e5b-917e-81a2e43f1636', '2r2rk1/1p2qppp/p2p1n2/2pP4/4P3/2P1BN2/PP1Q1PPP/R4RK1 w - - 0 16', '["Bxh7+", "Nxh7", "Qd4"]', '["sacrifice", "attack", "domination"]', 1850, 'Sacrifice to dominate the dark squares', '2025-08-29 14:21:11');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('68c7667e-d6c0-41c8-ad13-0f040f6263ec', 'r1bq1rk1/pp2nppp/2n1p3/2ppP3/3P4/2PB1N2/PP1N1PPP/R1BQK2R w KQ d6 0 10', '["exd6"]', '["enPassant", "breakthrough"]', 1900, 'En passant creates a passed pawn', '2025-08-29 14:21:11');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('8570a122-9e2a-48ef-9cfa-e3037b004e40', '1r3rk1/5ppp/p2p4/1p1Pp3/4P3/2P2P2/PP4PP/2KR3R w - b6 0 20', '["cxb6"]', '["enPassant", "endgame"]', 1950, 'En passant in the endgame', '2025-08-29 14:21:11');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('e3739c4d-1a44-4d3d-bcc2-6945db44e820', 'rnb1kbnr/pppp1ppp/8/4p3/6Pq/5P2/PPPPP2P/RNBQKBNR w KQkq - 1 3', '["Qf3"]', '["mateIn1", "defense"]', 1200, 'Defend against mate in one', '2025-08-29 14:21:11');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('6d91d28e-f860-4830-90e4-455e13d667b7', '5rk1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1', '["Re8+"]', '["mateIn1", "backRank"]', 1300, 'Back rank mate in one', '2025-08-29 14:21:11');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('9586aed9-3683-409d-8dca-a76923e416ee', '6k1/5ppp/8/8/8/8/5PPP/R6K w - - 0 1', '["Ra8+"]', '["mateIn1", "backRank"]', 1250, 'Simple back rank mate', '2025-08-29 14:21:11');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('fa1c301c-1306-4786-8edd-1407dc04ebea', 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 4 4', '["Bxf7+"]', '["sacrifice", "kingAttack"]', 1400, 'Classical bishop sacrifice', '2025-08-29 14:21:11');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('ab037dcf-d219-42bd-a902-5d49f6f022b7', 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 b - - 0 6', '["Nd4"]', '["fork", "centralization"]', 1500, 'Knight fork from the center', '2025-08-29 14:21:11');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('0bcf33c8-bb17-43ef-83c4-4ca07ad6c7b3', 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4', '["Qxf7#"]', '["Back Rank Mate"]', 1000, 'Scholar''s Mate pattern', '2025-08-29 15:57:15');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('xvw65x8u6mex22fdc', 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4', '["Ng5", "d6", "Nxf7"]', '["Knight Fork"]', 1450, 'A beautiful knight fork that wins material', '2025-08-29 16:36:59');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('y6ba6eekrmex22fdr', '2rq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/3P1N2/PPP1QPPP/RNB2RK1 w - - 0 8', '["Bxf7+"]', '["Sacrifice"]', 1750, 'Classic bishop sacrifice on h7... wait, f7 in this position', '2025-08-29 16:36:59');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('toem2yz8wmex22fe4', 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2', '["d4"]', '["Opening Principles"]', 800, 'Simple but effective center control', '2025-08-29 16:36:59');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('ucit5xhqwmex22feh', '2r3k1/pp3ppp/3p4/3Pp3/1PP5/P4P2/6PP/2R3K1 w - - 0 25', '["c5", "dxc5", "bxc5", "Rxc5", "Rxc5"]', '["Endgame"]', 1950, 'Pawn breakthrough in the endgame to create a passed pawn', '2025-08-29 16:36:59');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('8m3bwz4g9mex22fev', 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP1QPPP/R1B1K2R b KQ - 0 7', '["Nxe4"]', '["Tactics"]', 1500, 'Take advantage of opponent\', '2025-08-29 16:36:59');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('9qnbw0w44mex22ff8', 'r2qk2r/ppp2ppp/2np1n2/2b1p1B1/2B1P1b1/2NP1N2/PPP1QPPP/R3K2R w KQkq - 0 8', '["Bxf7+", "Kxf7", "Qc4+"]', '["Discovery"]', 1850, 'A beautiful double check that wins material', '2025-08-29 16:36:59');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('1ms6exgtmmex22ffr', '8/8/8/8/8/3K4/4R3/4k3 w - - 0 1', '["Re1+", "Kf2", "Re2+", "Kf3", "Re3+"]', '["Rook vs King"]', 1000, 'White to move and deliver checkmate', '2025-08-29 16:36:59');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('yydmy7tm4mex22fg5', '8/8/8/8/8/2QK4/8/2k5 w - - 0 1', '["Qc2+", "Kb1", "Qb3+", "Ka1", "Qb2#"]', '["Queen vs King"]', 1100, 'White to move and deliver checkmate', '2025-08-29 16:36:59');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('jlpgn9t91mex22fgi', '8/8/8/8/8/5K2/6P1/6k1 w - - 0 1', '["g4", "Kh2", "g5", "Kg3", "g6", "Kh4", "g7", "Kh5", "g8=Q"]', '["King and Pawn vs King"]', 1300, 'White to move and promote the pawn', '2025-08-29 16:36:59');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('evo9fhnyxmex22fgw', '8/8/8/8/8/1N1K4/8/1k6 w - - 0 1', '["Nc5", "Ka1", "Kc3", "Kb1", "Nd3+", "Ka1", "Nc1", "Kb1", "Nd3+", "Ka2", "Nb4+"]', '["King and Knight vs King"]', 1600, 'White to move - can you achieve mate?', '2025-08-29 16:36:59');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('qieydb42cmex22fhe', 'rnbqkb1r/pppp1ppp/5n2/4p3/2B1P3/8/PPPP1PPP/RNBQK1NR w KQkq - 2 3', '["Qh5"]', '["Scholar\\"]', 1000, 'White to move - exploit Black\', '2025-08-29 16:36:59');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('jd3v1y752mex22fhs', 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4', '["Ng5"]', '["Fried Liver Attack Setup"]', 1400, 'White to move - set up the famous Fried Liver Attack', '2025-08-29 16:36:59');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('13dd6u5nimex22fi6', 'r1bq1rk1/ppp2ppp/2n1bn2/3pp3/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQ - 0 7', '["cxd5", "exd5", "Nxd5"]', '["Central Tension Release"]', 1700, 'White to move - exploit the central tension', '2025-08-29 16:36:59');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('enfsyahjhmex22fij', 'rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 4', '["cxd5"]', '["Exchange Variation"]', 1500, 'White to move - enter the Exchange Variation', '2025-08-29 16:36:59');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('gwx7p4k94mex22fiw', 'rnbqkb1r/ppp2ppp/5n2/3pp3/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 4', '["exd5"]', '["Central Opening"]', 1200, 'White to move - open the center with a pawn exchange', '2025-08-29 16:36:59');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('vlz4zzxb5mex22fja', 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 4 5', '["Bxf7+"]', '["Legal\\"]', 1800, 'White to move - execute the famous Legal\', '2025-08-29 16:36:59');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('ouk28bncbmex22fjt', 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4', '["Qxf7#"]', '["Back Rank Mate"]', 1200, 'White to move and checkmate in 1', '2025-08-29 16:36:59');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('b5hui2r8ymex22fk7', 'rnbqkbnr/ppp2ppp/4p3/3pP3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3', '["d4", "cxd4"]', '["Fork"]', 1500, 'Black to move and win material', '2025-08-29 16:36:59');
INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description, created_at) VALUES ('omkhl41pfmex22fkl', 'r3k2r/ppp2ppp/2n1bn2/2bpp3/2B1P3/3P1N2/PPP2PPP/RNBQ1RK1 w kq - 0 8', '["Bxf7+", "Kxf7", "Ng5+"]', '["Discovered Attack"]', 1800, 'White to move and win the queen', '2025-08-29 16:36:59');

-- Table: subscriptions
DROP TABLE IF EXISTS subscriptions;
CREATE TABLE subscriptions (
          id TEXT PRIMARY KEY,
          tier TEXT NOT NULL,
          name TEXT NOT NULL,
          price REAL NOT NULL,
          currency TEXT DEFAULT 'USD',
          description TEXT,
          features TEXT, -- JSON array
          limits TEXT, -- JSON object
          is_active BOOLEAN DEFAULT 1,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

-- Data for subscriptions (8 records)
INSERT INTO subscriptions (id, tier, name, price, currency, description, features, limits, is_active, created_at) VALUES ('envvsq272mewklnpv', 'free', 'Free Player', 0, 'USD', 'Perfect for beginners to get started', '["10 puzzles per day","Basic game analysis","Standard piece sets","Community access","Basic statistics"]', NULL, 1, '2025-08-29 08:28:03');
INSERT INTO subscriptions (id, tier, name, price, currency, description, features, limits, is_active, created_at) VALUES ('zh4q1y8zcmewklnq6', 'premium', 'Premium Player', 9.99, 'USD', 'Enhanced features for serious improvement', '["Unlimited puzzles","Advanced game analysis","Premium piece sets & themes","Personal AI coach insights","Detailed progress tracking","Priority support"]', NULL, 1, '2025-08-29 08:28:03');
INSERT INTO subscriptions (id, tier, name, price, currency, description, features, limits, is_active, created_at) VALUES ('eay0aqbdxmewklnqh', 'pro', 'Pro Player', 19.99, 'USD', 'Professional tools for tournament players', '["Everything in Premium","Deep engine analysis (40 moves)","Opening book access","Tournament prep tools","Video lessons library","Custom training plans","Performance analytics","Priority customer support"]', NULL, 1, '2025-08-29 08:28:03');
INSERT INTO subscriptions (id, tier, name, price, currency, description, features, limits, is_active, created_at) VALUES ('0nigaibirmewklnqv', 'grandmaster', 'Grandmaster', 49.99, 'USD', 'Ultimate chess training experience', '["Everything in Pro","Unlimited engine analysis","GM-level training content","Personal coaching sessions","Advanced opening preparation","Tournament database access","Custom study materials","White-glove support"]', NULL, 1, '2025-08-29 08:28:03');
INSERT INTO subscriptions (id, tier, name, price, currency, description, features, limits, is_active, created_at) VALUES ('0ofuwb5domex21njp', 'free', 'Free Player', 0, 'USD', 'Perfect for beginners to get started', '["10 puzzles per day","Basic game analysis","Standard piece sets","Community access","Basic statistics"]', NULL, 1, '2025-08-29 16:36:23');
INSERT INTO subscriptions (id, tier, name, price, currency, description, features, limits, is_active, created_at) VALUES ('o0r7gvtohmex21nk0', 'premium', 'Premium Player', 9.99, 'USD', 'Enhanced features for serious improvement', '["Unlimited puzzles","Advanced game analysis","Premium piece sets & themes","Personal AI coach insights","Detailed progress tracking","Priority support"]', NULL, 1, '2025-08-29 16:36:23');
INSERT INTO subscriptions (id, tier, name, price, currency, description, features, limits, is_active, created_at) VALUES ('3mv6fmuhomex21nkb', 'pro', 'Pro Player', 19.99, 'USD', 'Professional tools for tournament players', '["Everything in Premium","Deep engine analysis (40 moves)","Opening book access","Tournament prep tools","Video lessons library","Custom training plans","Performance analytics","Priority customer support"]', NULL, 1, '2025-08-29 16:36:23');
INSERT INTO subscriptions (id, tier, name, price, currency, description, features, limits, is_active, created_at) VALUES ('1vjao1rglmex21nkl', 'grandmaster', 'Grandmaster', 49.99, 'USD', 'Ultimate chess training experience', '["Everything in Pro","Unlimited engine analysis","GM-level training content","Personal coaching sessions","Advanced opening preparation","Tournament database access","Custom study materials","White-glove support"]', NULL, 1, '2025-08-29 16:36:23');

-- Table: tutorial_steps
DROP TABLE IF EXISTS tutorial_steps;
CREATE TABLE tutorial_steps (
          id TEXT PRIMARY KEY,
          tutorial_id TEXT NOT NULL,
          step_number INTEGER NOT NULL,
          title TEXT,
          content TEXT,
          position_fen TEXT,
          interactive_element TEXT, -- JSON
          FOREIGN KEY (tutorial_id) REFERENCES tutorials(id)
        );

-- No data in tutorial_steps

-- Table: tutorials
DROP TABLE IF EXISTS tutorials;
CREATE TABLE tutorials (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT,
          difficulty_level TEXT,
          estimated_duration INTEGER, -- in minutes
          category TEXT,
          content TEXT, -- JSON or markdown
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

-- Data for tutorials (21 records)
INSERT INTO tutorials (id, title, description, difficulty_level, estimated_duration, category, content, created_at, updated_at) VALUES ('dr6wtf0j4mewklma3', 'Opening Principles Explained', 'Understand the key principles that guide strong opening play in every game.', 'Beginner', 30, 'openings', '{"title":"Opening Principles Explained","id":"opening-principles","description":"Understand the key principles that guide strong opening play in every game.","difficulty":"Beginner","category":"openings","rating":4,"tags":["openings","principles","development","strategy"]}', '2025-08-29 08:28:01', '2025-08-29 08:28:01');
INSERT INTO tutorials (id, title, description, difficulty_level, estimated_duration, category, content, created_at, updated_at) VALUES ('79o1sdbtomewklmbb', 'Complete Beginner Course', 'Everything you need to start your chess journey, from piece movements to basic strategy.', 'Beginner', 30, 'basics', '{"title":"Complete Beginner Course","id":"complete-beginner","description":"Everything you need to start your chess journey, from piece movements to basic strategy.","level":"Beginner","category":"basics"}', '2025-08-29 08:28:01', '2025-08-29 08:28:01');
INSERT INTO tutorials (id, title, description, difficulty_level, estimated_duration, category, content, created_at, updated_at) VALUES ('a57e4ae4jmewklmbm', 'Tactical Mastery Program', 'Comprehensive tactical training to sharpen your combinational vision.', 'Intermediate', 30, 'tactics', '{"title":"Tactical Mastery Program","id":"tactical-mastery","description":"Comprehensive tactical training to sharpen your combinational vision.","level":"Intermediate","category":"tactics"}', '2025-08-29 08:28:01', '2025-08-29 08:28:01');
INSERT INTO tutorials (id, title, description, difficulty_level, estimated_duration, category, content, created_at, updated_at) VALUES ('5qy10j30mmewklmbx', 'Strategic Chess Foundations', 'Build deep positional understanding and strategic thinking skills.', 'Advanced', 30, 'strategy', '{"title":"Strategic Chess Foundations","id":"strategic-foundations","description":"Build deep positional understanding and strategic thinking skills.","level":"Advanced","category":"strategy"}', '2025-08-29 08:28:01', '2025-08-29 08:28:01');
INSERT INTO tutorials (id, title, description, difficulty_level, estimated_duration, category, content, created_at, updated_at) VALUES ('kqtc1n2eemewklmcm', 'Tactical Novice', 'Complete 3 tactical tutorials', 'beginner', 30, 'general', '{"name":"Tactical Novice","id":"tactical_novice","description":"Complete 3 tactical tutorials","tier":"bronze","points":250}', '2025-08-29 08:28:01', '2025-08-29 08:28:01');
INSERT INTO tutorials (id, title, description, difficulty_level, estimated_duration, category, content, created_at, updated_at) VALUES ('6r7jpcxp2mewklmda', 'Speed Learner', 'Complete a tutorial in under 10 minutes', 'beginner', 30, 'general', '{"name":"Speed Learner","id":"speed_learner","description":"Complete a tutorial in under 10 minutes","tier":"gold","points":750}', '2025-08-29 08:28:01', '2025-08-29 08:28:01');
INSERT INTO tutorials (id, title, description, difficulty_level, estimated_duration, category, content, created_at, updated_at) VALUES ('3uba9o9wvmewklmdm', 'Chess Basics: How Pieces Move', 'Complete guide to piece movements', 'beginner', 30, 'general', '{"title":"Chess Basics: How Pieces Move","id":"chess-basics","description":"Complete guide to piece movements"}', '2025-08-29 08:28:01', '2025-08-29 08:28:01');
INSERT INTO tutorials (id, title, description, difficulty_level, estimated_duration, category, content, created_at, updated_at) VALUES ('072z6p1s3mewklmdy', 'Introduction', 'Welcome and overview', 'beginner', 30, 'general', '{"title":"Introduction","description":"Welcome and overview"}', '2025-08-29 08:28:01', '2025-08-29 08:28:01');
INSERT INTO tutorials (id, title, description, difficulty_level, estimated_duration, category, content, created_at, updated_at) VALUES ('0sde8hdgimewklmej', 'Piece Movement', 'Knight, bishop, rook movements', 'beginner', 30, 'general', '{"title":"Piece Movement","description":"Knight, bishop, rook movements"}', '2025-08-29 08:28:01', '2025-08-29 08:28:01');
INSERT INTO tutorials (id, title, description, difficulty_level, estimated_duration, category, content, created_at, updated_at) VALUES ('9vm4q9kc8mewklmet', 'Royal Pieces', 'King and queen movements', 'beginner', 30, 'general', '{"title":"Royal Pieces","description":"King and queen movements"}', '2025-08-29 08:28:01', '2025-08-29 08:28:01');
INSERT INTO tutorials (id, title, description, difficulty_level, estimated_duration, category, content, created_at, updated_at) VALUES ('hfr42f5vqmewklmg1', 'Study Opening Principles', 'Learn how to start your games effectively', 'beginner', 30, 'general', '{"title":"Study Opening Principles","id":"opening-principles","description":"Learn how to start your games effectively"}', '2025-08-29 08:28:01', '2025-08-29 08:28:01');
INSERT INTO tutorials (id, title, description, difficulty_level, estimated_duration, category, content, created_at, updated_at) VALUES ('k7ymtmbbfmex21m3z', 'Common Tactical Patterns', 'Master the most important tactical motifs: pins, forks, skewers, and discovered attacks.', 'Intermediate', 30, 'tactics', '{"title":"Common Tactical Patterns","id":"tactical-patterns","description":"Master the most important tactical motifs: pins, forks, skewers, and discovered attacks.","difficulty":"Intermediate","category":"tactics","rating":4,"tags":["tactics","patterns","combinations","calculation"]}', '2025-08-29 16:36:21', '2025-08-29 16:36:21');
INSERT INTO tutorials (id, title, description, difficulty_level, estimated_duration, category, content, created_at, updated_at) VALUES ('807rzil37mex21m4m', 'Essential Endgame Techniques', 'Learn the most important endgame positions every chess player must know.', 'Intermediate', 30, 'endgames', '{"title":"Essential Endgame Techniques","id":"endgame-basics","description":"Learn the most important endgame positions every chess player must know.","difficulty":"Intermediate","category":"endgames","rating":4,"tags":["endgames","technique","theory","conversion"]}', '2025-08-29 16:36:21', '2025-08-29 16:36:21');
INSERT INTO tutorials (id, title, description, difficulty_level, estimated_duration, category, content, created_at, updated_at) VALUES ('kalmmdm88mex21m4w', 'Understanding Positional Chess', 'Develop your positional understanding with concrete examples and strategic concepts.', 'Advanced', 30, 'strategy', '{"title":"Understanding Positional Chess","id":"positional-play","description":"Develop your positional understanding with concrete examples and strategic concepts.","difficulty":"Advanced","category":"strategy","rating":4,"tags":["strategy","positional","planning","structure"]}', '2025-08-29 16:36:21', '2025-08-29 16:36:21');
INSERT INTO tutorials (id, title, description, difficulty_level, estimated_duration, category, content, created_at, updated_at) VALUES ('515ahvnu3mex21m57', 'Improving Your Calculation', 'Systematic approach to calculating variations accurately and efficiently.', 'Expert', 30, 'tactics', '{"title":"Improving Your Calculation","id":"calculation-skills","description":"Systematic approach to calculating variations accurately and efficiently.","difficulty":"Expert","category":"tactics","rating":4,"tags":["calculation","visualization","analysis","precision"]}', '2025-08-29 16:36:21', '2025-08-29 16:36:21');
INSERT INTO tutorials (id, title, description, difficulty_level, estimated_duration, category, content, created_at, updated_at) VALUES ('n3uxav3itmex21m6g', 'First Steps', 'Complete your first tutorial', 'beginner', 30, 'general', '{"name":"First Steps","id":"first_steps","description":"Complete your first tutorial","tier":"bronze","points":100}', '2025-08-29 16:36:21', '2025-08-29 16:36:21');
INSERT INTO tutorials (id, title, description, difficulty_level, estimated_duration, category, content, created_at, updated_at) VALUES ('0f79pcsr4mex21m74', 'Perfectionist', 'Get perfect scores on 5 tutorial quizzes', 'beginner', 30, 'general', '{"name":"Perfectionist","id":"perfect_score","description":"Get perfect scores on 5 tutorial quizzes","tier":"silver","points":500}', '2025-08-29 16:36:21', '2025-08-29 16:36:21');
INSERT INTO tutorials (id, title, description, difficulty_level, estimated_duration, category, content, created_at, updated_at) VALUES ('62jg2aq2ymex21m8b', 'Pawn Movement', 'How pawns move and capture', 'beginner', 30, 'general', '{"title":"Pawn Movement","description":"How pawns move and capture"}', '2025-08-29 16:36:21', '2025-08-29 16:36:21');
INSERT INTO tutorials (id, title, description, difficulty_level, estimated_duration, category, content, created_at, updated_at) VALUES ('3lf5jmfjvmex21m9a', 'Special Moves', 'Castling and en passant', 'beginner', 30, 'general', '{"title":"Special Moves","description":"Castling and en passant"}', '2025-08-29 16:36:21', '2025-08-29 16:36:21');
INSERT INTO tutorials (id, title, description, difficulty_level, estimated_duration, category, content, created_at, updated_at) VALUES ('pdymnox6amex21m9l', 'Absolute Beginner Path', 'Never played chess? Start here!', 'beginner', 30, 'general', '{"title":"Absolute Beginner Path","id":"absolute_beginner","description":"Never played chess? Start here!"}', '2025-08-29 16:36:21', '2025-08-29 16:36:21');
INSERT INTO tutorials (id, title, description, difficulty_level, estimated_duration, category, content, created_at, updated_at) VALUES ('btd85zg66mex21m9w', 'Practice Against Computer', 'Apply what you learned in a real game', 'beginner', 30, 'general', '{"title":"Practice Against Computer","description":"Apply what you learned in a real game"}', '2025-08-29 16:36:21', '2025-08-29 16:36:21');

-- Table: user_achievements
DROP TABLE IF EXISTS user_achievements;
CREATE TABLE user_achievements (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          achievement_id TEXT NOT NULL,
          earned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          progress REAL DEFAULT 1.0,
          FOREIGN KEY (user_id) REFERENCES users(id),
          FOREIGN KEY (achievement_id) REFERENCES achievements(id),
          UNIQUE(user_id, achievement_id)
        );

-- No data in user_achievements

-- Table: user_analytics
DROP TABLE IF EXISTS user_analytics;
CREATE TABLE user_analytics (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          event_type TEXT NOT NULL,
          event_data TEXT, -- JSON
          session_id TEXT,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id)
        );

-- No data in user_analytics

-- Table: user_profiles
DROP TABLE IF EXISTS user_profiles;
CREATE TABLE user_profiles (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          display_name TEXT,
          avatar_url TEXT,
          bio TEXT,
          country TEXT,
          timezone TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id)
        );

-- Data for user_profiles (18 records)
INSERT INTO user_profiles (id, user_id, display_name, avatar_url, bio, country, timezone, created_at, updated_at) VALUES ('ieot3x38pmewkllf7', 'default_user', 'Tactical Master', NULL, 'Solve 1000 tactical puzzles', 'Unknown', NULL, '2025-08-29 08:28:00', '2025-08-29 08:28:00');
INSERT INTO user_profiles (id, user_id, display_name, avatar_url, bio, country, timezone, created_at, updated_at) VALUES ('bmlqapxjcmewkllfk', 'default_user', 'Endgame Expert', NULL, 'Master 50 endgame patterns', 'Unknown', NULL, '2025-08-29 08:28:00', '2025-08-29 08:28:00');
INSERT INTO user_profiles (id, user_id, display_name, avatar_url, bio, country, timezone, created_at, updated_at) VALUES ('vhci9aqjhmewkllfx', 'default_user', 'Speed Demon', NULL, 'Win 25 blitz games', 'Unknown', NULL, '2025-08-29 08:28:00', '2025-08-29 08:28:00');
INSERT INTO user_profiles (id, user_id, display_name, avatar_url, bio, country, timezone, created_at, updated_at) VALUES ('ffag9c2m7mewkllgd', 'default_user', 'Tournament Warrior', NULL, 'Participate in 10 tournaments', 'Unknown', NULL, '2025-08-29 08:28:00', '2025-08-29 08:28:00');
INSERT INTO user_profiles (id, user_id, display_name, avatar_url, bio, country, timezone, created_at, updated_at) VALUES ('7qqfc5rd7mewkllgs', 'default_user', 'Unknown', NULL, 'Solved tactical puzzle #2847', 'Unknown', NULL, '2025-08-29 08:28:00', '2025-08-29 08:28:00');
INSERT INTO user_profiles (id, user_id, display_name, avatar_url, bio, country, timezone, created_at, updated_at) VALUES ('vu5gpg7yemewkllh6', 'default_user', 'Unknown', NULL, 'Won against AI (Level 8)', 'Unknown', NULL, '2025-08-29 08:28:00', '2025-08-29 08:28:00');
INSERT INTO user_profiles (id, user_id, display_name, avatar_url, bio, country, timezone, created_at, updated_at) VALUES ('0aw539ckbmewkllhl', 'default_user', 'Unknown', NULL, 'Unlocked ', 'Unknown', NULL, '2025-08-29 08:28:00', '2025-08-29 08:28:00');
INSERT INTO user_profiles (id, user_id, display_name, avatar_url, bio, country, timezone, created_at, updated_at) VALUES ('ind9mxwglmewklli1', 'default_user', 'Unknown', NULL, 'Completed endgame lesson', 'Unknown', NULL, '2025-08-29 08:28:00', '2025-08-29 08:28:00');
INSERT INTO user_profiles (id, user_id, display_name, avatar_url, bio, country, timezone, created_at, updated_at) VALUES ('dtut3x02cmewkllie', 'default_user', 'Unknown', NULL, 'Solve puzzles to improve', 'Unknown', NULL, '2025-08-29 08:28:00', '2025-08-29 08:28:00');
INSERT INTO user_profiles (id, user_id, display_name, avatar_url, bio, country, timezone, created_at, updated_at) VALUES ('spuf8fnt0mewkllis', 'default_user', 'Unknown', NULL, 'Challenge the computer', 'Unknown', NULL, '2025-08-29 08:28:00', '2025-08-29 08:28:00');
INSERT INTO user_profiles (id, user_id, display_name, avatar_url, bio, country, timezone, created_at, updated_at) VALUES ('yrt19qynzmewkllj4', 'default_user', 'Unknown', NULL, 'Review your performance', 'Unknown', NULL, '2025-08-29 08:28:00', '2025-08-29 08:28:00');
INSERT INTO user_profiles (id, user_id, display_name, avatar_url, bio, country, timezone, created_at, updated_at) VALUES ('ajwa6z37ymewklljh', 'default_user', 'Unknown', NULL, 'Learn opening theory', 'Unknown', NULL, '2025-08-29 08:28:00', '2025-08-29 08:28:00');
INSERT INTO user_profiles (id, user_id, display_name, avatar_url, bio, country, timezone, created_at, updated_at) VALUES ('kke68qitymex21lcy', 'default_user', 'First Puzzle', NULL, 'Solve your first puzzle', 'Unknown', NULL, '2025-08-29 16:36:20', '2025-08-29 16:36:20');
INSERT INTO user_profiles (id, user_id, display_name, avatar_url, bio, country, timezone, created_at, updated_at) VALUES ('msy5ece1hmex21lde', 'default_user', 'Unknown', NULL, 'Welcome to Chess Training!', 'Unknown', NULL, '2025-08-29 16:36:20', '2025-08-29 16:36:20');
INSERT INTO user_profiles (id, user_id, display_name, avatar_url, bio, country, timezone, created_at, updated_at) VALUES ('is2kdhl05mex21ldp', 'default_user', 'Unknown', NULL, 'Solve puzzles to improve', 'Unknown', NULL, '2025-08-29 16:36:20', '2025-08-29 16:36:20');
INSERT INTO user_profiles (id, user_id, display_name, avatar_url, bio, country, timezone, created_at, updated_at) VALUES ('jtsfataiimex21ldz', 'default_user', 'Unknown', NULL, 'Study tutorials', 'Unknown', NULL, '2025-08-29 16:36:20', '2025-08-29 16:36:20');
INSERT INTO user_profiles (id, user_id, display_name, avatar_url, bio, country, timezone, created_at, updated_at) VALUES ('4b8yclre5mex21lea', 'default_user', 'Unknown', NULL, 'Play against AI', 'Unknown', NULL, '2025-08-29 16:36:20', '2025-08-29 16:36:20');
INSERT INTO user_profiles (id, user_id, display_name, avatar_url, bio, country, timezone, created_at, updated_at) VALUES ('tykg11pp6mex21lel', 'default_user', 'Unknown', NULL, 'View your stats', 'Unknown', NULL, '2025-08-29 16:36:20', '2025-08-29 16:36:20');

-- Table: user_progress
DROP TABLE IF EXISTS user_progress;
CREATE TABLE user_progress (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          current_rating INTEGER DEFAULT 1200,
          puzzles_solved INTEGER DEFAULT 0,
          puzzles_attempted INTEGER DEFAULT 0,
          accuracy_rate REAL DEFAULT 0.0,
          current_streak INTEGER DEFAULT 0,
          best_streak INTEGER DEFAULT 0,
          total_study_time INTEGER DEFAULT 0,
          skill_level TEXT DEFAULT 'beginner',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id)
        );

-- No data in user_progress

-- Table: user_progress_tracking
DROP TABLE IF EXISTS user_progress_tracking;
CREATE TABLE user_progress_tracking (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          learning_path_id TEXT,
          module_id TEXT,
          progress_percentage REAL DEFAULT 0.0,
          time_spent INTEGER DEFAULT 0, -- in seconds
          last_accessed DATETIME,
          completed_at DATETIME,
          FOREIGN KEY (user_id) REFERENCES users(id),
          FOREIGN KEY (learning_path_id) REFERENCES learning_paths(id),
          FOREIGN KEY (module_id) REFERENCES learning_modules(id)
        );

-- No data in user_progress_tracking

-- Table: user_puzzle_preferences
DROP TABLE IF EXISTS user_puzzle_preferences;
CREATE TABLE user_puzzle_preferences (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          preferred_themes TEXT, -- JSON array
          difficulty_range_min INTEGER DEFAULT 1000,
          difficulty_range_max INTEGER DEFAULT 2000,
          time_limit INTEGER DEFAULT 300,
          show_hints BOOLEAN DEFAULT 1,
          auto_next_puzzle BOOLEAN DEFAULT 1,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id)
        );

-- No data in user_puzzle_preferences

-- Table: user_sessions
DROP TABLE IF EXISTS user_sessions;
CREATE TABLE user_sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        refresh_token TEXT NOT NULL,
        expires_at DATETIME NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );

-- Data for user_sessions (2 records)
INSERT INTO user_sessions (id, user_id, refresh_token, expires_at, created_at) VALUES ('21a2dcfb-b3aa-4f4b-82a7-75b88b543a5f', '4c31c867-b8e1-46b8-872c-d8c196cd80f1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0YzMxYzg2Ny1iOGUxLTQ2YjgtODcyYy1kOGMxOTZjZDgwZjEiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjE3NTY0NjM2MTQsImV4cCI6MTc1NzA2ODQxNH0.J6qbKZW8X_s3atCgd3UYiDNs4CFRo7hlX-8wygdiHWQ', '2025-09-05T10:33:34.874Z', '2025-08-29 10:33:34');
INSERT INTO user_sessions (id, user_id, refresh_token, expires_at, created_at) VALUES ('374b47f2-cc0e-4e86-b435-78d6ff00dae0', 'a79d3e19-5ca7-4bc4-a40e-d06f90f222a7', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhNzlkM2UxOS01Y2E3LTRiYzQtYTQwZS1kMDZmOTBmMjIyYTciLCJlbWFpbCI6ImFwaXRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjE3NTY0Njg5NTUsImV4cCI6MTc1NzA3Mzc1NX0.RuaJ1MirAGTqGO4SwoMIuq-cO1EJklp4n8_zUUm2o1M', '2025-09-05T12:02:35.693Z', '2025-08-29 12:02:35');

-- Table: user_settings
DROP TABLE IF EXISTS user_settings;
CREATE TABLE user_settings (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          theme TEXT DEFAULT 'light',
          language TEXT DEFAULT 'en',
          sound_enabled BOOLEAN DEFAULT 1,
          notifications_enabled BOOLEAN DEFAULT 1,
          auto_promote_queen BOOLEAN DEFAULT 1,
          show_legal_moves BOOLEAN DEFAULT 1,
          board_style TEXT DEFAULT 'classic',
          piece_style TEXT DEFAULT 'standard',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id)
        );

-- Data for user_settings (28 records)
INSERT INTO user_settings (id, user_id, theme, language, sound_enabled, notifications_enabled, auto_promote_queen, show_legal_moves, board_style, piece_style, created_at, updated_at) VALUES ('zscgm0o0qmewklllx', 'default_user', 'light', 'en', 1, 1, 1, 1, 'classic', 'standard', '2025-08-29 08:28:00', '2025-08-29 08:28:00');
INSERT INTO user_settings (id, user_id, theme, language, sound_enabled, notifications_enabled, auto_promote_queen, show_legal_moves, board_style, piece_style, created_at, updated_at) VALUES ('i33qjq97fmewkllma', 'default_user', 'light', 'en', 1, 1, 1, 1, 'classic', 'standard', '2025-08-29 08:28:00', '2025-08-29 08:28:00');
INSERT INTO user_settings (id, user_id, theme, language, sound_enabled, notifications_enabled, auto_promote_queen, show_legal_moves, board_style, piece_style, created_at, updated_at) VALUES ('eqqsf5t9fmewkllmm', 'default_user', 'light', 'en', 1, 1, 1, 1, 'classic', 'standard', '2025-08-29 08:28:00', '2025-08-29 08:28:00');
INSERT INTO user_settings (id, user_id, theme, language, sound_enabled, notifications_enabled, auto_promote_queen, show_legal_moves, board_style, piece_style, created_at, updated_at) VALUES ('l7e5z0q6xmewkllmy', 'default_user', 'light', 'en', 1, 1, 1, 1, 'classic', 'standard', '2025-08-29 08:28:00', '2025-08-29 08:28:00');
INSERT INTO user_settings (id, user_id, theme, language, sound_enabled, notifications_enabled, auto_promote_queen, show_legal_moves, board_style, piece_style, created_at, updated_at) VALUES ('8ho95wg29mewkllnb', 'default_user', 'light', 'en', 1, 1, 1, 1, 'classic', 'standard', '2025-08-29 08:28:00', '2025-08-29 08:28:00');
INSERT INTO user_settings (id, user_id, theme, language, sound_enabled, notifications_enabled, auto_promote_queen, show_legal_moves, board_style, piece_style, created_at, updated_at) VALUES ('zcn84ilfdmewkllnn', 'default_user', 'light', 'en', 1, 1, 1, 1, 'classic', 'standard', '2025-08-29 08:28:00', '2025-08-29 08:28:00');
INSERT INTO user_settings (id, user_id, theme, language, sound_enabled, notifications_enabled, auto_promote_queen, show_legal_moves, board_style, piece_style, created_at, updated_at) VALUES ('331ovvcx7mewkllnz', 'default_user', 'light', 'en', 1, 1, 1, 1, 'classic', 'standard', '2025-08-29 08:28:00', '2025-08-29 08:28:00');
INSERT INTO user_settings (id, user_id, theme, language, sound_enabled, notifications_enabled, auto_promote_queen, show_legal_moves, board_style, piece_style, created_at, updated_at) VALUES ('6uav7768xmewkllob', 'default_user', 'light', 'en', 1, 1, 1, 1, 'classic', 'standard', '2025-08-29 08:28:00', '2025-08-29 08:28:00');
INSERT INTO user_settings (id, user_id, theme, language, sound_enabled, notifications_enabled, auto_promote_queen, show_legal_moves, board_style, piece_style, created_at, updated_at) VALUES ('a55x98wbjmewkllon', 'default_user', 'light', 'en', 1, 1, 1, 1, 'classic', 'standard', '2025-08-29 08:28:00', '2025-08-29 08:28:00');
INSERT INTO user_settings (id, user_id, theme, language, sound_enabled, notifications_enabled, auto_promote_queen, show_legal_moves, board_style, piece_style, created_at, updated_at) VALUES ('dzhgkvwwlmewkllp0', 'default_user', 'light', 'en', 1, 1, 1, 1, 'classic', 'standard', '2025-08-29 08:28:00', '2025-08-29 08:28:00');
INSERT INTO user_settings (id, user_id, theme, language, sound_enabled, notifications_enabled, auto_promote_queen, show_legal_moves, board_style, piece_style, created_at, updated_at) VALUES ('7i8781bm8mewkllpb', 'default_user', 'light', 'en', 1, 1, 1, 1, 'classic', 'standard', '2025-08-29 08:28:00', '2025-08-29 08:28:00');
INSERT INTO user_settings (id, user_id, theme, language, sound_enabled, notifications_enabled, auto_promote_queen, show_legal_moves, board_style, piece_style, created_at, updated_at) VALUES ('tz9lwb6uxmewkllpn', 'default_user', 'light', 'en', 1, 1, 1, 1, 'classic', 'standard', '2025-08-29 08:28:00', '2025-08-29 08:28:00');
INSERT INTO user_settings (id, user_id, theme, language, sound_enabled, notifications_enabled, auto_promote_queen, show_legal_moves, board_style, piece_style, created_at, updated_at) VALUES ('2taafygi2mewkllpz', 'default_user', 'light', 'en', 1, 1, 1, 1, 'classic', 'standard', '2025-08-29 08:28:00', '2025-08-29 08:28:00');
INSERT INTO user_settings (id, user_id, theme, language, sound_enabled, notifications_enabled, auto_promote_queen, show_legal_moves, board_style, piece_style, created_at, updated_at) VALUES ('10j85o8wwmewkllqa', 'default_user', 'light', 'en', 1, 1, 1, 1, 'classic', 'standard', '2025-08-29 08:28:00', '2025-08-29 08:28:00');
INSERT INTO user_settings (id, user_id, theme, language, sound_enabled, notifications_enabled, auto_promote_queen, show_legal_moves, board_style, piece_style, created_at, updated_at) VALUES ('1j3ybgz55mex21lgn', 'default_user', 'light', 'en', 1, 1, 1, 1, 'classic', 'standard', '2025-08-29 16:36:20', '2025-08-29 16:36:20');
INSERT INTO user_settings (id, user_id, theme, language, sound_enabled, notifications_enabled, auto_promote_queen, show_legal_moves, board_style, piece_style, created_at, updated_at) VALUES ('h42qx0u97mex21lgy', 'default_user', 'light', 'en', 1, 1, 1, 1, 'classic', 'standard', '2025-08-29 16:36:20', '2025-08-29 16:36:20');
INSERT INTO user_settings (id, user_id, theme, language, sound_enabled, notifications_enabled, auto_promote_queen, show_legal_moves, board_style, piece_style, created_at, updated_at) VALUES ('e2w75rq0xmex21lh9', 'default_user', 'light', 'en', 1, 1, 1, 1, 'classic', 'standard', '2025-08-29 16:36:20', '2025-08-29 16:36:20');
INSERT INTO user_settings (id, user_id, theme, language, sound_enabled, notifications_enabled, auto_promote_queen, show_legal_moves, board_style, piece_style, created_at, updated_at) VALUES ('fqivzt28kmex21lhk', 'default_user', 'light', 'en', 1, 1, 1, 1, 'classic', 'standard', '2025-08-29 16:36:20', '2025-08-29 16:36:20');
INSERT INTO user_settings (id, user_id, theme, language, sound_enabled, notifications_enabled, auto_promote_queen, show_legal_moves, board_style, piece_style, created_at, updated_at) VALUES ('n9b8nqpwzmex21lhv', 'default_user', 'light', 'en', 1, 1, 1, 1, 'classic', 'standard', '2025-08-29 16:36:20', '2025-08-29 16:36:20');
INSERT INTO user_settings (id, user_id, theme, language, sound_enabled, notifications_enabled, auto_promote_queen, show_legal_moves, board_style, piece_style, created_at, updated_at) VALUES ('qjph2sadrmex21li6', 'default_user', 'light', 'en', 1, 1, 1, 1, 'classic', 'standard', '2025-08-29 16:36:20', '2025-08-29 16:36:20');
INSERT INTO user_settings (id, user_id, theme, language, sound_enabled, notifications_enabled, auto_promote_queen, show_legal_moves, board_style, piece_style, created_at, updated_at) VALUES ('kyiiekih3mex21lih', 'default_user', 'light', 'en', 1, 1, 1, 1, 'classic', 'standard', '2025-08-29 16:36:20', '2025-08-29 16:36:20');
INSERT INTO user_settings (id, user_id, theme, language, sound_enabled, notifications_enabled, auto_promote_queen, show_legal_moves, board_style, piece_style, created_at, updated_at) VALUES ('itmd1676amex21lir', 'default_user', 'light', 'en', 1, 1, 1, 1, 'classic', 'standard', '2025-08-29 16:36:20', '2025-08-29 16:36:20');
INSERT INTO user_settings (id, user_id, theme, language, sound_enabled, notifications_enabled, auto_promote_queen, show_legal_moves, board_style, piece_style, created_at, updated_at) VALUES ('4qrdue9hxmex21lj2', 'default_user', 'light', 'en', 1, 1, 1, 1, 'classic', 'standard', '2025-08-29 16:36:20', '2025-08-29 16:36:20');
INSERT INTO user_settings (id, user_id, theme, language, sound_enabled, notifications_enabled, auto_promote_queen, show_legal_moves, board_style, piece_style, created_at, updated_at) VALUES ('h08ghrliwmex21ljd', 'default_user', 'light', 'en', 1, 1, 1, 1, 'classic', 'standard', '2025-08-29 16:36:20', '2025-08-29 16:36:20');
INSERT INTO user_settings (id, user_id, theme, language, sound_enabled, notifications_enabled, auto_promote_queen, show_legal_moves, board_style, piece_style, created_at, updated_at) VALUES ('j4g03cc40mex21ljn', 'default_user', 'light', 'en', 1, 1, 1, 1, 'classic', 'standard', '2025-08-29 16:36:20', '2025-08-29 16:36:20');
INSERT INTO user_settings (id, user_id, theme, language, sound_enabled, notifications_enabled, auto_promote_queen, show_legal_moves, board_style, piece_style, created_at, updated_at) VALUES ('kl6wi8hvmmex21ljx', 'default_user', 'light', 'en', 1, 1, 1, 1, 'classic', 'standard', '2025-08-29 16:36:20', '2025-08-29 16:36:20');
INSERT INTO user_settings (id, user_id, theme, language, sound_enabled, notifications_enabled, auto_promote_queen, show_legal_moves, board_style, piece_style, created_at, updated_at) VALUES ('2lut73ra6mex21lk8', 'default_user', 'light', 'en', 1, 1, 1, 1, 'classic', 'standard', '2025-08-29 16:36:20', '2025-08-29 16:36:20');
INSERT INTO user_settings (id, user_id, theme, language, sound_enabled, notifications_enabled, auto_promote_queen, show_legal_moves, board_style, piece_style, created_at, updated_at) VALUES ('19juw1zqvmex21lkj', 'default_user', 'light', 'en', 1, 1, 1, 1, 'classic', 'standard', '2025-08-29 16:36:20', '2025-08-29 16:36:20');

-- Table: user_study_plans
DROP TABLE IF EXISTS user_study_plans;
CREATE TABLE user_study_plans (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          name TEXT NOT NULL,
          description TEXT,
          target_rating INTEGER,
          estimated_weeks INTEGER,
          is_active BOOLEAN DEFAULT 1,
          current_module TEXT,
          progress REAL DEFAULT 0.0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id)
        );

-- No data in user_study_plans

-- Table: users
DROP TABLE IF EXISTS users;
CREATE TABLE users (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        chess_elo INTEGER DEFAULT 1000,
        puzzle_rating INTEGER DEFAULT 1000,
        preferences TEXT DEFAULT '{}',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

-- Data for users (4 records)
INSERT INTO users (id, username, email, password_hash, chess_elo, puzzle_rating, preferences, created_at, updated_at) VALUES ('4c31c867-b8e1-46b8-872c-d8c196cd80f1', 'testuser', 'test@example.com', '$2b$10$GOsvEmPe03AM3mWQnfCFZOkDJGC.ciUcuuvcI.BmDu.UOU9PrUmWu', 1000, 1000, '{}', '2025-08-29 10:33:24', '2025-08-29 10:33:24');
INSERT INTO users (id, username, email, password_hash, chess_elo, puzzle_rating, preferences, created_at, updated_at) VALUES ('a79d3e19-5ca7-4bc4-a40e-d06f90f222a7', 'apitest', 'apitest@example.com', '$2b$10$AugMl.eX9Zo97in094QvfO/KqFf7PsVjmOBxxEZ2ZZNxdA0.uMOuK', 1000, 1000, '{}', '2025-08-29 12:01:00', '2025-08-29 12:01:00');
INSERT INTO users (id, username, email, password_hash, chess_elo, puzzle_rating, preferences, created_at, updated_at) VALUES ('1f0b8b68-b59f-4522-b960-b75ea7b786fe', 'demo_player', 'demo@chess.local', 'hashed_password_here', 1200, 1200, '{}', '2025-08-29 15:59:13', '2025-08-29 15:59:13');
INSERT INTO users (id, username, email, password_hash, chess_elo, puzzle_rating, preferences, created_at, updated_at) VALUES ('85c903aa-7d1c-4e9b-8dbf-750b6ed86620', 'chess_master', 'master@chess.local', 'hashed_password_here', 2000, 1800, '{}', '2025-08-29 15:59:13', '2025-08-29 15:59:13');

-- Indexes
CREATE INDEX idx_games_user_id ON games(user_id);
CREATE INDEX idx_games_status ON games(status);
CREATE INDEX idx_puzzle_attempts_user_id ON puzzle_attempts(user_id);
CREATE INDEX idx_puzzle_attempts_puzzle_id ON puzzle_attempts(puzzle_id);
CREATE INDEX idx_puzzles_rating ON puzzles(rating);
CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_user_sessions_token ON user_sessions(refresh_token);


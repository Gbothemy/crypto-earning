-- ============================================
-- COMPLETE DATABASE SCHEMA - ALL FEATURES
-- Crypto Earning Platform
-- ============================================
-- Run this in Supabase SQL Editor
-- Includes: Users, Balances, Tasks, Notifications, Achievements, and more
-- ============================================

-- ============================================
-- 1. USERS TABLE (Enhanced)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  user_id VARCHAR(50) UNIQUE NOT NULL,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  avatar VARCHAR(10),
  is_admin BOOLEAN DEFAULT FALSE,
  
  -- Game Progress
  points INTEGER DEFAULT 0,
  vip_level INTEGER DEFAULT 1,
  exp INTEGER DEFAULT 0,
  max_exp INTEGER DEFAULT 1000,
  gift_points INTEGER DEFAULT 0,
  completed_tasks INTEGER DEFAULT 0,
  
  -- Streaks & Activity
  day_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_claim TIMESTAMP,
  last_login TIMESTAMP,
  
  -- Statistics
  total_games_played INTEGER DEFAULT 0,
  total_earnings_ton DECIMAL(18, 8) DEFAULT 0,
  total_earnings_cati DECIMAL(18, 8) DEFAULT 0,
  total_earnings_usdt DECIMAL(18, 8) DEFAULT 0,
  
  -- Profile
  bio TEXT,
  favorite_game VARCHAR(50),
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 2. BALANCES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS balances (
  id BIGSERIAL PRIMARY KEY,
  user_id VARCHAR(50) UNIQUE NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  ton DECIMAL(18, 8) DEFAULT 0,
  cati DECIMAL(18, 8) DEFAULT 0,
  usdt DECIMAL(18, 8) DEFAULT 0,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 3. TASKS TABLE (NEW)
-- ============================================
CREATE TABLE IF NOT EXISTS tasks (
  id BIGSERIAL PRIMARY KEY,
  task_id VARCHAR(50) UNIQUE NOT NULL,
  task_type VARCHAR(20) NOT NULL, -- 'daily', 'weekly', 'monthly'
  name VARCHAR(100) NOT NULL,
  description TEXT,
  reward_points INTEGER DEFAULT 0,
  requirement_type VARCHAR(50), -- 'login', 'games', 'points', 'referrals', etc.
  requirement_value INTEGER DEFAULT 1,
  icon VARCHAR(10),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 4. USER TASKS TABLE (NEW)
-- ============================================
CREATE TABLE IF NOT EXISTS user_tasks (
  id BIGSERIAL PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  task_id VARCHAR(50) NOT NULL REFERENCES tasks(task_id) ON DELETE CASCADE,
  progress INTEGER DEFAULT 0,
  is_completed BOOLEAN DEFAULT FALSE,
  is_claimed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP,
  claimed_at TIMESTAMP,
  reset_date DATE DEFAULT CURRENT_DATE,
  UNIQUE(user_id, task_id, reset_date)
);

-- ============================================
-- 5. NOTIFICATIONS TABLE (NEW)
-- ============================================
CREATE TABLE IF NOT EXISTS notifications (
  id BIGSERIAL PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  notification_type VARCHAR(50) NOT NULL, -- 'success', 'achievement', 'level', 'referral', 'event', 'info'
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  icon VARCHAR(10),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 6. ACHIEVEMENTS TABLE (Enhanced)
-- ============================================
CREATE TABLE IF NOT EXISTS achievements (
  id BIGSERIAL PRIMARY KEY,
  achievement_id VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  category VARCHAR(50), -- 'starter', 'points', 'games', 'streak', 'social', 'vip', 'special'
  icon VARCHAR(10),
  requirement_type VARCHAR(50),
  requirement_value INTEGER,
  reward_points INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 7. USER ACHIEVEMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_achievements (
  id BIGSERIAL PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  achievement_id VARCHAR(50) NOT NULL REFERENCES achievements(achievement_id) ON DELETE CASCADE,
  unlocked_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- ============================================
-- 8. WITHDRAWAL REQUESTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS withdrawal_requests (
  id VARCHAR(50) PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  username VARCHAR(100),
  currency VARCHAR(10),
  amount DECIMAL(18, 8),
  wallet_address TEXT,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  request_date TIMESTAMP DEFAULT NOW(),
  processed_date TIMESTAMP,
  processed_by VARCHAR(100),
  rejection_reason TEXT
);

-- ============================================
-- 9. GAME PLAYS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS game_plays (
  id BIGSERIAL PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  game_type VARCHAR(50),
  points_earned INTEGER DEFAULT 0,
  play_date DATE DEFAULT CURRENT_DATE,
  plays_count INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, game_type, play_date)
);

-- ============================================
-- 10. REFERRALS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS referrals (
  id BIGSERIAL PRIMARY KEY,
  referrer_id VARCHAR(50) NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  referred_id VARCHAR(50) NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  referral_code VARCHAR(50),
  commission_earned DECIMAL(18, 8) DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(referred_id)
);

-- ============================================
-- 11. DAILY REWARDS TABLE (NEW)
-- ============================================
CREATE TABLE IF NOT EXISTS daily_rewards (
  id BIGSERIAL PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  claim_date DATE DEFAULT CURRENT_DATE,
  points_earned INTEGER DEFAULT 0,
  ton_earned DECIMAL(18, 8) DEFAULT 0,
  cati_earned DECIMAL(18, 8) DEFAULT 0,
  usdt_earned DECIMAL(18, 8) DEFAULT 0,
  streak_day INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, claim_date)
);

-- ============================================
-- 12. VIP TIERS TABLE (NEW)
-- ============================================
CREATE TABLE IF NOT EXISTS vip_tiers (
  id BIGSERIAL PRIMARY KEY,
  tier_name VARCHAR(50) UNIQUE NOT NULL,
  min_level INTEGER NOT NULL,
  max_level INTEGER NOT NULL,
  cooldown_reduction DECIMAL(5, 2) DEFAULT 0, -- Percentage
  conversion_rate INTEGER DEFAULT 10000, -- Points per CATI
  bonus_multiplier DECIMAL(5, 2) DEFAULT 1.0,
  icon VARCHAR(10),
  color VARCHAR(20),
  benefits JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 13. USER ACTIVITY LOG TABLE (NEW)
-- ============================================
CREATE TABLE IF NOT EXISTS user_activity_log (
  id BIGSERIAL PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  activity_type VARCHAR(50) NOT NULL, -- 'game_play', 'task_complete', 'level_up', 'withdrawal', etc.
  activity_description TEXT,
  points_change INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 14. CONVERSION HISTORY TABLE (NEW)
-- ============================================
CREATE TABLE IF NOT EXISTS conversion_history (
  id BIGSERIAL PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  points_converted INTEGER NOT NULL,
  currency VARCHAR(10) NOT NULL,
  amount_received DECIMAL(18, 8) NOT NULL,
  conversion_rate INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 15. NOTIFICATION PREFERENCES TABLE (NEW)
-- ============================================
CREATE TABLE IF NOT EXISTS notification_preferences (
  id BIGSERIAL PRIMARY KEY,
  user_id VARCHAR(50) UNIQUE NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  withdrawal_updates BOOLEAN DEFAULT TRUE,
  achievement_unlocks BOOLEAN DEFAULT TRUE,
  level_up_notifications BOOLEAN DEFAULT TRUE,
  referral_earnings BOOLEAN DEFAULT TRUE,
  special_events BOOLEAN DEFAULT TRUE,
  email_notifications BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 16. AIRDROP CLAIMS TABLE (NEW)
-- ============================================
CREATE TABLE IF NOT EXISTS airdrop_claims (
  id BIGSERIAL PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  claim_date DATE DEFAULT CURRENT_DATE,
  ton_earned DECIMAL(18, 8) DEFAULT 0,
  cati_earned DECIMAL(18, 8) DEFAULT 0,
  usdt_earned DECIMAL(18, 8) DEFAULT 0,
  points_earned INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, claim_date)
);

-- ============================================
-- 17. FRIENDS TABLE (NEW)
-- ============================================
CREATE TABLE IF NOT EXISTS friends (
  id BIGSERIAL PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  friend_id VARCHAR(50) NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'accepted', 'blocked'
  created_at TIMESTAMP DEFAULT NOW(),
  accepted_at TIMESTAMP,
  UNIQUE(user_id, friend_id),
  CHECK (user_id != friend_id)
);

-- ============================================
-- 18. TOURNAMENTS TABLE (NEW)
-- ============================================
CREATE TABLE IF NOT EXISTS tournaments (
  id BIGSERIAL PRIMARY KEY,
  tournament_id VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  game_type VARCHAR(50),
  entry_fee INTEGER DEFAULT 0, -- Points or crypto
  prize_pool INTEGER DEFAULT 0,
  max_participants INTEGER DEFAULT 100,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  status VARCHAR(20) DEFAULT 'upcoming', -- 'upcoming', 'active', 'completed', 'cancelled'
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 19. TOURNAMENT PARTICIPANTS TABLE (NEW)
-- ============================================
CREATE TABLE IF NOT EXISTS tournament_participants (
  id BIGSERIAL PRIMARY KEY,
  tournament_id VARCHAR(50) NOT NULL REFERENCES tournaments(tournament_id) ON DELETE CASCADE,
  user_id VARCHAR(50) NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  score INTEGER DEFAULT 0,
  rank INTEGER,
  prize_won INTEGER DEFAULT 0,
  joined_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(tournament_id, user_id)
);

-- ============================================
-- 20. GIFT TRANSACTIONS TABLE (NEW)
-- ============================================
CREATE TABLE IF NOT EXISTS gift_transactions (
  id BIGSERIAL PRIMARY KEY,
  sender_id VARCHAR(50) NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  receiver_id VARCHAR(50) NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  gift_type VARCHAR(20) NOT NULL, -- 'points', 'ton', 'cati', 'usdt'
  amount DECIMAL(18, 8) NOT NULL,
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  CHECK (sender_id != receiver_id)
);

-- ============================================
-- 21. LEADERBOARD CACHE TABLE (NEW)
-- ============================================
CREATE TABLE IF NOT EXISTS leaderboard_cache (
  id BIGSERIAL PRIMARY KEY,
  leaderboard_type VARCHAR(50) NOT NULL, -- 'points', 'vip_level', 'streak', 'games', 'earnings'
  user_id VARCHAR(50) NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  rank INTEGER NOT NULL,
  value DECIMAL(18, 8) NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(leaderboard_type, user_id)
);

-- ============================================
-- 22. PROFILE CUSTOMIZATION TABLE (NEW)
-- ============================================
CREATE TABLE IF NOT EXISTS profile_customization (
  id BIGSERIAL PRIMARY KEY,
  user_id VARCHAR(50) UNIQUE NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  avatar_url TEXT,
  banner_url TEXT,
  theme VARCHAR(50) DEFAULT 'default', -- 'default', 'dark', 'blue', 'purple', 'gold'
  badge_display JSONB, -- Array of badge IDs to display
  social_links JSONB, -- {twitter, telegram, discord, etc.}
  privacy_settings JSONB, -- {show_stats, show_achievements, show_friends}
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 23. SEASONAL EVENTS TABLE (NEW)
-- ============================================
CREATE TABLE IF NOT EXISTS seasonal_events (
  id BIGSERIAL PRIMARY KEY,
  event_id VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  event_type VARCHAR(50), -- 'holiday', 'special', 'limited'
  bonus_multiplier DECIMAL(5, 2) DEFAULT 1.0,
  special_rewards JSONB,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 24. EVENT PARTICIPATION TABLE (NEW)
-- ============================================
CREATE TABLE IF NOT EXISTS event_participation (
  id BIGSERIAL PRIMARY KEY,
  event_id VARCHAR(50) NOT NULL REFERENCES seasonal_events(event_id) ON DELETE CASCADE,
  user_id VARCHAR(50) NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  points_earned INTEGER DEFAULT 0,
  tasks_completed INTEGER DEFAULT 0,
  rewards_claimed JSONB,
  joined_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Users indexes
CREATE INDEX IF NOT EXISTS idx_users_user_id ON users(user_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_points ON users(points DESC);
CREATE INDEX IF NOT EXISTS idx_users_vip_level ON users(vip_level DESC);
CREATE INDEX IF NOT EXISTS idx_users_day_streak ON users(day_streak DESC);

-- Balances indexes
CREATE INDEX IF NOT EXISTS idx_balances_user_id ON balances(user_id);

-- Tasks indexes
CREATE INDEX IF NOT EXISTS idx_tasks_type ON tasks(task_type);
CREATE INDEX IF NOT EXISTS idx_tasks_active ON tasks(is_active);

-- User tasks indexes
CREATE INDEX IF NOT EXISTS idx_user_tasks_user_id ON user_tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_user_tasks_completed ON user_tasks(is_completed);
CREATE INDEX IF NOT EXISTS idx_user_tasks_claimed ON user_tasks(is_claimed);

-- Notifications indexes
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created ON notifications(created_at DESC);

-- Achievements indexes
CREATE INDEX IF NOT EXISTS idx_achievements_category ON achievements(category);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);

-- Withdrawals indexes
CREATE INDEX IF NOT EXISTS idx_withdrawals_user_id ON withdrawal_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_withdrawals_status ON withdrawal_requests(status);
CREATE INDEX IF NOT EXISTS idx_withdrawals_date ON withdrawal_requests(request_date DESC);

-- Game plays indexes
CREATE INDEX IF NOT EXISTS idx_game_plays_user_date ON game_plays(user_id, play_date);
CREATE INDEX IF NOT EXISTS idx_game_plays_type ON game_plays(game_type);

-- Referrals indexes
CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referred ON referrals(referred_id);

-- Daily rewards indexes
CREATE INDEX IF NOT EXISTS idx_daily_rewards_user_date ON daily_rewards(user_id, claim_date);

-- Activity log indexes
CREATE INDEX IF NOT EXISTS idx_activity_log_user_id ON user_activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_created ON user_activity_log(created_at DESC);

-- Conversion history indexes
CREATE INDEX IF NOT EXISTS idx_conversion_user_id ON conversion_history(user_id);
CREATE INDEX IF NOT EXISTS idx_conversion_created ON conversion_history(created_at DESC);

-- Airdrop claims indexes
CREATE INDEX IF NOT EXISTS idx_airdrop_user_date ON airdrop_claims(user_id, claim_date);

-- Friends indexes
CREATE INDEX IF NOT EXISTS idx_friends_user_id ON friends(user_id);
CREATE INDEX IF NOT EXISTS idx_friends_friend_id ON friends(friend_id);
CREATE INDEX IF NOT EXISTS idx_friends_status ON friends(status);

-- Tournaments indexes
CREATE INDEX IF NOT EXISTS idx_tournaments_status ON tournaments(status);
CREATE INDEX IF NOT EXISTS idx_tournaments_dates ON tournaments(start_date, end_date);

-- Tournament participants indexes
CREATE INDEX IF NOT EXISTS idx_tournament_participants_tournament ON tournament_participants(tournament_id);
CREATE INDEX IF NOT EXISTS idx_tournament_participants_user ON tournament_participants(user_id);
CREATE INDEX IF NOT EXISTS idx_tournament_participants_rank ON tournament_participants(rank);

-- Gift transactions indexes
CREATE INDEX IF NOT EXISTS idx_gift_sender ON gift_transactions(sender_id);
CREATE INDEX IF NOT EXISTS idx_gift_receiver ON gift_transactions(receiver_id);
CREATE INDEX IF NOT EXISTS idx_gift_created ON gift_transactions(created_at DESC);

-- Leaderboard cache indexes
CREATE INDEX IF NOT EXISTS idx_leaderboard_type_rank ON leaderboard_cache(leaderboard_type, rank);
CREATE INDEX IF NOT EXISTS idx_leaderboard_user ON leaderboard_cache(user_id);

-- Seasonal events indexes
CREATE INDEX IF NOT EXISTS idx_events_active ON seasonal_events(is_active);
CREATE INDEX IF NOT EXISTS idx_events_dates ON seasonal_events(start_date, end_date);

-- Event participation indexes
CREATE INDEX IF NOT EXISTS idx_event_participation_event ON event_participation(event_id);
CREATE INDEX IF NOT EXISTS idx_event_participation_user ON event_participation(user_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE withdrawal_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_plays ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE vip_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversion_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE airdrop_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE friends ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournament_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_customization ENABLE ROW LEVEL SECURITY;
ALTER TABLE seasonal_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_participation ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES (Allow all for development)
-- ============================================

-- Users policies
DROP POLICY IF EXISTS "Allow all operations on users" ON users;
CREATE POLICY "Allow all operations on users" ON users FOR ALL USING (true);

-- Balances policies
DROP POLICY IF EXISTS "Allow all operations on balances" ON balances;
CREATE POLICY "Allow all operations on balances" ON balances FOR ALL USING (true);

-- Tasks policies
DROP POLICY IF EXISTS "Allow all operations on tasks" ON tasks;
CREATE POLICY "Allow all operations on tasks" ON tasks FOR ALL USING (true);

-- User tasks policies
DROP POLICY IF EXISTS "Allow all operations on user_tasks" ON user_tasks;
CREATE POLICY "Allow all operations on user_tasks" ON user_tasks FOR ALL USING (true);

-- Notifications policies
DROP POLICY IF EXISTS "Allow all operations on notifications" ON notifications;
CREATE POLICY "Allow all operations on notifications" ON notifications FOR ALL USING (true);

-- Achievements policies
DROP POLICY IF EXISTS "Allow all operations on achievements" ON achievements;
CREATE POLICY "Allow all operations on achievements" ON achievements FOR ALL USING (true);

-- User achievements policies
DROP POLICY IF EXISTS "Allow all operations on user_achievements" ON user_achievements;
CREATE POLICY "Allow all operations on user_achievements" ON user_achievements FOR ALL USING (true);

-- Withdrawal requests policies
DROP POLICY IF EXISTS "Allow all operations on withdrawal_requests" ON withdrawal_requests;
CREATE POLICY "Allow all operations on withdrawal_requests" ON withdrawal_requests FOR ALL USING (true);

-- Game plays policies
DROP POLICY IF EXISTS "Allow all operations on game_plays" ON game_plays;
CREATE POLICY "Allow all operations on game_plays" ON game_plays FOR ALL USING (true);

-- Referrals policies
DROP POLICY IF EXISTS "Allow all operations on referrals" ON referrals;
CREATE POLICY "Allow all operations on referrals" ON referrals FOR ALL USING (true);

-- Daily rewards policies
DROP POLICY IF EXISTS "Allow all operations on daily_rewards" ON daily_rewards;
CREATE POLICY "Allow all operations on daily_rewards" ON daily_rewards FOR ALL USING (true);

-- VIP tiers policies
DROP POLICY IF EXISTS "Allow all operations on vip_tiers" ON vip_tiers;
CREATE POLICY "Allow all operations on vip_tiers" ON vip_tiers FOR ALL USING (true);

-- Activity log policies
DROP POLICY IF EXISTS "Allow all operations on user_activity_log" ON user_activity_log;
CREATE POLICY "Allow all operations on user_activity_log" ON user_activity_log FOR ALL USING (true);

-- Conversion history policies
DROP POLICY IF EXISTS "Allow all operations on conversion_history" ON conversion_history;
CREATE POLICY "Allow all operations on conversion_history" ON conversion_history FOR ALL USING (true);

-- Notification preferences policies
DROP POLICY IF EXISTS "Allow all operations on notification_preferences" ON notification_preferences;
CREATE POLICY "Allow all operations on notification_preferences" ON notification_preferences FOR ALL USING (true);

-- Airdrop claims policies
DROP POLICY IF EXISTS "Allow all operations on airdrop_claims" ON airdrop_claims;
CREATE POLICY "Allow all operations on airdrop_claims" ON airdrop_claims FOR ALL USING (true);

-- Friends policies
DROP POLICY IF EXISTS "Allow all operations on friends" ON friends;
CREATE POLICY "Allow all operations on friends" ON friends FOR ALL USING (true);

-- Tournaments policies
DROP POLICY IF EXISTS "Allow all operations on tournaments" ON tournaments;
CREATE POLICY "Allow all operations on tournaments" ON tournaments FOR ALL USING (true);

-- Tournament participants policies
DROP POLICY IF EXISTS "Allow all operations on tournament_participants" ON tournament_participants;
CREATE POLICY "Allow all operations on tournament_participants" ON tournament_participants FOR ALL USING (true);

-- Gift transactions policies
DROP POLICY IF EXISTS "Allow all operations on gift_transactions" ON gift_transactions;
CREATE POLICY "Allow all operations on gift_transactions" ON gift_transactions FOR ALL USING (true);

-- Leaderboard cache policies
DROP POLICY IF EXISTS "Allow all operations on leaderboard_cache" ON leaderboard_cache;
CREATE POLICY "Allow all operations on leaderboard_cache" ON leaderboard_cache FOR ALL USING (true);

-- Profile customization policies
DROP POLICY IF EXISTS "Allow all operations on profile_customization" ON profile_customization;
CREATE POLICY "Allow all operations on profile_customization" ON profile_customization FOR ALL USING (true);

-- Seasonal events policies
DROP POLICY IF EXISTS "Allow all operations on seasonal_events" ON seasonal_events;
CREATE POLICY "Allow all operations on seasonal_events" ON seasonal_events FOR ALL USING (true);

-- Event participation policies
DROP POLICY IF EXISTS "Allow all operations on event_participation" ON event_participation;
CREATE POLICY "Allow all operations on event_participation" ON event_participation FOR ALL USING (true);

-- ============================================
-- TRIGGERS & FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_balances_updated_at ON balances;
CREATE TRIGGER update_balances_updated_at BEFORE UPDATE ON balances
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_notification_preferences_updated_at ON notification_preferences;
CREATE TRIGGER update_notification_preferences_updated_at BEFORE UPDATE ON notification_preferences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_profile_customization_updated_at ON profile_customization;
CREATE TRIGGER update_profile_customization_updated_at BEFORE UPDATE ON profile_customization
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_leaderboard_cache_updated_at ON leaderboard_cache;
CREATE TRIGGER update_leaderboard_cache_updated_at BEFORE UPDATE ON leaderboard_cache
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SEED DATA - DEFAULT TASKS
-- ============================================

-- Daily Tasks
INSERT INTO tasks (task_id, task_type, name, description, reward_points, requirement_type, requirement_value, icon) VALUES
('daily_login', 'daily', 'Daily Login', 'Login to your account', 50, 'login', 1, '🎯'),
('play_3_games', 'daily', 'Play 3 Games', 'Complete 3 mining games', 150, 'games', 3, '🎮'),
('claim_airdrop', 'daily', 'Claim Airdrop', 'Claim your daily airdrop', 100, 'airdrop', 1, '🎁'),
('refer_friend', 'daily', 'Invite a Friend', 'Share your referral link', 200, 'referrals', 1, '👥'),
('convert_points', 'daily', 'Convert Points', 'Convert points to crypto', 75, 'conversion', 1, '🔄')
ON CONFLICT (task_id) DO NOTHING;

-- Weekly Tasks
INSERT INTO tasks (task_id, task_type, name, description, reward_points, requirement_type, requirement_value, icon) VALUES
('weekly_streak', 'weekly', '7-Day Streak', 'Login for 7 consecutive days', 500, 'streak', 7, '🔥'),
('weekly_games', 'weekly', 'Play 20 Games', 'Complete 20 games this week', 800, 'games', 20, '🎯'),
('weekly_points', 'weekly', 'Earn 5,000 Points', 'Accumulate 5,000 points', 1000, 'points', 5000, '💎'),
('weekly_referrals', 'weekly', 'Refer 3 Friends', 'Invite 3 new users', 1500, 'referrals', 3, '👥')
ON CONFLICT (task_id) DO NOTHING;

-- Monthly Tasks
INSERT INTO tasks (task_id, task_type, name, description, reward_points, requirement_type, requirement_value, icon) VALUES
('monthly_streak', 'monthly', '30-Day Streak', 'Login for 30 consecutive days', 3000, 'streak', 30, '🔥'),
('monthly_level', 'monthly', 'Reach VIP Level 10', 'Level up to VIP 10', 5000, 'vip_level', 10, '⭐'),
('monthly_games', 'monthly', 'Play 100 Games', 'Complete 100 games this month', 4000, 'games', 100, '🎮'),
('monthly_earnings', 'monthly', 'Earn 10 TON', 'Accumulate 10 TON', 10000, 'earnings_ton', 10, '💰')
ON CONFLICT (task_id) DO NOTHING;

-- ============================================
-- SEED DATA - VIP TIERS
-- ============================================

INSERT INTO vip_tiers (tier_name, min_level, max_level, cooldown_reduction, conversion_rate, bonus_multiplier, icon, color, benefits) VALUES
('Bronze', 1, 5, 0, 10000, 1.0, '🥉', '#CD7F32', '{"features": ["Basic game access", "Standard cooldowns", "Community support", "Public events"]}'),
('Silver', 6, 15, 10, 9500, 1.2, '🥈', '#C0C0C0', '{"features": ["10% reduced cooldowns", "Better conversion rate", "Priority email support", "Silver events"]}'),
('Gold', 16, 30, 25, 9000, 1.5, '🥇', '#FFD700', '{"features": ["25% reduced cooldowns", "Premium conversion", "Priority chat support", "Exclusive games", "Custom themes"]}'),
('Platinum', 31, 50, 40, 8500, 2.0, '💎', '#E5E4E2', '{"features": ["40% reduced cooldowns", "Elite conversion", "24/7 support", "Platinum games", "Early access", "Personalized rewards"]}'),
('Diamond', 51, 999, 60, 8000, 3.0, '💠', '#B9F2FF', '{"features": ["60% reduced cooldowns", "Ultimate conversion", "VIP manager", "Diamond games", "Beta testing", "Custom modes", "Monthly bonuses"]}')
ON CONFLICT (tier_name) DO NOTHING;

-- ============================================
-- SEED DATA - ACHIEVEMENTS
-- ============================================

INSERT INTO achievements (achievement_id, name, description, category, icon, requirement_type, requirement_value, reward_points) VALUES
-- Starter Achievements
('first_login', 'Welcome Aboard', 'Complete your first login', 'starter', '👋', 'login', 1, 100),
('first_game', 'First Win', 'Play your first game', 'starter', '🎮', 'games', 1, 150),
('profile_complete', 'Profile Master', 'Complete your profile', 'starter', '✨', 'profile', 1, 200),

-- Points Achievements
('points_1k', 'Point Collector', 'Earn 1,000 points', 'points', '💎', 'points', 1000, 500),
('points_10k', 'Point Hoarder', 'Earn 10,000 points', 'points', '💰', 'points', 10000, 1000),
('points_100k', 'Point Millionaire', 'Earn 100,000 points', 'points', '🏆', 'points', 100000, 5000),

-- Games Achievements
('games_10', 'Casual Gamer', 'Play 10 games', 'games', '🎯', 'games', 10, 300),
('games_50', 'Dedicated Player', 'Play 50 games', 'games', '🎲', 'games', 50, 800),
('games_100', 'Game Master', 'Play 100 games', 'games', '🏅', 'games', 100, 2000),

-- Streak Achievements
('streak_7', 'Week Warrior', '7-day login streak', 'streak', '🔥', 'streak', 7, 500),
('streak_30', 'Monthly Master', '30-day login streak', 'streak', '📅', 'streak', 30, 2000),

-- VIP Achievements
('vip_5', 'Rising Star', 'Reach VIP Level 5', 'vip', '⭐', 'vip_level', 5, 500),
('vip_10', 'VIP Elite', 'Reach VIP Level 10', 'vip', '💫', 'vip_level', 10, 1500)
ON CONFLICT (achievement_id) DO NOTHING;

-- ============================================
-- SEED DATA - SAMPLE TOURNAMENTS
-- ============================================

INSERT INTO tournaments (tournament_id, name, description, game_type, entry_fee, prize_pool, max_participants, start_date, end_date, status) VALUES
('weekly_champion', 'Weekly Champion', 'Compete for the highest score this week', 'all', 100, 10000, 100, NOW(), NOW() + INTERVAL '7 days', 'active'),
('monthly_master', 'Monthly Master Tournament', 'Monthly competition with huge prizes', 'all', 500, 50000, 200, NOW(), NOW() + INTERVAL '30 days', 'active')
ON CONFLICT (tournament_id) DO NOTHING;

-- ============================================
-- SEED DATA - SEASONAL EVENTS
-- ============================================

INSERT INTO seasonal_events (event_id, name, description, event_type, bonus_multiplier, special_rewards, start_date, end_date, is_active) VALUES
('weekend_bonus', 'Weekend Bonus Event', 'Earn 2x points on all games during weekends!', 'special', 2.0, '{"bonus_points": 1000, "exclusive_badge": true}', NOW(), NOW() + INTERVAL '3 days', true),
('holiday_special', 'Holiday Special', 'Special holiday rewards and bonuses', 'holiday', 1.5, '{"bonus_points": 2000, "exclusive_items": ["holiday_badge", "special_avatar"]}', NOW(), NOW() + INTERVAL '14 days', true)
ON CONFLICT (event_id) DO NOTHING;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

SELECT '✅ Complete database schema created successfully!' AS status,
       'All tables, indexes, policies, and seed data are ready.' AS message,
       '24 tables created with full feature support.' AS details,
       'New features: Tournaments, Friends, Gifts, Events, Profile Customization' AS additions;


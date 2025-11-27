import React, { useState, useEffect } from 'react';
import { db } from '../db/supabase';
import './AchievementsPage.css';

function AchievementsPage({ user, addNotification }) {
  const [achievements, setAchievements] = useState([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const allAchievements = [
    // Getting Started
    { id: 'first_login', name: 'Welcome Aboard', description: 'Complete your first login', icon: '👋', category: 'starter', points: 100, requirement: 1 },
    { id: 'first_game', name: 'First Win', description: 'Play your first game', icon: '🎮', category: 'starter', points: 150, requirement: 1 },
    { id: 'profile_complete', name: 'Profile Master', description: 'Complete your profile', icon: '✨', category: 'starter', points: 200, requirement: 1 },
    
    // Points Milestones
    { id: 'points_1k', name: 'Point Collector', description: 'Earn 1,000 points', icon: '💎', category: 'points', points: 500, requirement: 1000 },
    { id: 'points_10k', name: 'Point Hoarder', description: 'Earn 10,000 points', icon: '💰', category: 'points', points: 1000, requirement: 10000 },
    { id: 'points_100k', name: 'Point Millionaire', description: 'Earn 100,000 points', icon: '🏆', category: 'points', points: 5000, requirement: 100000 },
    { id: 'points_1m', name: 'Point Legend', description: 'Earn 1,000,000 points', icon: '👑', category: 'points', points: 10000, requirement: 1000000 },
    
    // Games
    { id: 'games_10', name: 'Casual Gamer', description: 'Play 10 games', icon: '🎯', category: 'games', points: 300, requirement: 10 },
    { id: 'games_50', name: 'Dedicated Player', description: 'Play 50 games', icon: '🎲', category: 'games', points: 800, requirement: 50 },
    { id: 'games_100', name: 'Game Master', description: 'Play 100 games', icon: '🏅', category: 'games', points: 2000, requirement: 100 },
    { id: 'all_games', name: 'Jack of All Games', description: 'Play all game types', icon: '🌟', category: 'games', points: 1500, requirement: 5 },
    
    // Streaks
    { id: 'streak_7', name: 'Week Warrior', description: '7-day login streak', icon: '🔥', category: 'streak', points: 500, requirement: 7 },
    { id: 'streak_30', name: 'Monthly Master', description: '30-day login streak', icon: '📅', category: 'streak', points: 2000, requirement: 30 },
    { id: 'streak_100', name: 'Century Streaker', description: '100-day login streak', icon: '💯', category: 'streak', points: 10000, requirement: 100 },
    
    // Social
    { id: 'referral_1', name: 'Recruiter', description: 'Refer 1 friend', icon: '👥', category: 'social', points: 300, requirement: 1 },
    { id: 'referral_10', name: 'Social Butterfly', description: 'Refer 10 friends', icon: '🦋', category: 'social', points: 2000, requirement: 10 },
    { id: 'referral_50', name: 'Influencer', description: 'Refer 50 friends', icon: '⭐', category: 'social', points: 10000, requirement: 50 },
    
    // VIP Levels
    { id: 'vip_5', name: 'Rising Star', description: 'Reach VIP Level 5', icon: '⭐', category: 'vip', points: 500, requirement: 5 },
    { id: 'vip_10', name: 'VIP Elite', description: 'Reach VIP Level 10', icon: '💫', category: 'vip', points: 1500, requirement: 10 },
    { id: 'vip_20', name: 'VIP Legend', description: 'Reach VIP Level 20', icon: '🌟', category: 'vip', points: 5000, requirement: 20 },
    { id: 'vip_50', name: 'VIP God', description: 'Reach VIP Level 50', icon: '👑', category: 'vip', points: 20000, requirement: 50 },
    
    // Special
    { id: 'first_withdrawal', name: 'Cashing Out', description: 'Make your first withdrawal', icon: '💸', category: 'special', points: 1000, requirement: 1 },
    { id: 'conversion_master', name: 'Conversion Pro', description: 'Convert points 10 times', icon: '🔄', category: 'special', points: 800, requirement: 10 },
    { id: 'leaderboard_top10', name: 'Top Performer', description: 'Reach top 10 on leaderboard', icon: '🏆', category: 'special', points: 3000, requirement: 1 },
  ];

  useEffect(() => {
    checkAchievements();
  }, [user]);

  const checkAchievements = () => {
    const unlocked = [];
    
    allAchievements.forEach(achievement => {
      let isUnlocked = false;
      
      switch(achievement.id) {
        case 'first_login':
          isUnlocked = true; // Already logged in
          break;
        case 'first_game':
          isUnlocked = user.completedTasks >= 1;
          break;
        case 'points_1k':
          isUnlocked = user.points >= 1000;
          break;
        case 'points_10k':
          isUnlocked = user.points >= 10000;
          break;
        case 'points_100k':
          isUnlocked = user.points >= 100000;
          break;
        case 'points_1m':
          isUnlocked = user.points >= 1000000;
          break;
        case 'games_10':
          isUnlocked = user.completedTasks >= 10;
          break;
        case 'games_50':
          isUnlocked = user.completedTasks >= 50;
          break;
        case 'games_100':
          isUnlocked = user.completedTasks >= 100;
          break;
        case 'streak_7':
          isUnlocked = user.dayStreak >= 7;
          break;
        case 'streak_30':
          isUnlocked = user.dayStreak >= 30;
          break;
        case 'streak_100':
          isUnlocked = user.dayStreak >= 100;
          break;
        case 'vip_5':
          isUnlocked = user.vipLevel >= 5;
          break;
        case 'vip_10':
          isUnlocked = user.vipLevel >= 10;
          break;
        case 'vip_20':
          isUnlocked = user.vipLevel >= 20;
          break;
        case 'vip_50':
          isUnlocked = user.vipLevel >= 50;
          break;
        default:
          isUnlocked = false;
      }
      
      if (isUnlocked) {
        unlocked.push(achievement.id);
      }
    });
    
    setUnlockedAchievements(unlocked);
  };

  const getProgress = (achievement) => {
    switch(achievement.id) {
      case 'points_1k':
        return Math.min(100, (user.points / 1000) * 100);
      case 'points_10k':
        return Math.min(100, (user.points / 10000) * 100);
      case 'points_100k':
        return Math.min(100, (user.points / 100000) * 100);
      case 'points_1m':
        return Math.min(100, (user.points / 1000000) * 100);
      case 'games_10':
        return Math.min(100, (user.completedTasks / 10) * 100);
      case 'games_50':
        return Math.min(100, (user.completedTasks / 50) * 100);
      case 'games_100':
        return Math.min(100, (user.completedTasks / 100) * 100);
      case 'streak_7':
        return Math.min(100, (user.dayStreak / 7) * 100);
      case 'streak_30':
        return Math.min(100, (user.dayStreak / 30) * 100);
      case 'streak_100':
        return Math.min(100, (user.dayStreak / 100) * 100);
      case 'vip_5':
        return Math.min(100, (user.vipLevel / 5) * 100);
      case 'vip_10':
        return Math.min(100, (user.vipLevel / 10) * 100);
      case 'vip_20':
        return Math.min(100, (user.vipLevel / 20) * 100);
      case 'vip_50':
        return Math.min(100, (user.vipLevel / 50) * 100);
      default:
        return unlockedAchievements.includes(achievement.id) ? 100 : 0;
    }
  };

  const categories = [
    { id: 'all', name: 'All', icon: '🏆' },
    { id: 'starter', name: 'Starter', icon: '🚀' },
    { id: 'points', name: 'Points', icon: '💎' },
    { id: 'games', name: 'Games', icon: '🎮' },
    { id: 'streak', name: 'Streaks', icon: '🔥' },
    { id: 'social', name: 'Social', icon: '👥' },
    { id: 'vip', name: 'VIP', icon: '⭐' },
    { id: 'special', name: 'Special', icon: '✨' },
  ];

  const filteredAchievements = selectedCategory === 'all' 
    ? allAchievements 
    : allAchievements.filter(a => a.category === selectedCategory);

  const totalAchievements = allAchievements.length;
  const unlockedCount = unlockedAchievements.length;
  const completionPercentage = Math.round((unlockedCount / totalAchievements) * 100);
  const totalPointsEarned = allAchievements
    .filter(a => unlockedAchievements.includes(a.id))
    .reduce((sum, a) => sum + a.points, 0);

  return (
    <div className="achievements-page">
      <div className="achievements-header">
        <h1>🏆 Achievements</h1>
        <p>Unlock badges and earn bonus points by completing challenges</p>
      </div>

      {/* Progress Overview */}
      <div className="progress-overview">
        <div className="overview-card">
          <div className="overview-icon">🏆</div>
          <div className="overview-info">
            <div className="overview-value">{unlockedCount}/{totalAchievements}</div>
            <div className="overview-label">Unlocked</div>
          </div>
        </div>
        <div className="overview-card">
          <div className="overview-icon">📊</div>
          <div className="overview-info">
            <div className="overview-value">{completionPercentage}%</div>
            <div className="overview-label">Completion</div>
          </div>
        </div>
        <div className="overview-card">
          <div className="overview-icon">💎</div>
          <div className="overview-info">
            <div className="overview-value">{totalPointsEarned.toLocaleString()}</div>
            <div className="overview-label">Bonus Points</div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            <span className="cat-icon">{cat.icon}</span>
            <span className="cat-name">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="achievements-grid">
        {filteredAchievements.map(achievement => {
          const isUnlocked = unlockedAchievements.includes(achievement.id);
          const progress = getProgress(achievement);

          return (
            <div 
              key={achievement.id} 
              className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`}
            >
              {isUnlocked && <div className="unlock-badge">✓</div>}
              
              <div className="achievement-icon">{achievement.icon}</div>
              <h3 className="achievement-name">{achievement.name}</h3>
              <p className="achievement-description">{achievement.description}</p>
              
              <div className="achievement-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="progress-text">{Math.round(progress)}%</div>
              </div>
              
              <div className="achievement-reward">
                <span className="reward-icon">💎</span>
                <span className="reward-points">+{achievement.points} pts</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AchievementsPage;

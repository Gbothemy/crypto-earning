import React, { useState } from 'react';
import './TasksPage.css';

function TasksPage({ user, updateUser, addNotification }) {
  const [completedTasks, setCompletedTasks] = useState([]);

  const dailyTasks = [
    { id: 'daily_login', name: 'Daily Login', description: 'Login to your account', reward: 50, icon: '🎯', completed: true },
    { id: 'play_3_games', name: 'Play 3 Games', description: 'Complete 3 mining games', reward: 150, icon: '🎮', progress: 2, total: 3 },
    { id: 'claim_airdrop', name: 'Claim Airdrop', description: 'Claim your daily airdrop', reward: 100, icon: '🎁', progress: 0, total: 1 },
    { id: 'refer_friend', name: 'Invite a Friend', description: 'Share your referral link', reward: 200, icon: '👥', progress: 0, total: 1 },
    { id: 'convert_points', name: 'Convert Points', description: 'Convert points to crypto', reward: 75, icon: '🔄', progress: 0, total: 1 }
  ];

  const weeklyTasks = [
    { id: 'weekly_streak', name: '7-Day Streak', description: 'Login for 7 consecutive days', reward: 500, icon: '🔥', progress: user.dayStreak, total: 7 },
    { id: 'weekly_games', name: 'Play 20 Games', description: 'Complete 20 games this week', reward: 800, icon: '🎯', progress: 12, total: 20 },
    { id: 'weekly_points', name: 'Earn 5,000 Points', description: 'Accumulate 5,000 points', reward: 1000, icon: '💎', progress: user.points % 5000, total: 5000 },
    { id: 'weekly_referrals', name: 'Refer 3 Friends', description: 'Invite 3 new users', reward: 1500, icon: '👥', progress: 1, total: 3 }
  ];

  const monthlyTasks = [
    { id: 'monthly_streak', name: '30-Day Streak', description: 'Login for 30 consecutive days', reward: 3000, icon: '🔥', progress: user.dayStreak, total: 30 },
    { id: 'monthly_level', name: 'Reach VIP Level 10', description: 'Level up to VIP 10', reward: 5000, icon: '⭐', progress: user.vipLevel, total: 10 },
    { id: 'monthly_games', name: 'Play 100 Games', description: 'Complete 100 games this month', reward: 4000, icon: '🎮', progress: user.completedTasks, total: 100 },
    { id: 'monthly_earnings', name: 'Earn 10 TON', description: 'Accumulate 10 TON', reward: 10000, icon: '💰', progress: user.balance?.ton || 0, total: 10 }
  ];

  const handleClaimTask = (task, type) => {
    const progress = task.progress || 0;
    const isCompleted = progress >= task.total || task.completed;

    if (!isCompleted) {
      addNotification('Task not completed yet!', 'error');
      return;
    }

    if (completedTasks.includes(task.id)) {
      addNotification('Task already claimed!', 'info');
      return;
    }

    // Add reward
    updateUser({
      points: user.points + task.reward
    });

    setCompletedTasks([...completedTasks, task.id]);
    addNotification(`🎉 Claimed ${task.reward} points!`, 'success');
  };

  const getProgressPercentage = (task) => {
    if (task.completed) return 100;
    const progress = task.progress || 0;
    return Math.min((progress / task.total) * 100, 100);
  };

  const isTaskCompleted = (task) => {
    return task.completed || (task.progress || 0) >= task.total;
  };

  const isTaskClaimed = (taskId) => {
    return completedTasks.includes(taskId);
  };

  const getTotalRewards = (tasks) => {
    return tasks.reduce((sum, task) => sum + task.reward, 0);
  };

  const getCompletedCount = (tasks) => {
    return tasks.filter(task => isTaskCompleted(task)).length;
  };

  return (
    <div className="tasks-page">
      <div className="page-header">
        <h1 className="page-title">📋 Tasks & Missions</h1>
        <p className="page-subtitle">Complete tasks to earn bonus rewards</p>
      </div>

      {/* Overview Stats */}
      <div className="tasks-overview">
        <div className="overview-card">
          <div className="overview-icon">📊</div>
          <div className="overview-info">
            <div className="overview-value">{completedTasks.length}</div>
            <div className="overview-label">Tasks Claimed</div>
          </div>
        </div>
        <div className="overview-card">
          <div className="overview-icon">💎</div>
          <div className="overview-info">
            <div className="overview-value">{completedTasks.length * 150}</div>
            <div className="overview-label">Points Earned</div>
          </div>
        </div>
        <div className="overview-card">
          <div className="overview-icon">🎯</div>
          <div className="overview-info">
            <div className="overview-value">
              {getCompletedCount([...dailyTasks, ...weeklyTasks, ...monthlyTasks])}
            </div>
            <div className="overview-label">Completed</div>
          </div>
        </div>
      </div>

      {/* Daily Tasks */}
      <div className="tasks-section">
        <div className="section-header">
          <h2>🌅 Daily Tasks</h2>
          <span className="section-info">
            {getCompletedCount(dailyTasks)}/{dailyTasks.length} • 
            {getTotalRewards(dailyTasks)} pts total
          </span>
        </div>
        <div className="tasks-grid">
          {dailyTasks.map(task => {
            const completed = isTaskCompleted(task);
            const claimed = isTaskClaimed(task.id);
            const progress = getProgressPercentage(task);

            return (
              <div key={task.id} className={`task-card ${completed ? 'completed' : ''} ${claimed ? 'claimed' : ''}`}>
                <div className="task-icon">{task.icon}</div>
                <div className="task-content">
                  <h3>{task.name}</h3>
                  <p>{task.description}</p>
                  <div className="task-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                    <span className="progress-text">
                      {task.progress || 0}/{task.total}
                    </span>
                  </div>
                  <div className="task-reward">
                    <span className="reward-icon">💎</span>
                    <span className="reward-amount">+{task.reward} pts</span>
                  </div>
                </div>
                <button
                  className={`claim-btn ${completed && !claimed ? 'active' : ''}`}
                  onClick={() => handleClaimTask(task, 'daily')}
                  disabled={!completed || claimed}
                >
                  {claimed ? '✓ Claimed' : completed ? 'Claim' : 'Locked'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly Tasks */}
      <div className="tasks-section">
        <div className="section-header">
          <h2>📅 Weekly Tasks</h2>
          <span className="section-info">
            {getCompletedCount(weeklyTasks)}/{weeklyTasks.length} • 
            {getTotalRewards(weeklyTasks)} pts total
          </span>
        </div>
        <div className="tasks-grid">
          {weeklyTasks.map(task => {
            const completed = isTaskCompleted(task);
            const claimed = isTaskClaimed(task.id);
            const progress = getProgressPercentage(task);

            return (
              <div key={task.id} className={`task-card ${completed ? 'completed' : ''} ${claimed ? 'claimed' : ''}`}>
                <div className="task-icon">{task.icon}</div>
                <div className="task-content">
                  <h3>{task.name}</h3>
                  <p>{task.description}</p>
                  <div className="task-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                    <span className="progress-text">
                      {task.progress || 0}/{task.total}
                    </span>
                  </div>
                  <div className="task-reward">
                    <span className="reward-icon">💎</span>
                    <span className="reward-amount">+{task.reward} pts</span>
                  </div>
                </div>
                <button
                  className={`claim-btn ${completed && !claimed ? 'active' : ''}`}
                  onClick={() => handleClaimTask(task, 'weekly')}
                  disabled={!completed || claimed}
                >
                  {claimed ? '✓ Claimed' : completed ? 'Claim' : 'Locked'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly Tasks */}
      <div className="tasks-section">
        <div className="section-header">
          <h2>🗓️ Monthly Tasks</h2>
          <span className="section-info">
            {getCompletedCount(monthlyTasks)}/{monthlyTasks.length} • 
            {getTotalRewards(monthlyTasks)} pts total
          </span>
        </div>
        <div className="tasks-grid">
          {monthlyTasks.map(task => {
            const completed = isTaskCompleted(task);
            const claimed = isTaskClaimed(task.id);
            const progress = getProgressPercentage(task);

            return (
              <div key={task.id} className={`task-card ${completed ? 'completed' : ''} ${claimed ? 'claimed' : ''}`}>
                <div className="task-icon">{task.icon}</div>
                <div className="task-content">
                  <h3>{task.name}</h3>
                  <p>{task.description}</p>
                  <div className="task-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                    <span className="progress-text">
                      {task.progress || 0}/{task.total}
                    </span>
                  </div>
                  <div className="task-reward">
                    <span className="reward-icon">💎</span>
                    <span className="reward-amount">+{task.reward} pts</span>
                  </div>
                </div>
                <button
                  className={`claim-btn ${completed && !claimed ? 'active' : ''}`}
                  onClick={() => handleClaimTask(task, 'monthly')}
                  disabled={!completed || claimed}
                >
                  {claimed ? '✓ Claimed' : completed ? 'Claim' : 'Locked'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TasksPage;

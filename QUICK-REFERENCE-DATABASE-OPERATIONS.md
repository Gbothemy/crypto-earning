# 🚀 Quick Reference - Database Operations

## 📖 How Each Page Uses the Database

### 1. **LoginPage.js**
```javascript
// Register new user
const newUser = await db.createUser({
  user_id: userId,
  username: formData.username,
  email: formData.email,
  avatar: avatar,
  is_admin: false
});

// Login existing user
const users = await db.getAllUsers();
const existingUser = users.find(u => u.username === formData.username);
```

### 2. **GamePage.js**
```javascript
// Complete game and save progress
await db.updateUser(user.userId, {
  points: newPoints,
  vipLevel: newLevel,
  exp: finalExp,
  completedTasks: newCompletedTasks,
  dayStreak: user.dayStreak,
  lastClaim: user.lastClaim
});

// Record game play
await db.recordGamePlay(user.userId, mode.gameType);
```

### 3. **AirdropPage.js**
```javascript
// Claim daily airdrop
await db.updateBalance(user.userId, 'ton', user.balance.ton + rewards.ton);
await db.updateBalance(user.userId, 'cati', user.balance.cati + rewards.cati);
await db.updateBalance(user.userId, 'usdt', user.balance.usdt + rewards.usdt);

await db.updateUser(user.userId, {
  points: user.points + rewards.points,
  dayStreak: user.dayStreak + 1,
  lastClaim: new Date().toISOString(),
  ...otherFields
});
```

### 4. **ConversionPage.js**
```javascript
// Convert points to CATI
await db.updateUser(user.userId, {
  points: user.points - points,
  ...otherFields
});
await db.updateBalance(user.userId, 'cati', user.balance.cati + catiAmount);

// Request withdrawal
await db.createWithdrawalRequest({
  id: requestId,
  user_id: user.userId,
  username: user.username,
  currency: 'cati',
  amount: amount,
  wallet_address: withdrawAddress
});
await db.updateBalance(user.userId, 'cati', user.balance.cati - amount);
```

### 5. **DailyRewardsPage.js**
```javascript
// Claim daily reward
await db.updateUser(user.userId, {
  points: user.points + totalReward,
  vipLevel: user.vipLevel,
  exp: user.exp + 50,
  completedTasks: user.completedTasks,
  dayStreak: newStreak,
  lastClaim: now.toISOString()
});
```

### 6. **BenefitPage.js**
```javascript
// Claim reward pack
await db.updateUser(user.userId, {
  points: user.points - pack.points,
  ...otherFields
});

await db.updateBalance(user.userId, 'ton', user.balance.ton + pack.rewards.ton);
await db.updateBalance(user.userId, 'cati', user.balance.cati + pack.rewards.cati);
await db.updateBalance(user.userId, 'usdt', user.balance.usdt + pack.rewards.usdt);
```

### 7. **ProfileEditPage.js**
```javascript
// Update profile
await db.updateUser(user.userId, {
  username: formData.username,
  email: formData.email,
  avatar: formData.avatar,
  points: user.points,
  vipLevel: user.vipLevel,
  exp: user.exp,
  completedTasks: user.completedTasks,
  dayStreak: user.dayStreak,
  lastClaim: user.lastClaim
});
```

### 8. **LeaderboardPage.js**
```javascript
// Get leaderboards
const pointsData = await db.getLeaderboard('points', 10);
const earningsData = await db.getLeaderboard('earnings', 10);
const streakData = await db.getLeaderboard('streak', 10);
const allUsers = await db.getAllUsers();
```

### 9. **AdminPage.js**
```javascript
// Load all users
const users = await db.getAllUsers();

// Edit user
await db.updateUser(userId, updates);
await db.updateBalance(userId, 'ton', tonAmount);
await db.updateBalance(userId, 'cati', catiAmount);
await db.updateBalance(userId, 'usdt', usdtAmount);

// Manage withdrawals
const requests = await db.getWithdrawalRequests('pending');
await db.updateWithdrawalStatus(id, 'approved', adminId);

// Get leaderboards
const leaderboard = await db.getLeaderboard('points', 10);

// Bulk actions
await db.addPoints(userId, 1000);
await db.updateUser(userId, { vipLevel: newLevel, ...otherFields });
```

---

## 🔧 Available Database Methods

### User Operations:
```javascript
// Create new user
await db.createUser({
  user_id: string,
  username: string,
  email: string,
  avatar: string,
  is_admin: boolean
});

// Get single user
await db.getUser(user_id);

// Get all users
await db.getAllUsers();

// Update user (supports profile fields)
await db.updateUser(user_id, {
  // Required fields
  points: number,
  vipLevel: number,
  exp: number,
  completedTasks: number,
  dayStreak: number,
  lastClaim: string,
  
  // Optional profile fields
  username: string,
  email: string,
  avatar: string
});

// Add points to user
await db.addPoints(user_id, points);
```

### Balance Operations:
```javascript
// Update specific currency balance
await db.updateBalance(user_id, 'ton', amount);
await db.updateBalance(user_id, 'cati', amount);
await db.updateBalance(user_id, 'usdt', amount);
```

### Withdrawal Operations:
```javascript
// Create withdrawal request
await db.createWithdrawalRequest({
  id: string,
  user_id: string,
  username: string,
  currency: string,
  amount: number,
  wallet_address: string
});

// Get withdrawal requests
await db.getWithdrawalRequests(); // All
await db.getWithdrawalRequests('pending'); // Pending only
await db.getWithdrawalRequests('approved'); // Approved only
await db.getWithdrawalRequests('rejected'); // Rejected only

// Update withdrawal status
await db.updateWithdrawalStatus(id, status, processed_by);
```

### Game Operations:
```javascript
// Record game play
await db.recordGamePlay(user_id, game_type);

// Get game plays
await db.getGamePlays(user_id, game_type, date);
```

### Leaderboard Operations:
```javascript
// Get leaderboards
await db.getLeaderboard('points', limit);
await db.getLeaderboard('earnings', limit);
await db.getLeaderboard('streak', limit);
```

---

## 🎯 Common Patterns

### Pattern 1: Update User Progress
```javascript
try {
  await db.updateUser(user.userId, {
    points: user.points + earnedPoints,
    vipLevel: user.vipLevel,
    exp: user.exp + expGained,
    completedTasks: user.completedTasks + 1,
    dayStreak: user.dayStreak,
    lastClaim: user.lastClaim
  });
  
  updateUser({ points: user.points + earnedPoints, ... });
  addNotification('Progress saved!', 'success');
} catch (error) {
  console.error('Error:', error);
  addNotification('Failed to save progress', 'error');
}
```

### Pattern 2: Update Balance
```javascript
try {
  await db.updateBalance(user.userId, 'ton', newAmount);
  
  updateUser({
    balance: { ...user.balance, ton: newAmount }
  });
  addNotification('Balance updated!', 'success');
} catch (error) {
  console.error('Error:', error);
  addNotification('Failed to update balance', 'error');
}
```

### Pattern 3: Multiple Updates
```javascript
try {
  // Update points
  await db.updateUser(user.userId, {
    points: user.points - cost,
    ...otherFields
  });
  
  // Update balances
  await db.updateBalance(user.userId, 'ton', user.balance.ton + reward.ton);
  await db.updateBalance(user.userId, 'cati', user.balance.cati + reward.cati);
  await db.updateBalance(user.userId, 'usdt', user.balance.usdt + reward.usdt);
  
  // Update local state
  updateUser({ ... });
  addNotification('Success!', 'success');
} catch (error) {
  console.error('Error:', error);
  addNotification('Failed', 'error');
}
```

---

## ⚠️ Important Notes

### Always Include:
1. ✅ Try-catch blocks
2. ✅ Error logging
3. ✅ User notifications
4. ✅ Local state updates after database updates

### Never:
1. ❌ Update local state without database update
2. ❌ Ignore errors silently
3. ❌ Skip error handling
4. ❌ Use localStorage for persistent data

### Best Practices:
1. ✅ Update database first, then local state
2. ✅ Show loading states during operations
3. ✅ Provide user feedback (success/error)
4. ✅ Log errors for debugging
5. ✅ Use async/await consistently

---

## 🔍 Debugging Tips

### Check if data is saved:
```javascript
// After operation, verify in database
const user = await db.getUser(userId);
console.log('User data:', user);
```

### Check withdrawal requests:
```javascript
const requests = await db.getWithdrawalRequests();
console.log('All requests:', requests);
```

### Check leaderboard:
```javascript
const leaderboard = await db.getLeaderboard('points', 10);
console.log('Top 10:', leaderboard);
```

---

## 🎉 Quick Start

### For New Features:
1. Import database: `import { db } from '../db/supabase'`
2. Make handler async: `const handleAction = async () => {}`
3. Add try-catch: `try { ... } catch (error) { ... }`
4. Update database: `await db.method(...)`
5. Update local state: `updateUser({ ... })`
6. Show notification: `addNotification('Success!', 'success')`

### Example Template:
```javascript
import { db } from '../db/supabase';

const handleAction = async () => {
  try {
    // 1. Update database
    await db.updateUser(user.userId, { ... });
    
    // 2. Update local state
    updateUser({ ... });
    
    // 3. Show success
    addNotification('Success!', 'success');
  } catch (error) {
    // 4. Handle error
    console.error('Error:', error);
    addNotification('Failed', 'error');
  }
};
```

---

## 📚 Additional Resources

- **Full Documentation:** DATABASE-INTEGRATION-COMPLETE.md
- **Audit Summary:** FINAL-AUDIT-SUMMARY.md
- **Admin Guide:** ADMIN-DATABASE-INTEGRATION.md
- **Database Schema:** src/db/supabase-schema.sql

---

**Happy Coding! 🚀**

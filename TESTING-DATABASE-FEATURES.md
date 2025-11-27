# 🧪 Testing Database Features - Quick Guide

## 🚀 Quick Start

### 1. Apply Database Schema (REQUIRED FIRST!)
```sql
-- Go to Supabase SQL Editor
-- Copy and paste COMPLETE-DATABASE-SCHEMA-UPDATED.sql
-- Click RUN
-- Wait for completion
```

### 2. Start Your App
```bash
npm start
```

### 3. Login to Your App
- Use Telegram login or test credentials
- Make sure you're logged in as a regular user (not admin)

---

## ✅ Testing Checklist

### Tasks System (`/tasks`)
**What to Test:**
- [ ] Navigate to Tasks page
- [ ] See daily, weekly, and monthly tasks
- [ ] Check if tasks load from database
- [ ] View task progress bars
- [ ] Try to claim a completed task
- [ ] Verify points are added
- [ ] Check notification is created
- [ ] Verify activity is logged

**Expected Behavior:**
- Tasks should load from database
- Progress should show correctly
- Claiming should add points
- Notification should appear
- Task should show as "Claimed"

**Test Commands (Browser Console):**
```javascript
// Check if tasks loaded
console.log('Tasks loaded:', document.querySelectorAll('.task-card').length);

// Check user points before claim
console.log('Points before:', user.points);

// After claiming, check points increased
console.log('Points after:', user.points);
```

---

### Notifications System (`/notifications`)
**What to Test:**
- [ ] Navigate to Notifications page
- [ ] See all notifications
- [ ] Filter by All/Unread/Read
- [ ] Mark notification as read
- [ ] Delete a notification
- [ ] Mark all as read
- [ ] Clear all notifications

**Expected Behavior:**
- Notifications load from database
- Filters work correctly
- Mark as read updates database
- Delete removes from database
- Stats update in real-time

**Test Notifications:**
After claiming a task, you should see:
- ✅ "Task Completed!" notification
- Shows task name and points earned
- Appears in unread notifications

---

### Achievements System (`/achievements`)
**What to Test:**
- [ ] Navigate to Achievements page
- [ ] See all achievement categories
- [ ] View unlocked achievements
- [ ] View locked achievements
- [ ] Filter by All/Unlocked/Locked
- [ ] Check completion percentage
- [ ] Verify achievement details

**Expected Behavior:**
- All 13 achievements display
- Categories show correctly (Starter, Points, Games, Streak, VIP)
- Unlocked achievements show unlock date
- Locked achievements are grayed out
- Stats show accurate counts

**Achievement Categories:**
- 🎯 Starter (3 achievements)
- 💎 Points Master (3 achievements)
- 🎮 Game Champion (3 achievements)
- 🔥 Streak Legend (2 achievements)
- ⭐ VIP Elite (2 achievements)

---

## 🔍 Database Verification

### Check Tables Exist
```sql
-- Run in Supabase SQL Editor
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
```

**Expected Tables (15):**
- achievements
- balances
- conversion_history
- daily_rewards
- game_plays
- notification_preferences
- notifications
- referrals
- tasks
- user_achievements
- user_activity_log
- user_tasks
- users
- vip_tiers
- withdrawal_requests

### Check Seed Data
```sql
-- Check tasks
SELECT COUNT(*) as task_count FROM tasks;
-- Expected: 13 tasks

-- Check achievements
SELECT COUNT(*) as achievement_count FROM achievements;
-- Expected: 13 achievements

-- Check VIP tiers
SELECT COUNT(*) as tier_count FROM vip_tiers;
-- Expected: 5 tiers
```

### Check User Data
```sql
-- Replace 'YOUR_USER_ID' with actual user ID
SELECT * FROM users WHERE user_id = 'YOUR_USER_ID';
SELECT * FROM balances WHERE user_id = 'YOUR_USER_ID';
SELECT * FROM user_tasks WHERE user_id = 'YOUR_USER_ID';
SELECT * FROM notifications WHERE user_id = 'YOUR_USER_ID';
```

---

## 🐛 Troubleshooting

### Issue: Tasks Not Loading
**Possible Causes:**
- Database schema not applied
- User not logged in
- Network error

**Solutions:**
1. Check browser console for errors
2. Verify database schema is applied
3. Check Supabase connection in `.env`
4. Verify user is authenticated

### Issue: Can't Claim Tasks
**Possible Causes:**
- Task not completed
- Already claimed
- Database error

**Solutions:**
1. Check task progress (must be 100%)
2. Check if already claimed
3. Check browser console for errors
4. Verify database permissions

### Issue: Notifications Not Showing
**Possible Causes:**
- No notifications created yet
- Database query error
- User ID mismatch

**Solutions:**
1. Complete a task to create notification
2. Check browser console for errors
3. Verify user ID is correct
4. Check database for notifications

### Issue: Achievements Not Displaying
**Possible Causes:**
- Seed data not loaded
- Database query error

**Solutions:**
1. Verify seed data is in database
2. Run seed data SQL again
3. Check browser console for errors
4. Verify achievements table exists

---

## 📊 Performance Testing

### Check Query Speed
```javascript
// In browser console
console.time('Load Tasks');
await db.getTasks('daily');
console.timeEnd('Load Tasks');
// Should be < 500ms

console.time('Load Notifications');
await db.getNotifications(user.userId);
console.timeEnd('Load Notifications');
// Should be < 500ms

console.time('Load Achievements');
await db.getAchievements();
console.timeEnd('Load Achievements');
// Should be < 500ms
```

### Expected Performance:
- ✅ Tasks load: < 500ms
- ✅ Notifications load: < 500ms
- ✅ Achievements load: < 500ms
- ✅ Claim task: < 1000ms
- ✅ Mark as read: < 300ms

---

## 🎯 Test Scenarios

### Scenario 1: New User Journey
1. Login as new user
2. Check tasks page (should see all tasks at 0%)
3. Check notifications (should be empty)
4. Check achievements (all locked)
5. Complete a task
6. Claim task reward
7. Check notification created
8. Check points increased

### Scenario 2: Task Completion Flow
1. Navigate to Tasks page
2. Find a task with 100% progress
3. Click "Claim" button
4. Verify success notification
5. Check points increased
6. Navigate to Notifications
7. See task completion notification
8. Navigate back to Tasks
9. Verify task shows "Claimed"

### Scenario 3: Notification Management
1. Navigate to Notifications
2. See unread notifications
3. Click "Mark as Read" on one
4. Verify it moves to read
5. Click "Mark All as Read"
6. Verify all are read
7. Delete one notification
8. Click "Clear All"
9. Confirm and verify all cleared

### Scenario 4: Achievement Tracking
1. Navigate to Achievements
2. View all achievements
3. Filter by "Unlocked"
4. Filter by "Locked"
5. Check completion percentage
6. View achievement details
7. Check unlock dates for unlocked ones

---

## 📝 Test Results Template

```
Date: ___________
Tester: ___________

Tasks System:
[ ] Tasks load correctly
[ ] Progress shows accurately
[ ] Claiming works
[ ] Points added correctly
[ ] Notifications created
[ ] Activity logged

Notifications System:
[ ] Notifications load
[ ] Mark as read works
[ ] Delete works
[ ] Filters work
[ ] Clear all works

Achievements System:
[ ] Achievements load
[ ] Categories display
[ ] Filters work
[ ] Stats accurate
[ ] Details show correctly

Performance:
[ ] All queries < 500ms
[ ] No lag or freezing
[ ] Smooth navigation

Issues Found:
_______________________
_______________________
_______________________
```

---

## 🎊 Success Criteria

### All Tests Pass When:
✅ Database schema applied successfully
✅ All 15 tables exist
✅ Seed data loaded (13 tasks, 13 achievements, 5 VIP tiers)
✅ Tasks page loads and displays tasks
✅ Task claiming works and updates database
✅ Notifications page loads and displays notifications
✅ Notification CRUD operations work
✅ Achievements page loads and displays achievements
✅ All filters work correctly
✅ All queries complete in < 500ms
✅ No console errors
✅ User data persists across page refreshes

**If all criteria met: Database integration is complete! 🎉**

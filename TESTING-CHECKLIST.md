# ✅ Testing Checklist - Database Integration

## 🧪 Complete Testing Guide

Use this checklist to verify all database operations are working correctly.

---

## 1️⃣ User Registration & Login

### Registration Flow:
- [ ] Go to http://localhost:3001/login
- [ ] Click "Register" tab
- [ ] Fill in all fields (username, email, password)
- [ ] Click "Create Account"
- [ ] **Expected:** User created in Supabase `users` table
- [ ] **Expected:** Balance created in Supabase `balances` table
- [ ] **Expected:** Redirected to game page
- [ ] **Verify:** Check Supabase dashboard for new user

### Login Flow:
- [ ] Go to http://localhost:3001/login
- [ ] Enter username and password
- [ ] Click "Sign In"
- [ ] **Expected:** User data loaded from database
- [ ] **Expected:** Redirected to game page
- [ ] **Verify:** User points, balance, VIP level displayed correctly

### Demo Login:
- [ ] Click "Try Demo Account" button
- [ ] **Expected:** Logged in as DemoPlayer
- [ ] **Expected:** Demo user created in database if doesn't exist
- [ ] **Verify:** Can access all features

---

## 2️⃣ Game Page

### Play Games:
- [ ] Go to Game page
- [ ] Click "Play Game" on Puzzle Challenge
- [ ] Complete the puzzle
- [ ] **Expected:** Points added to account
- [ ] **Expected:** Experience gained
- [ ] **Expected:** Completed tasks incremented
- [ ] **Verify:** Refresh page - progress persists
- [ ] **Verify:** Check Supabase `users` table for updated values
- [ ] **Verify:** Check Supabase `game_plays` table for record

### Test Each Game:
- [ ] Puzzle Challenge - Play and complete
- [ ] Spin Wheel - Play and complete
- [ ] Memory Match - Play and complete
- [ ] Video Mining - Start and complete
- [ ] Sticker Packs - Start and complete

### Cooldown System:
- [ ] Play a game
- [ ] **Expected:** Cooldown timer appears
- [ ] Wait for cooldown to expire
- [ ] **Expected:** Can play again
- [ ] Refresh page during cooldown
- [ ] **Expected:** Cooldown persists (localStorage)

### Level Up:
- [ ] Play games until experience bar fills
- [ ] **Expected:** Level up notification
- [ ] **Expected:** VIP level incremented
- [ ] **Verify:** Check database for new VIP level

---

## 3️⃣ Airdrop Page

### Daily Claim:
- [ ] Go to Airdrop page
- [ ] Click "Claim Rewards" button
- [ ] **Expected:** Random rewards (TON, CATI, USDT, Points)
- [ ] **Expected:** Balances updated in UI
- [ ] **Expected:** Day streak incremented
- [ ] **Expected:** Last claim time updated
- [ ] **Verify:** Refresh page - balances persist
- [ ] **Verify:** Check Supabase `balances` table
- [ ] **Verify:** Check Supabase `users` table for streak

### Cooldown:
- [ ] Try to claim again immediately
- [ ] **Expected:** Button disabled
- [ ] **Expected:** Countdown timer showing
- [ ] **Verify:** Timer counts down correctly

---

## 4️⃣ Conversion Page

### Convert Points to CATI:
- [ ] Go to Conversion page
- [ ] Click "Convert Points" tab
- [ ] Enter points amount (e.g., 10000)
- [ ] Click "Convert to CATI"
- [ ] **Expected:** Points deducted
- [ ] **Expected:** CATI balance increased
- [ ] **Expected:** Success notification
- [ ] **Verify:** Refresh page - changes persist
- [ ] **Verify:** Check Supabase `users` table for points
- [ ] **Verify:** Check Supabase `balances` table for CATI

### Withdraw CATI:
- [ ] Click "Withdraw CATI" tab
- [ ] Enter CATI amount (min 100)
- [ ] Enter wallet address
- [ ] Click "Request Withdrawal"
- [ ] **Expected:** CATI balance deducted
- [ ] **Expected:** Withdrawal request created
- [ ] **Expected:** Success notification
- [ ] **Verify:** Check Supabase `withdrawal_requests` table
- [ ] **Verify:** Status is "pending"

---

## 5️⃣ Daily Rewards Page

### Claim Daily Reward:
- [ ] Go to Daily Rewards page
- [ ] View current streak
- [ ] Click "Claim Today's Reward"
- [ ] **Expected:** Points added
- [ ] **Expected:** Streak incremented
- [ ] **Expected:** Experience gained
- [ ] **Expected:** Success notification
- [ ] **Verify:** Refresh page - streak persists
- [ ] **Verify:** Check Supabase `users` table

### Streak Calendar:
- [ ] View streak calendar
- [ ] **Expected:** Past days marked as claimed
- [ ] **Expected:** Today marked as current
- [ ] **Expected:** Future days locked

### Milestone Rewards:
- [ ] View milestone rewards
- [ ] **Expected:** Unlocked milestones highlighted
- [ ] **Expected:** Current milestone marked
- [ ] **Expected:** Future milestones locked

---

## 6️⃣ Profile Edit Page

### Update Profile:
- [ ] Go to Profile Edit page (from Benefit page)
- [ ] Change username
- [ ] Change email
- [ ] Select different avatar
- [ ] Click "Save Changes"
- [ ] **Expected:** Profile updated
- [ ] **Expected:** Success notification
- [ ] **Verify:** Refresh page - changes persist
- [ ] **Verify:** Check Supabase `users` table
- [ ] **Verify:** Username/email/avatar updated

### Cancel Changes:
- [ ] Make changes
- [ ] Click "Cancel"
- [ ] **Expected:** Redirected to Benefit page
- [ ] **Expected:** No changes saved

---

## 7️⃣ Benefit Page

### Claim Reward Pack:
- [ ] Go to Benefit page
- [ ] Find a pack you can afford
- [ ] Click "Claim" button
- [ ] **Expected:** Points deducted
- [ ] **Expected:** Rewards added (TON, CATI, USDT, Gift Points)
- [ ] **Expected:** Pack marked as claimed
- [ ] **Expected:** Success notification
- [ ] **Verify:** Refresh page - pack stays claimed
- [ ] **Verify:** Check Supabase `users` table for points
- [ ] **Verify:** Check Supabase `balances` table for currencies

### View Profile Stats:
- [ ] View VIP level and progress bar
- [ ] View gift points
- [ ] View completed tasks
- [ ] View day streak
- [ ] **Expected:** All stats accurate

---

## 8️⃣ Leaderboard Page

### View Leaderboards:
- [ ] Go to Leaderboard page
- [ ] Click "Points" tab
- [ ] **Expected:** Top 10 users by points
- [ ] **Expected:** Your rank displayed
- [ ] Click "Earnings" tab
- [ ] **Expected:** Top 10 users by TON earnings
- [ ] Click "Streak" tab
- [ ] **Expected:** Top 10 users by day streak
- [ ] **Verify:** Data loads from database
- [ ] **Verify:** Rankings are correct

---

## 9️⃣ Admin Panel

### Admin Login:
- [ ] Go to http://localhost:3001/admin/login
- [ ] Click "Use Default Credentials"
- [ ] Click "Login as Admin"
- [ ] **Expected:** Logged in as admin
- [ ] **Expected:** Redirected to admin dashboard
- [ ] **Verify:** Admin user created in database

### View Users:
- [ ] View user list
- [ ] **Expected:** All users displayed
- [ ] **Expected:** User stats shown
- [ ] **Verify:** Data matches database

### Edit User:
- [ ] Click "Edit" on a user
- [ ] Change points, VIP level, or balances
- [ ] Click "Save"
- [ ] **Expected:** User updated
- [ ] **Expected:** Success notification
- [ ] **Verify:** Check Supabase database
- [ ] **Verify:** Changes persist

### Manage Withdrawals:
- [ ] View withdrawal requests
- [ ] Click "Approve" on a pending request
- [ ] **Expected:** Status changed to "approved"
- [ ] **Expected:** Success notification
- [ ] **Verify:** Check Supabase `withdrawal_requests` table
- [ ] **Verify:** Status updated

### View Leaderboards:
- [ ] View Points leaderboard
- [ ] View Earnings leaderboard
- [ ] View Streak leaderboard
- [ ] **Expected:** All data loads correctly

### Bulk Actions:
- [ ] Click "Add 1000 Points to All"
- [ ] Confirm action
- [ ] **Expected:** All users get 1000 points
- [ ] **Verify:** Check database for updates

---

## 🔟 Cross-Session Persistence

### Test Data Persistence:
- [ ] Login and play games
- [ ] Earn points and rewards
- [ ] Logout
- [ ] Close browser completely
- [ ] Open browser again
- [ ] Login with same account
- [ ] **Expected:** All data persists
- [ ] **Expected:** Points, balances, streak all correct
- [ ] **Verify:** No data loss

### Test Multiple Devices:
- [ ] Login on Device 1
- [ ] Earn some points
- [ ] Login on Device 2 (different browser/device)
- [ ] **Expected:** Same data on both devices
- [ ] Earn points on Device 2
- [ ] Refresh Device 1
- [ ] **Expected:** Data synced (may need manual refresh)

---

## 1️⃣1️⃣ Error Handling

### Test Error Scenarios:
- [ ] Disconnect internet
- [ ] Try to claim airdrop
- [ ] **Expected:** Error notification
- [ ] **Expected:** Graceful failure
- [ ] Reconnect internet
- [ ] Try again
- [ ] **Expected:** Works correctly

### Test Invalid Data:
- [ ] Try to withdraw more than balance
- [ ] **Expected:** Error message
- [ ] Try to convert more points than available
- [ ] **Expected:** Error message
- [ ] Try to claim pack without enough points
- [ ] **Expected:** Button disabled or error

---

## 1️⃣2️⃣ Performance

### Check Load Times:
- [ ] Measure page load times
- [ ] **Expected:** < 2 seconds for most pages
- [ ] Check database query times
- [ ] **Expected:** < 500ms for most queries

### Check Database Writes:
- [ ] Monitor Supabase dashboard
- [ ] Play games for 5 minutes
- [ ] **Expected:** ~5-10 database writes
- [ ] **Expected:** No excessive writes

---

## ✅ Final Verification

### Database Tables to Check:

#### users table:
- [ ] All users present
- [ ] Points correct
- [ ] VIP levels correct
- [ ] Experience correct
- [ ] Completed tasks correct
- [ ] Day streaks correct
- [ ] Last claim times correct

#### balances table:
- [ ] All users have balance records
- [ ] TON balances correct
- [ ] CATI balances correct
- [ ] USDT balances correct

#### withdrawal_requests table:
- [ ] All requests present
- [ ] Statuses correct (pending/approved/rejected)
- [ ] Amounts correct
- [ ] Wallet addresses present

#### game_plays table:
- [ ] Game plays recorded
- [ ] Dates correct
- [ ] Play counts accurate

---

## 🎯 Success Criteria

### All Tests Pass:
- ✅ User registration works
- ✅ Login works
- ✅ Games save progress
- ✅ Airdrops update balances
- ✅ Conversions work
- ✅ Withdrawals create requests
- ✅ Profile updates save
- ✅ Pack claims work
- ✅ Daily rewards work
- ✅ Leaderboards load
- ✅ Admin panel works
- ✅ Data persists across sessions
- ✅ Error handling works
- ✅ Performance is good

### Database Verification:
- ✅ All data in Supabase
- ✅ No localStorage dependencies
- ✅ Data syncs correctly
- ✅ No data loss

---

## 📝 Test Results

### Date: _____________
### Tester: _____________

| Test Category | Status | Notes |
|--------------|--------|-------|
| Registration & Login | ⬜ Pass ⬜ Fail | |
| Game Page | ⬜ Pass ⬜ Fail | |
| Airdrop Page | ⬜ Pass ⬜ Fail | |
| Conversion Page | ⬜ Pass ⬜ Fail | |
| Daily Rewards | ⬜ Pass ⬜ Fail | |
| Profile Edit | ⬜ Pass ⬜ Fail | |
| Benefit Page | ⬜ Pass ⬜ Fail | |
| Leaderboard | ⬜ Pass ⬜ Fail | |
| Admin Panel | ⬜ Pass ⬜ Fail | |
| Persistence | ⬜ Pass ⬜ Fail | |
| Error Handling | ⬜ Pass ⬜ Fail | |
| Performance | ⬜ Pass ⬜ Fail | |

### Overall Result: ⬜ PASS ⬜ FAIL

---

## 🚀 Ready for Production?

If all tests pass:
- ✅ Code is production-ready
- ✅ Database integration complete
- ✅ Error handling in place
- ✅ Performance optimized
- ✅ Deploy with confidence!

---

**Happy Testing! 🧪**

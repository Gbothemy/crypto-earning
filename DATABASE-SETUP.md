# 🚀 Database Setup Guide

## Quick Setup (2 Minutes)

### Step 1: Open Supabase SQL Editor
1. Go to your **Supabase Dashboard**
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**

### Step 2: Run the Schema
1. Open the file: `src/db/supabase-schema.sql`
2. Copy **ALL** the contents
3. Paste into Supabase SQL Editor
4. Click **RUN** button
5. Wait for completion (30-60 seconds)

### Step 3: Verify Success
You should see this message:
```
✅ Database schema applied successfully!
📊 Tables created: 17
🎮 Game types: 8
📋 Tasks: 13
🏆 Achievements: 13
⭐ VIP Tiers: 5
⚙️ Site Settings: 13
🔒 Security: Enabled
🎉 Your database is ready to use!
```

---

## ✅ What Gets Created

### Tables (17 Total)
1. **users** - User accounts
2. **balances** - Crypto balances (TON, CATI, USDT)
3. **referrals** - Referral system
4. **game_types** - Game configurations
5. **game_plays** - Game history
6. **tasks** - Task definitions
7. **user_tasks** - User task progress
8. **notifications** - User notifications
9. **notification_preferences** - Notification settings
10. **achievements** - Achievement definitions
11. **user_achievements** - Unlocked achievements
12. **withdrawal_requests** - Withdrawal system
13. **daily_rewards** - Daily reward claims
14. **vip_tiers** - VIP tier system
15. **user_activity_log** - Activity tracking
16. **conversion_history** - Point conversions
17. **site_settings** - Admin settings
18. **admin_actions** - Admin action logs

### Seed Data
- ✅ 8 Game types
- ✅ 13 Tasks (5 daily, 4 weekly, 4 monthly)
- ✅ 13 Achievements
- ✅ 5 VIP Tiers
- ✅ 13 Site settings

### Features Enabled
- ✅ Professional withdrawal system
- ✅ Multi-currency support (TON, CATI, USDT)
- ✅ Network selection (TON, BEP20, ERC20, TRC20)
- ✅ Transaction history
- ✅ Automatic notifications
- ✅ Task system
- ✅ Achievement system
- ✅ VIP tier system
- ✅ Activity logging
- ✅ Admin controls

---

## 🧪 Test Your Setup

### 1. Check Tables
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
```

### 2. Check Game Types
```sql
SELECT game_name, icon FROM game_types;
```

### 3. Check Tasks
```sql
SELECT task_name, task_type, reward_points FROM tasks;
```

### 4. Check VIP Tiers
```sql
SELECT tier_name, tier_icon, min_level, max_level FROM vip_tiers;
```

---

## 🎯 Next Steps

1. **Start Your App**
   ```bash
   npm start
   ```

2. **Test Features**
   - Login as user
   - Play games
   - Convert points
   - Request withdrawal
   - Check transaction history

3. **Test Admin Panel**
   - Login as admin
   - View withdrawal requests
   - Approve/reject withdrawals
   - Manage settings

---

## 🐛 Troubleshooting

### Error: Permission denied
**Solution:** Make sure you're logged in as database owner

### Error: Table already exists
**Solution:** This is OK! The script uses `IF NOT EXISTS`

### Error: Syntax error
**Solution:** Make sure you copied the ENTIRE file

### Tables not showing
**Solution:** Refresh your Supabase dashboard

---

## 📞 Need Help?

**Check these files:**
- `src/db/supabase-schema.sql` - Main schema file
- `PROFESSIONAL-WITHDRAWAL-SYSTEM-COMPLETE.md` - Full documentation
- `QUICK-SETUP-GUIDE.md` - Quick reference

---

## 🎉 You're Done!

Your database is now fully set up with:
- ✅ All tables created
- ✅ Seed data loaded
- ✅ Indexes optimized
- ✅ Security enabled
- ✅ Ready for production

**Start building!** 🚀

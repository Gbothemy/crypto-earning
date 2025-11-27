# 🔧 Database Update Instructions - Fix & Setup

## ⚠️ SQL Error Fixed!

The syntax error in the VIP tiers insert has been fixed. Use the simple update script below.

---

## 🚀 Quick Update (Recommended)

### Option 1: Simple Update (Just Withdrawal System)

**Use this file:** `DATABASE-UPDATE-SIMPLE.sql`

1. Go to **Supabase Dashboard**
2. Click **SQL Editor**
3. Create **New Query**
4. Copy and paste the entire contents of `DATABASE-UPDATE-SIMPLE.sql`
5. Click **RUN**
6. Wait for success message ✅

**This adds:**
- ✅ Network column
- ✅ Memo column
- ✅ Network fee column
- ✅ Net amount column
- ✅ Transaction hash column
- ✅ Rejection reason column

---

## 🔄 Alternative: Manual Update

If you prefer to run commands one by one:

```sql
-- Step 1: Add network column
ALTER TABLE withdrawal_requests 
ADD COLUMN IF NOT EXISTS network TEXT;

-- Step 2: Add memo column
ALTER TABLE withdrawal_requests 
ADD COLUMN IF NOT EXISTS memo TEXT;

-- Step 3: Add network_fee column
ALTER TABLE withdrawal_requests 
ADD COLUMN IF NOT EXISTS network_fee DECIMAL(18, 8) DEFAULT 0;

-- Step 4: Add net_amount column
ALTER TABLE withdrawal_requests 
ADD COLUMN IF NOT EXISTS net_amount DECIMAL(18, 8);

-- Step 5: Add transaction_hash column
ALTER TABLE withdrawal_requests 
ADD COLUMN IF NOT EXISTS transaction_hash TEXT;

-- Step 6: Add rejection_reason column
ALTER TABLE withdrawal_requests 
ADD COLUMN IF NOT EXISTS rejection_reason TEXT;

-- Step 7: Update existing records
UPDATE withdrawal_requests 
SET net_amount = amount 
WHERE net_amount IS NULL;
```

---

## ✅ Verify Installation

Run this to check if columns were added:

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'withdrawal_requests'
ORDER BY column_name;
```

**You should see these columns:**
- ✅ amount
- ✅ currency
- ✅ id
- ✅ memo (NEW)
- ✅ net_amount (NEW)
- ✅ network (NEW)
- ✅ network_fee (NEW)
- ✅ processed_by
- ✅ processed_date
- ✅ rejection_reason (NEW)
- ✅ request_date
- ✅ status
- ✅ transaction_hash (NEW)
- ✅ user_id
- ✅ username
- ✅ wallet_address

---

## 🧪 Test the System

### 1. Test Conversion
```bash
# Start your app
npm start

# Login as user
# Go to Convert & Withdraw
# Convert some points
# Check balance updated ✅
```

### 2. Test Withdrawal
```bash
# Click "Withdraw Crypto" tab
# Select currency (TON/CATI/USDT)
# Select network
# Enter amount and address
# Submit withdrawal request
# Check Transaction History ✅
```

### 3. Test Admin Panel
```bash
# Login as admin
# View withdrawal requests
# Approve or reject
# Check user receives notification ✅
```

---

## 🐛 Troubleshooting

### Error: Column already exists
**This is OK!** The `IF NOT EXISTS` clause prevents errors if columns already exist.

### Error: Permission denied
**Solution:** Make sure you're logged in as the database owner or have ALTER TABLE permissions.

### Error: Table doesn't exist
**Solution:** Run the full schema first from `COMPLETE-DATABASE-SCHEMA-UPDATED.sql`

### Columns not showing
**Solution:** 
1. Refresh your Supabase dashboard
2. Check the correct database is selected
3. Run the verification query above

---

## 📊 What Each Column Does

| Column | Type | Purpose |
|--------|------|---------|
| `network` | TEXT | Blockchain network (TON, BEP20, ERC20, TRC20) |
| `memo` | TEXT | Memo/Tag for exchanges (optional) |
| `network_fee` | DECIMAL | Fee charged by network |
| `net_amount` | DECIMAL | Amount user receives after fees |
| `transaction_hash` | TEXT | Blockchain transaction hash |
| `rejection_reason` | TEXT | Reason if withdrawal rejected |

---

## 🎯 After Update

Once database is updated, you can:

1. ✅ Accept withdrawals with network selection
2. ✅ Show network fees to users
3. ✅ Store transaction hashes
4. ✅ Track rejection reasons
5. ✅ Support exchange memos
6. ✅ Calculate net amounts

---

## 📞 Still Having Issues?

### Check These:
1. ✅ Supabase project is active
2. ✅ You have database permissions
3. ✅ Table `withdrawal_requests` exists
4. ✅ No typos in SQL commands
5. ✅ Using correct database

### Get Help:
- Check browser console for errors
- Check Supabase logs
- Review error messages carefully
- Try manual update method

---

## 🎉 Success!

Once you see:
```
✅ Database update completed successfully!
📊 Withdrawal system is ready!
🎉 You can now use the professional withdrawal form!
```

You're all set! Your professional withdrawal system is ready to use! 🚀

---

## 📝 Quick Reference

**Files:**
- `DATABASE-UPDATE-SIMPLE.sql` - Simple update script (RECOMMENDED)
- `UPDATED-DATABASE-SCHEMA-V2.sql` - Full schema (if starting fresh)
- `QUICK-SETUP-GUIDE.md` - Quick setup guide
- `PROFESSIONAL-WITHDRAWAL-SYSTEM-COMPLETE.md` - Full documentation

**Time Required:** 2-5 minutes

**Difficulty:** Easy ⭐

**Risk:** Low (non-destructive, only adds columns)

---

**Ready to update? Use `DATABASE-UPDATE-SIMPLE.sql`!** 🚀

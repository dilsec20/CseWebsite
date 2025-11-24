## Quick Fix for Current Errors

### Issue 1: JWT Malformed (403 Errors)
**Cause**: Old JWT tokens in browser from before `.env` was created

**Fix**:
1. Open browser (http://localhost:5173)
2. Press `F12` to open DevTools
3. Go to **Console** tab
4. Type: `localStorage.clear()`
5. Press Enter
6. Refresh the page (`F5`)
7. **Register a new account** (old accounts won't work)

### Issue 2: Problem ID Undefined (404 Errors)
**Cause**: Clicking problem from list isn't passing ID correctly

**Fix**: Click on the "Solve" button in the problem list, not just anywhere on the row.

---

## Step-by-Step Test:

1. **Clear Browser Storage**
   ```javascript
   // In browser console (F12)
   localStorage.clear()
   ```

2. **Refresh Page** (`F5` or `Ctrl+R`)

3. **Register New Account**
   - Go to Register
   - Use a fresh email/password
   - Submit

4. **Browse Problems**
   - Go to Problems page
   - You should see 500 problems
   - Problem descriptions should now be detailed

5. **Solve a Problem**
   - Click the blue "Solve" button on any problem
   - Problem description should load
   - Code editor should appear
   - Try running code

---

If still having issues, check browser console (F12) for errors.

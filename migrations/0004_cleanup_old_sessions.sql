-- Cleanup old active sessions (keep only 5 most recent per user)
DELETE FROM sessions WHERE id NOT IN (
  SELECT id FROM sessions 
  ORDER BY created_at DESC 
  LIMIT 5
);

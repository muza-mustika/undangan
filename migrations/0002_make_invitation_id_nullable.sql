-- Make invitation_id nullable in guests table by recreating the table

-- Create new table with nullable invitation_id
CREATE TABLE guests_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  invitation_id INTEGER,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  status TEXT DEFAULT 'pending',
  invitation_url TEXT,
  custom_message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY (invitation_id) REFERENCES invitations (id) ON DELETE CASCADE
);

-- Copy data from old table
INSERT INTO guests_new (id, user_id, invitation_id, name, email, phone, status, invitation_url, custom_message, created_at, updated_at)
SELECT id, user_id, invitation_id, name, email, phone, status, invitation_url, custom_message, created_at, updated_at
FROM guests;

-- Drop old table
DROP TABLE guests;

-- Rename new table
ALTER TABLE guests_new RENAME TO guests;

-- Recreate indexes
CREATE INDEX IF NOT EXISTS idx_guests_user_id ON guests(user_id);
CREATE INDEX IF NOT EXISTS idx_guests_invitation_id ON guests(invitation_id);
CREATE INDEX IF NOT EXISTS idx_guests_status ON guests(status);

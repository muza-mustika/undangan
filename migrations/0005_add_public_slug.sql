-- Add public_slug column to invitations table (without UNIQUE constraint first)
ALTER TABLE invitations ADD COLUMN public_slug TEXT;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_invitations_public_slug ON invitations(public_slug);

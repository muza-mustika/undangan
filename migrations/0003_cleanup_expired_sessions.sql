-- Cleanup expired sessions
DELETE FROM sessions WHERE expires_at < datetime("now");

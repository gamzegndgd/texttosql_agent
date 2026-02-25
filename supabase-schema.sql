-- ─────────────────────────────────────────────────────────────
-- QueryMind — Supabase Tablosu (Güncellenmiş)
-- Supabase Dashboard → SQL Editor → New Query → Yapıştır → Run
-- ─────────────────────────────────────────────────────────────

-- Eski tablo varsa sil
DROP TABLE IF EXISTS waitlist_users;

CREATE TABLE waitlist_users (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT        NOT NULL,
  last_name  TEXT        NOT NULL,
  email      TEXT        UNIQUE NOT NULL,
  company    TEXT,
  role       TEXT,
  database   TEXT,                    -- PostgreSQL, MySQL vb.
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hızlı arama için index
CREATE INDEX idx_waitlist_email ON waitlist_users(email);

-- Güvenlik: sadece service role erişebilir
ALTER TABLE waitlist_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role only" ON waitlist_users USING (false);

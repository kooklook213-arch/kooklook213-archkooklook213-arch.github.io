/*
# Create user_settings table for Gemini API key storage

1. New Tables
- `user_settings`
  - `id` (uuid, primary key, defaults to gen_random_uuid)
  - `user_id` (uuid, NOT NULL, defaults to auth.uid(), references auth.users ON DELETE CASCADE)
  - `gemini_api_key` (text, nullable — stores the user's Gemini API key)
  - `created_at` (timestamptz, defaults to now())
  - `updated_at` (timestamptz, defaults to now())
2. Security
- Enable RLS on `user_settings`.
- Owner-scoped CRUD: each authenticated user can only access their own settings row.
- SELECT, INSERT, UPDATE, DELETE policies scoped to auth.uid() = user_id.
3. Notes
- The `user_id` column defaults to auth.uid() so inserts that omit it still succeed.
- Only one settings row per user (enforced by unique constraint on user_id).
*/

CREATE TABLE IF NOT EXISTS user_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  gemini_api_key text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- One settings row per user
CREATE UNIQUE INDEX IF NOT EXISTS user_settings_user_id_key ON user_settings (user_id);

ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_settings" ON user_settings;
CREATE POLICY "select_own_settings" ON user_settings FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_settings" ON user_settings;
CREATE POLICY "insert_own_settings" ON user_settings FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_settings" ON user_settings;
CREATE POLICY "update_own_settings" ON user_settings FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_settings" ON user_settings;
CREATE POLICY "delete_own_settings" ON user_settings FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

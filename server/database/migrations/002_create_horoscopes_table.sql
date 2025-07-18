/*
  # Create horoscopes table

  1. New Tables
    - `horoscopes`
      - `id` (uuid, primary key)
      - `zodiac_sign` (text, not null)
      - `type` (text, daily/weekly/monthly)
      - `content` (text, not null)
      - `date` (date, not null)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `horoscopes` table
    - Add policy for authenticated users to read horoscopes
*/

CREATE TABLE IF NOT EXISTS horoscopes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  zodiac_sign text NOT NULL,
  type text NOT NULL CHECK (type IN ('daily', 'weekly', 'monthly')),
  content text NOT NULL,
  date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE horoscopes ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to read horoscopes
CREATE POLICY "Authenticated users can read horoscopes"
  ON horoscopes
  FOR SELECT
  TO authenticated
  USING (true);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_horoscopes_zodiac_type_date 
ON horoscopes(zodiac_sign, type, date); 
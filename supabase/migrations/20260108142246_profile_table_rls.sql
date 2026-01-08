ALTER TABLE profile ENABLE ROW LEVEL SECURITY;

CREATE POLICY "everybody can read all profiles"
ON profile
FOR SELECT
USING (true);

CREATE POLICY "Users can create their own profile"
On profile
FOR INSERT
WITH CHECK (id = auth.uid());

CREATE POLICY "Users can update their own profile"
On profile
FOR UPDATE
USING (id = auth.uid())
WITH CHECK (id = auth.uid());
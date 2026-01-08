DROP POLICY "Users can create their own profile" ON profile;

CREATE POLICY "Users can create their own profile"
On profile
FOR INSERT
WITH CHECK (id = (SELECT auth.uid()));

DROP POLICY "Users can update their own profile" ON profile;

CREATE POLICY "Users can update their own profile"
On profile
FOR UPDATE
USING (id = (SELECT auth.uid()))
WITH CHECK (id = (SELECT auth.uid()));
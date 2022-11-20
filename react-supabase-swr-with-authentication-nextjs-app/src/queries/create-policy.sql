-- https://zenn.dev/hrtk/scraps/a0381fa829dfab
-- https://supabase.com/docs/guides/auth/row-level-security
CREATE POLICY "Enable delete for users based on user_id" ON "public"."todos" AS PERMISSIVE FOR ALL TO authenticated,
anon USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id) 
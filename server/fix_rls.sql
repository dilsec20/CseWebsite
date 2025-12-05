-- Grant full access to postgres and service_role (if exists) for all tables
DO $$ 
DECLARE 
    t text;
    r text;
    roles_list text := 'postgres';
BEGIN 
    -- Check if service_role exists and append it
    IF EXISTS (SELECT FROM pg_roles WHERE rolname = 'service_role') THEN
        roles_list := roles_list || ', service_role';
    END IF;
    -- Check if supabase_admin exists and append it
    IF EXISTS (SELECT FROM pg_roles WHERE rolname = 'supabase_admin') THEN
        roles_list := roles_list || ', supabase_admin';
    END IF;

    FOR t IN 
        SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' 
    LOOP 
        EXECUTE format('DROP POLICY IF EXISTS "Backend full access" ON %I', t);
        -- Dynamic SQL to include available roles
        EXECUTE format('CREATE POLICY "Backend full access" ON %I TO ' || roles_list || ' USING (true) WITH CHECK (true)', t);
    END LOOP; 
END $$;

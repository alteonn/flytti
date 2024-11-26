-- Allow invocation of the send-email function
DO $$ 
BEGIN
    -- Create policy for Edge Functions if it doesn't exist
    IF NOT EXISTS (
        SELECT FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Enable storage access for all users'
    ) THEN
        CREATE POLICY "Enable storage access for all users"
        ON storage.objects FOR ALL
        TO public
        USING (bucket_id = 'send-email')
        WITH CHECK (bucket_id = 'send-email');
    END IF;
END $$;
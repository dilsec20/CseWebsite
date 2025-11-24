-- Fix existing usernames by replacing spaces with underscores
-- and removing special characters

-- First, let's see what usernames need fixing
SELECT user_id, user_name, 
       LOWER(REGEXP_REPLACE(REGEXP_REPLACE(user_name, '\s+', '_', 'g'), '[^a-zA-Z0-9_]', '', 'g')) as sanitized_username
FROM users
WHERE user_name ~ '[^a-zA-Z0-9_]';

-- Update usernames that contain spaces or special characters
UPDATE users
SET user_name = LOWER(REGEXP_REPLACE(REGEXP_REPLACE(user_name, '\s+', '_', 'g'), '[^a-zA-Z0-9_]', '', 'g'))
WHERE user_name ~ '[^a-zA-Z0-9_]';

UPDATE dsa_topics SET video_url = NULL WHERE module_id = (SELECT module_id FROM dsa_modules WHERE title ILIKE '%Time & Space Complexity%');
